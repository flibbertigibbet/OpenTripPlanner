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

package org.opentripplanner.routing.edgetype;

import org.opentripplanner.common.geometry.GeometryUtils;
import org.opentripplanner.routing.core.RoutingRequest;
import org.opentripplanner.routing.core.State;
import org.opentripplanner.routing.core.StateEditor;
import org.opentripplanner.routing.core.TraverseMode;
import org.opentripplanner.routing.graph.Edge;
import org.opentripplanner.routing.graph.Vertex;
import org.opentripplanner.routing.vertextype.FeatureVertex;
import org.opentripplanner.routing.vertextype.StreetVertex;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.LineString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.ListIterator;


/**
 * This represents the connection between a street vertex and a feature vertex.
 * Based on StreetBikeParkLink.
 *
 * @author flibbertigibbet
 */
public class StreetFeatureLink extends Edge {

    private static final long serialVersionUID = 1L;

    private static Logger LOG = LoggerFactory.getLogger(StreetFeatureLink.class);

    private FeatureVertex featureVertex;

    public StreetFeatureLink(StreetVertex fromv, FeatureVertex tov) {
        super(fromv, tov);
        featureVertex = tov;
        setFeaturesOnLinkedStreet(fromv);
    }

    public StreetFeatureLink(FeatureVertex fromv, StreetVertex tov) {
        super(fromv, tov);
        featureVertex = fromv;
        setFeaturesOnLinkedStreet(tov);
    }

    /**
     * Note that connected streets have access to features.
     */
    private void setFeaturesOnLinkedStreet(StreetVertex sv) {
        List<StreetEdge> linkedEdges = sv.getStreetEdges();
        for (StreetEdge edge : linkedEdges) {
            LOG.info("Linked edge type: {}", edge.getClass().getName());
            if (featureVertex.getFeatureType().equals("bench")) {
                LOG.info("Bench to street from {}", this.toString());
                edge.addBench();
            } else if (featureVertex.getFeatureType().equals("toilet")) {
                LOG.info("Toilet to street from {}", this.toString());
                edge.addToilet();
            }
        }
    }

    public String getDirection() {
        return null;
    }

    public double getDistance() {
        return 0;
    }

    public LineString getGeometry() {
        // Return straight line beetween the feature and the street
        Coordinate[] coordinates = new Coordinate[] { getFromVertex().getCoordinate(),
                getToVertex().getCoordinate() };
        return GeometryUtils.getGeometryFactory().createLineString(coordinates);
    }

    public String getName() {
        return featureVertex.getName();
        // TODO: should probably be private on FeatureVertex with getters and setters
        //return featureVertex.featureType;
    }

    public State traverse(State s0) {
        StateEditor s1 = s0.edit(this);
        // Assume features are more-or-less on-street
        //s1.incrementTimeInSeconds(1);
        //s1.incrementWeight(1);
        // Do not force any mode, will use the latest one (walking bike or bike)
        return s1.makeState();
    }

    @Override
    public double weightLowerBound(RoutingRequest options) {
        return options.modes.contains(TraverseMode.WALK) ? 0 : Double.POSITIVE_INFINITY;
    }

    public Vertex getFromVertex() {
        return fromv;
    }

    public Vertex getToVertex() {
        return tov;
    }

    public String toString() {
        return "StreetFeatureLink(" + fromv + " -> " + tov + ")";
    }
}
