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

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.routing.graph.Vertex;
import org.opentripplanner.routing.graph.Graph;

/**
 * Represents a location in space that is an amenity or hazard
 *
 * @author flibbertigibbet
 */
public class FeatureVertex extends Vertex {

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    private String id = "";
    private String featureType = "";

    public FeatureVertex(Graph g, String featureType, String id, double x, double y, String name) {
        super(g, id, x, y, name);
        this.setId(id);
        this.setFeatureType(featureType);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFeatureType() {
        return featureType;
    }

    public void setFeatureType(String type) {
        this.featureType = type;
    }

}
