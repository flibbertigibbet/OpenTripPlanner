/* This program is free software: you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public License
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>. */

package org.opentripplanner.graph_builder.impl.shapefile;

import java.util.*;
import java.util.Set;

import org.geotools.data.FeatureSource;
import org.geotools.data.Query;
import org.geotools.factory.Hints;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.geotools.referencing.ReferencingFactoryFinder;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.crs.CRSAuthorityFactory;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.opentripplanner.common.geometry.GeometryUtils;
import org.opentripplanner.common.model.extras.NumericFieldSet;
import org.opentripplanner.common.model.extras.OptionSet;
import org.opentripplanner.common.model.extras.nihOptions.NihNumeric;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;
import org.opentripplanner.graph_builder.services.GraphBuilder;
import org.opentripplanner.graph_builder.services.shapefile.FeatureSourceFactory;
import org.opentripplanner.graph_builder.services.shapefile.SimpleFeatureConverter;
import org.opentripplanner.routing.core.RoutingRequest;
import org.opentripplanner.routing.core.TraverseMode;
import org.opentripplanner.routing.core.TraverseModeSet;
import org.opentripplanner.routing.edgetype.StreetEdge;
import org.opentripplanner.routing.graph.Edge;
import org.opentripplanner.routing.graph.Graph;
import org.opentripplanner.routing.graph.Vertex;
import org.opentripplanner.routing.impl.*;
import org.opentripplanner.routing.services.GraphService;
import org.opentripplanner.routing.services.PathService;
import org.opentripplanner.routing.spt.GraphPath;
import org.opentripplanner.routing.vertextype.StreetVertex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.MultiLineString;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;

/**
 * Loads an NIH shapefile into an edge-based graph, associating the edges with those previously
 * imported from OpenStreetMap.
 *
 */
public class NihShapefileStreetGraphBuilderImpl implements GraphBuilder {

    private static Logger LOG = LoggerFactory.getLogger(ShapefileStreetGraphBuilderImpl.class);

    // collection of option fields expected in NIH segments shapefile
    private static final Set<NihOption> NIH_OPTIONS = EnumSet.allOf(NihOption.class);

    // collection of numeric fields
    private static final Set<NihNumeric> NIH_NUMERIC_FIELDS = EnumSet.allOf(NihNumeric.class);

    // converters for the option fields expected in NIH segments shapefile (have two if they are for L/R sides)
    private EnumMap<NihOption, ArrayList<StringAttributeFeatureConverter>> optionConverters;

    // converters for the numeric fields expeted in NIH segments shapefile
    private EnumMap<NihNumeric, SimpleFeatureConverter<Integer>> numericConverters;

    private FeatureSourceFactory _featureSourceFactory;

    private GraphServiceImpl graphService;

    public List<String> provides() {
        // streets are required by the previous OSM graph builder step, so return an empty collection
        return Collections.emptyList();
    }

    public List<String> getPrerequisites() {
        // require the things provided by the OSM builder
        return Arrays.asList("streets", "turns");
    }

    public void setFeatureSourceFactory(FeatureSourceFactory factory) {
        _featureSourceFactory = factory;
    }

