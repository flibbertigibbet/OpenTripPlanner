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

package org.opentripplanner.routing.vertextype;

import org.opentripplanner.common.model.extras.NumericFieldSet;
import org.opentripplanner.common.model.extras.OptionSet;
import org.opentripplanner.routing.graph.Graph;
import org.opentripplanner.routing.graph.Vertex;

import com.vividsolutions.jts.geom.Coordinate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Abstract base class for vertices in the street layer of the graph.
 * This includes both vertices representing intersections or points (IntersectionVertices)
 * and Elevator*Vertices.
 */
public abstract class StreetVertex extends Vertex {

    private static final long serialVersionUID = 1L;

    private static Logger LOG = LoggerFactory.getLogger(StreetVertex.class);

    ///////////////////////////////////////////////////////////////////////////////////
    // optional extra features for weighting
    private OptionSet extraOptionFields;

    private NumericFieldSet extraNumericFields;

    public OptionSet getExtraOptionFields() {
        return extraOptionFields;
    }

    public void setExtraOptionFields(OptionSet extraOptionFields) {
        LOG.info("Adding extra option fields to vertex: {}", extraOptionFields.toString());
        this.extraOptionFields = extraOptionFields;
    }

    public NumericFieldSet getExtraNumericFields() {
        return extraNumericFields;
    }

    public void setExtraNumericFields(NumericFieldSet extraNumericFields) {
        this.extraNumericFields = extraNumericFields;
    }
    /////////////////////////////////////////////////////////////////////////////////

    public StreetVertex(Graph g, String label, Coordinate coord, String streetName) {
        this(g, label, coord.x, coord.y, streetName);
    }

    public StreetVertex(Graph g, String label, double x, double y, String streetName) {
        super(g, label, x, y, streetName);
    }

}
