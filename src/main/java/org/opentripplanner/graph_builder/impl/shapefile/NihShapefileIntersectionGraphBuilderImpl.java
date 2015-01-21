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

import com.vividsolutions.jts.geom.*;
import org.geotools.data.FeatureSource;
import org.geotools.data.Query;
import org.geotools.factory.Hints;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.geotools.geometry.jts.JTS;
import org.geotools.referencing.ReferencingFactoryFinder;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.crs.CRSAuthorityFactory;
import org.opengis.referencing.crs.CoordinateReferenceSystem;
import org.opentripplanner.common.geometry.GeometryUtils;
import org.opentripplanner.common.model.P2;
import org.opentripplanner.graph_builder.impl.shapefile.AttributeFeatureConverter;
import org.opentripplanner.graph_builder.impl.shapefile.StringAttributeFeatureConverter;
import org.opentripplanner.graph_builder.services.GraphBuilder;
import org.opentripplanner.graph_builder.services.shapefile.FeatureSourceFactory;
import org.opentripplanner.graph_builder.services.shapefile.SimpleFeatureConverter;
import org.opentripplanner.routing.alertpatch.Alert;
import org.opentripplanner.routing.edgetype.StreetEdge;
import org.opentripplanner.routing.graph.Edge;
import org.opentripplanner.routing.graph.Graph;
import org.opentripplanner.routing.graph.Vertex;
import org.opentripplanner.routing.impl.*;
import org.opentripplanner.routing.vertextype.StreetVertex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;


/**
 * Loads an NIH shapefile into an edge-based graph, associating the intersections with those previously
 * imported from OpenStreetMap.
 *
 */
public class NihShapefileIntersectionGraphBuilderImpl implements GraphBuilder {
    private static Logger LOG = LoggerFactory.getLogger(ShapefileStreetGraphBuilderImpl.class);

    private FeatureSourceFactory _featureSourceFactory;

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
        LOG.info("Adding to graph data from NIH Intersections Shapefile...");

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
            throw new IllegalStateException("error loading shapefile intersection data", ex);
        } finally {
            _featureSourceFactory.cleanup();
        }

        // TODO: get rest of properties
        StreetVertexIndexServiceImpl vertexSvc = new StreetVertexIndexServiceImpl(graph);
        StringAttributeFeatureConverter intersectionIdSelector = new StringAttributeFeatureConverter("intsctn_id", "");

        List<SimpleFeature> featureList = new ArrayList();
        FeatureIterator<SimpleFeature> it2 = features.features();
        while (it2.hasNext()) {
            SimpleFeature feature = it2.next();
            featureList.add(feature);
        }
        it2.close();
        it2 = null;

        LOG.info("Have {} NIH intersections to process...", featureList.size());

        int foundIntersectionCt = 0;
        int missingIntersectionCt = 0;

        for (SimpleFeature feature : featureList) {
            if (feature.getDefaultGeometry() == null) {
                LOG.warn("feature has no geometry: " + feature.getIdentifier());
                continue;
            }
            Point geom = toPoint((Geometry) feature.getDefaultGeometry());

            String intersectionId = intersectionIdSelector.convert(feature);

            LOG.info("Found NIH intersection with ID {}.", intersectionId);

            Coordinate coordinate = geom.getCoordinate();
            StreetVertex intersection = vertexSvc.getIntersectionAt(coordinate);

            if (intersection == null) {
                LOG.warn("Could not find intersection for coordinate: {} for intersection: {}", coordinate, intersectionId);
                missingIntersectionCt += 1;
            } else {
                foundIntersectionCt += 1;
            }

            // TODO: Set intersection properties
        }

        LOG.info("Found {} intersections.", foundIntersectionCt);
        if (missingIntersectionCt > 0) {
            LOG.warn("Missing {} intersections.", missingIntersectionCt);
        }
    }

    private Point toPoint(Geometry g) {
        if (g instanceof Point) {
            return (Point) g;
        } else {
            throw new RuntimeException("found a geometry feature that's not a point: " + g);
        }
    }

    @Override
    public void checkInputs() {
        _featureSourceFactory.checkInputs();
    }
}