    public void buildGraph(Graph graph, HashMap<Class<?>, Object> extra) {
        LOG.info("Adding to graph data from NIH Streets Shapefile...");

        FeatureSource<SimpleFeatureType, SimpleFeature> featureSource = _featureSourceFactory
                .getFeatureSource();

        FeatureCollection<SimpleFeatureType, SimpleFeature> features = null;

        try {
            CoordinateReferenceSystem sourceCRS = featureSource.getInfo().getCRS();

            Hints hints = new Hints(Hints.FORCE_LONGITUDE_FIRST_AXIS_ORDER, Boolean.TRUE);
            CRSAuthorityFactory factory = ReferencingFactoryFinder.getCRSAuthorityFactory("EPSG",
                    hints);
            CoordinateReferenceSystem worldCRS = factory
                    .createCoordinateReferenceSystem("EPSG:4326");

            Query query = new Query();
            query.setCoordinateSystem(sourceCRS);
            query.setCoordinateSystemReproject(worldCRS);

            features = featureSource.getFeatures(query);

        } catch (Exception ex) {
            throw new IllegalStateException("error loading shapefile street data", ex);
        } finally {
            _featureSourceFactory.cleanup();
        }

        // get identifier fields
        StreetVertexIndexServiceImpl vertexSvc = new StreetVertexIndexServiceImpl(graph);
        SimpleFeatureConverter<Long> osmIdSelector = new AttributeFeatureConverter("osm_id");
        SimpleFeatureConverter<Integer> segmentIdSelector = new AttributeFeatureConverter("segment_id");
        StringAttributeFeatureConverter nameSelector = new StringAttributeFeatureConverter("name", "");

        // set up the field converters
        optionConverters = getOptionFieldConverters();
        numericConverters = getNumericFieldConverters();

        List<SimpleFeature> featureList = new ArrayList();
        FeatureIterator<SimpleFeature> it2 = features.features();
        while (it2.hasNext()) {
            SimpleFeature feature = it2.next();
            featureList.add(feature);
        }
        it2.close();
        it2 = null;

        LOG.info("Have {} NIH streets to process...", featureList.size());

        // index edges and nodes in graph built from OSM data by their OSM IDs
        LOG.info("Indexing OSM ways by ID...");
        Multimap<String, StreetEdge> edgesByWayId = HashMultimap.create();
        Collection<Edge> edges = graph.getEdges();
        for (Edge edge: edges) {
            if (edge instanceof StreetEdge) {
                StreetEdge street = (StreetEdge) edge;
                edgesByWayId.put(street.getOsmId(), street);
            }
        }

        edges = null;
        
        int foundStartCt = 0;
        int foundEndCt = 0;
        int missingStartCt = 0;
        int missingEndCt = 0;

        double maxSlopeFound = 0;
        double minSlopeFound = 0;
        double avgSlopeFound = 0;

        for (SimpleFeature feature : featureList) {
            if (feature.getDefaultGeometry() == null) {
                LOG.warn("feature has no geometry: " + feature.getIdentifier());
                continue;
            }
            LineString geom = toLineString((Geometry) feature.getDefaultGeometry());
            String streetName = nameSelector.convert(feature);

            String wayId = "";
            Long way = osmIdSelector.convert(feature);
            if (way != null) {
                wayId = way.toString();
            }

            String segmentId = segmentIdSelector.convert(feature).toString();
            if (segmentId.equals("0")) {
                // simply skip segments with zero IDs (only the ones with segment IDs have data associated)
                continue;
            }

            LOG.info("Found NIH street named {} with Way ID {} and segment ID {}.",
                     streetName, wayId, segmentId);

            String wayLabel = "osm:way:" + wayId;
            String wayName = streetName;

            Coordinate[] coordinates = geom.getCoordinates();

            if (coordinates.length < 2) {
                //not a real linestring
                LOG.warn("Bad geometry for street with label {} and name {}", wayLabel, wayName);
                continue;
            }

            Coordinate startCoordinate = new Coordinate(coordinates[0].x, coordinates[0].y);
            Coordinate endCoordinate = new Coordinate(coordinates[coordinates.length - 1].x,
                                                      coordinates[coordinates.length - 1].y);

            StreetVertex startIntersection = vertexSvc.getIntersectionAt(startCoordinate);

            boolean missingStart = true;
            boolean missingEnd = true;

            if (startIntersection == null && !segmentId.isEmpty()) {
                LOG.warn("Could not find intersection for start coordinate: {} on {}: {}", startCoordinate, wayLabel, wayName);
                missingStartCt += 1;
            } else {
                missingStart = false;
                if (!segmentId.isEmpty()) {
                    foundStartCt += 1;
                }
            }

            StreetVertex endIntersection = vertexSvc.getIntersectionAt(endCoordinate);

            if (endIntersection == null && !segmentId.isEmpty()) {
                LOG.warn("Could not find intersection for end coordinate: {} on {}: {}", endCoordinate, wayLabel, wayName);
                missingEndCt += 1;
            } else {
                missingEnd = false;
                if (!segmentId.isEmpty()) {
                    foundEndCt += 1;
                }
            }

            if (missingStart && missingEnd) {
                LOG.warn("Missing both start and end intersections for way {}: {}", wayLabel, wayName);
                continue;
            }

            String startLabel = startIntersection.getLabel();
            String endLabel = endIntersection.getLabel();

            // find edges between start and end vertices

            // Sets of matched edges on way between start and end intersections.
            // Right edges go from starting intersection to end; left edges run in reverse direction.
            Set<StreetEdge> rightEdges = new HashSet();
            Set<StreetEdge> leftEdges = new HashSet();

            // start with the already imported edges with the given OSM Way ID
            Collection<StreetEdge> wayEdges = edgesByWayId.get(wayLabel);

            if (wayEdges.isEmpty()) {
                LOG.warn("Have no way edges found for OSM way {}", wayId);
            }

            boolean foundStart = false;
            boolean foundEnd = false;

            ArrayList<StreetEdge> startEdges = new ArrayList();
            ArrayList<StreetEdge> endEdges = new ArrayList();
            ArrayList<Vertex> farStartVertices = new ArrayList();
            ArrayList<Vertex> farEndVertices = new ArrayList();

            for (StreetEdge edge : wayEdges) {
                Vertex from = edge.getFromVertex();
                Vertex to = edge.getToVertex();
                String fromLabel = from.getLabel();
                String toLabel = to.getLabel();

                if (fromLabel.equals(startLabel)) {
                    foundStart = true;
                    startEdges.add(edge);
                    farStartVertices.add(to);
                } else if (toLabel.equals(startLabel)) {
                    foundStart = true;
                    startEdges.add(edge);
                    farStartVertices.add(from);
                }

                if (fromLabel.equals(endLabel)) {
                    foundEnd = true;
                    endEdges.add(edge);
                    farEndVertices.add(to);
                } else if (toLabel.equals(endLabel)) {
                    foundEnd = true;
                    endEdges.add(edge);
                    farEndVertices.add(from);
                }
            }

            if (!foundStart || !foundEnd) {
                LOG.warn("Could not find start or end for {}: {}, segment {}", wayLabel, wayName, segmentId);
                continue;
            }

            // check if the start and end intersections are connected by a single graph segment
            // (if so, there will be two edges found, one the reverse of the other)
            boolean haveOneSegment = false;
            for (StreetEdge start : startEdges) {
                for (StreetEdge end : endEdges) {
                    if (start.isEquivalentTo(end)) {
                        haveOneSegment = true;
                        if (start.getFromVertex().getLabel().equals(startLabel)) {
                            rightEdges.add(start);
                        } else {
                            leftEdges.add(start);
                        }
                    }
                }
            }

            if (!haveOneSegment) {
                // check if the start and end intersections are connected by two edges (that share a vertex in between)
                // note the shared vertex, if found, in order to add edges that go to/from it later
                String sharedVertex = null;
                for (Vertex start : farStartVertices) {
                    for (Vertex end : farEndVertices) {
                        if (start.getLabel().equals(end.getLabel())) {
                            sharedVertex = start.getLabel();
                            break;
                        }
                    }
                }

                if (sharedVertex != null) {
                    // have two segments
                    LOG.info("Start and end vertex share a midpoint at {}", sharedVertex);
                    // go grab only edges that go between shared vertex and start or end edge
                    for (StreetEdge edge: startEdges) {
                        if (edge.getToVertex().getLabel().equals(sharedVertex)) {
                            rightEdges.add(edge);
                        } else if (edge.getFromVertex().getLabel().equals(sharedVertex)) {
                            leftEdges.add(edge);
                        }
                    }

                    for (StreetEdge edge: endEdges) {
                        if (edge.getFromVertex().getLabel().equals(sharedVertex)) {
                            rightEdges.add(edge);
                        } else if (edge.getToVertex().getLabel().equals(sharedVertex)) {
                            leftEdges.add(edge);
                        }
                    }
                } else {
                    // have three or more segments between start and end; go compute SPT and traverse it
                    rightEdges = findSPT(graph, startLabel, endLabel, wayLabel);

                    // find left edges that go in reverse of the SPT path edges
                    for (StreetEdge street : rightEdges) {
                        // TODO: surely there's an easier way to find the back edge.
                        boolean foundReverse = false;
                        for (Edge reverse : wayEdges) {
                            if (reverse.isReverseOf(street)) {
                                foundReverse = true;
                                leftEdges.add((StreetEdge) reverse);
                            }
                        }
                        if (!foundReverse) {
                            LOG.warn("No reverse found for matched SPT edge {}: {}", street.getName(), street.getOsmId());
                        }
                    }

                }
            }

            // sanity checks
            if (rightEdges.size() != leftEdges.size()) {
                LOG.warn("Have {} right edges, but {} left edges!", rightEdges.size(), leftEdges.size());
            }

            Set<StreetEdge> matchedEdges = new HashSet();
            matchedEdges.addAll(rightEdges);
            matchedEdges.addAll(leftEdges);
            LOG.info("Have {} matched street edges for way {}.", matchedEdges.size(), wayLabel + " " + wayName);
            boolean isBad = false;
            for (StreetEdge edge : matchedEdges) {
                if (!edge.getOsmId().equals(wayLabel)) {
                    LOG.warn("Found bad matched way!  Got: {} Should be: {}", edge.getOsmId(), wayLabel);
                    isBad = true;
                }
                double useSlope = Math.abs(edge.getMaxSlope());
                LOG.info("Max slope on edge: {}", edge.getMaxSlope());
                avgSlopeFound += useSlope;
                if (useSlope > maxSlopeFound) {
                    maxSlopeFound = useSlope;
                }
                if (useSlope < minSlopeFound || minSlopeFound == 0) {
                    minSlopeFound = useSlope;
                }
            }

            avgSlopeFound /= matchedEdges.size();

            if (isBad) {
                continue;
            }

            ///////////////////////////////////////////////////////////////////////
            // If got this far, have a good set of matched way edges to work with.
            // Now go set properties on them.
            ///////////////////////////////////////////////////////////////////////

            setOptionProperties(feature, rightEdges, true);
            setOptionProperties(feature, leftEdges, false);
            setNumericProperties(feature, matchedEdges);

        }

        LOG.info("Found {} start and {} end intersections.", foundStartCt, foundEndCt);
        if (missingStartCt > 0 || missingEndCt > 0) {
            LOG.warn("Missing {} start intersections.", missingStartCt);
            LOG.warn("Missing {} end intersections.", missingEndCt);
        }

        LOG.info("Min slope found on an edge: {}", minSlopeFound);
        LOG.info("Max slope found on an edge: {}", maxSlopeFound);
        LOG.info("Average slope: {}", avgSlopeFound);
    }

    /**
     * Build out the attribute converters to get field values out of the feature.
     *
     * @return Map of field enumeration value to list of one or two feature converters (if separate columns for L and R)
     */
    private EnumMap<NihOption, ArrayList<StringAttributeFeatureConverter>> getOptionFieldConverters() {
        // if have R/L columns, have list [R, L]
        EnumMap<NihOption, ArrayList<StringAttributeFeatureConverter>> converters = new EnumMap(NihOption.class);

        final String LEFT_PREFIX = "L_";
        final String RIGHT_PREFIX = "R_";

        for (NihOption option : NIH_OPTIONS) {
            ArrayList<StringAttributeFeatureConverter> fields = new ArrayList();
            if (option.hasLeftRight()) {

                if (option.equals(NihOption.TRAFFIC)) {
                    continue; // TODO: will this field go into the shapefile eventually? skip it for now.
                }

                // make two converters, one for each side
                fields.add(new StringAttributeFeatureConverter(RIGHT_PREFIX + option.getFieldName(), ""));
                fields.add(new StringAttributeFeatureConverter(LEFT_PREFIX + option.getFieldName(), ""));
            } else {
                fields.add(new StringAttributeFeatureConverter(option.getFieldName(), ""));
            }
            converters.put(option, fields);
        }

        return converters;
    }

    private EnumMap<NihNumeric, SimpleFeatureConverter<Integer>> getNumericFieldConverters() {
        EnumMap<NihNumeric, SimpleFeatureConverter<Integer>> converters = new EnumMap(NihNumeric.class);
        for (NihNumeric field : NIH_NUMERIC_FIELDS) {
            LOG.info("Adding converter for field {}", field.getFieldName());
            converters.put(field, new AttributeFeatureConverter(field.getFieldName()));
        }
        return converters;
    }

    /**
     * Set the attributes for this feature on the matching graph edges found.
     *
     * @param feature Shapefile SimpleFeature with the properties to set
     * @param edges Set of graph edges identified as belonging to the segment for this feature
     * @param isRightSide Whether the graph edges set is for the right side of the street (left side if false)
     */
    private void setOptionProperties(SimpleFeature feature, Set<StreetEdge> edges, boolean isRightSide) {

        if (isRightSide) {
            LOG.info("Going to set option properties on right edges...");
        } else {
            LOG.info("Going to set option properties on left edges...");
        }

        // build set of converted values
        OptionSet<NihOption> nihOptions = new OptionSet(NihOption.class);

        for (NihOption option : NIH_OPTIONS) {
            String val = "";

            if (option.equals(NihOption.TRAFFIC)) {
                // TODO: will this column be added to the shapefile?
                continue;
            }

            if (!option.hasLeftRight() || isRightSide) {
                val = optionConverters.get(option).get(0).convert(feature);
            } else {
                // left side is second in list
                val = optionConverters.get(option).get(1).convert(feature);
            }

            if (val.isEmpty()) {
                LOG.warn("Skipping setting an empty value for option {}.  Was this intentional?", option.getFieldName());
            } else {

                // TODO: some better way to correct for left/right values encoded in a single column?
                if (val.equals("Right")) {
                    if (isRightSide) {
                        val = "Both";
                    } else {
                        val = "None";
                    }
                } else if (val.equals("Left")) {
                    if (!isRightSide) {
                        val = "Both";
                    } else {
                        val = "None";
                    }
                }

                LOG.info("Going to set value {} for option {}", val, option.getFieldName());
                nihOptions.setValue(option, val);
            }
        }

        LOG.info("Built option set: {}", nihOptions.toString());

        for (StreetEdge edge : edges) {
            edge.setExtraOptionFields(nihOptions);
        }
    }

    /**
     * Set the attributes for this feature on the matching graph edges found.
     *
     * @param feature Shapefile SimpleFeature with the properties to set
     * @param edges Set of graph edges identified as belonging to the segment for this feature
     */
    private void setNumericProperties(SimpleFeature feature, Set<StreetEdge> edges) {
        LOG.info("Going to set numeric properties on edges...");

        // build set of converted values
        NumericFieldSet<NihNumeric> nihNumericFieldSet = new NumericFieldSet(NihNumeric.class);

        for (NihNumeric numericField : NIH_NUMERIC_FIELDS) {
            int val = 0;

            LOG.info("Going to convert field {}", numericField.getFieldName());

            val = numericConverters.get(numericField).convert(feature);

            if (val == 0) {
                LOG.warn("Skipping zero for option {}.  Was this intentional?", numericField.getFieldName());
            } else {
                LOG.info("Going to set value {} for option {}", val, numericField.getFieldName());
                nihNumericFieldSet.setValue(numericField, val);
            }
        }

        LOG.info("Built numeric field set: {}", nihNumericFieldSet.toString());

        for (StreetEdge edge : edges) {
            edge.setExtraNumericFields(nihNumericFieldSet);
        }
    }

    /*
     * Compute SPT for given start and end points, then traverse it to find edges along its way.
     */
    private Set<StreetEdge> findSPT(Graph graph, String from, String to, String wayLabel) {
        // There are three or more edges between the start and end points.
        // Get SPT path from start to end intersections and traverse it.
        Set<StreetEdge> matchedEdges = new HashSet();
        TraverseModeSet modeSet = new TraverseModeSet(TraverseMode.WALK);
        RoutingRequest options = new RoutingRequest(modeSet);
        options.setMaxWalkDistance(99999);
        options.setArriveBy(false);
        options.setFromString(from);
        options.setToString(to);
        options.numItineraries = 1;
        GenericAStarFactory sptServiceFactory = new GenericAStarFactory();
        GraphService svc = getGraphService(graph);
        PathService pathService = new ParetoPathService(svc, sptServiceFactory);
        sptServiceFactory.setTraverseVisitor(null);
        List<GraphPath> paths = pathService.getPaths(options);
        LOG.info("Found SPT path between {} and {}:", from, to);
        boolean goodPath = true;
        for (GraphPath path : paths) {
            LinkedList<Edge> pathEdges = path.edges;
            for (Edge edge : pathEdges) {
                if (edge instanceof StreetEdge) {
                    StreetEdge street = (StreetEdge) edge;
                    if (!street.getOsmId().equals(wayLabel)) {
                        LOG.warn("Mismatched path street edge with way ID {} along way {}", street.getOsmId(), wayLabel);
                        goodPath = false;
                    } else {
                        matchedEdges.add(street);
                    }
                } else {
                    LOG.warn("Edge on SPT is not a StreetEdge!  Cannot use it.");
                }
            }
        }

        options.cleanup();

        if (!goodPath) {
            LOG.warn("Bad path for way {}", wayLabel);
        }

        return matchedEdges;
    }

    private GraphService getGraphService(Graph graph) {
        if (graphService == null) {
            makeGraphService(graph);
        }
        return graphService;
    }

    private void makeGraphService(Graph graph) {
        GraphServiceImpl graphService = new GraphServiceImpl();
        // must index graph first to be able to route over it
        graph.index(new DefaultStreetVertexIndexFactory());
        MemoryGraphSource graphSource = new MemoryGraphSource("", graph);
        this.graphService = graphService;
        this.graphService.registerGraph("", graphSource);
        this.graphService.setDefaultRouterId("");
    }

    private LineString toLineString(Geometry g) {
        if (g instanceof LineString) {
            return (LineString) g;
        } else if (g instanceof MultiLineString) {
            MultiLineString ml = (MultiLineString) g;

            Coordinate[] coords = ml.getCoordinates();
            return GeometryUtils.getGeometryFactory().createLineString(coords);
        } else {
            throw new RuntimeException("found a geometry feature that's not a linestring: " + g);
        }
    }

    @Override
    public void checkInputs() {
        _featureSourceFactory.checkInputs();
    }
}
