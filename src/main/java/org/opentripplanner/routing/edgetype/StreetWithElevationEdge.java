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

import org.opentripplanner.common.geometry.CompactElevationProfile;
import org.opentripplanner.common.geometry.PackedCoordinateSequence;
import org.opentripplanner.routing.util.ElevationUtils;
import org.opentripplanner.routing.util.SlopeCosts;
import org.opentripplanner.routing.vertextype.StreetVertex;

import com.vividsolutions.jts.geom.LineString;

/**
 * A StreetEdge with elevation data.
 * 
 * @author laurent
 */
public class StreetWithElevationEdge extends StreetEdge {

    private static final long serialVersionUID = 1L;

    private byte[] packedElevationProfile;

    private float slopeSpeedFactor = 1.0f;

    private float slopeWorkFactor = 1.0f;

    private float maxSlope;

    private boolean flattened;

    /* Create without OSM Way ID */
    public StreetWithElevationEdge(StreetVertex v1, StreetVertex v2, LineString geometry,
            String name, double length, StreetTraversalPermission permission, boolean back) {
        this(v1, v2, geometry, name, length, permission, back, "");
    }

    public StreetWithElevationEdge(StreetVertex v1, StreetVertex v2, LineString geometry,
            String name, double length, StreetTraversalPermission permission, boolean back, String osmId) {
        super(v1, v2, geometry, name, length, permission, back, osmId);
    }

    @Override
    public StreetWithElevationEdge clone() {
        return (StreetWithElevationEdge) super.clone();
    }

    public boolean setElevationProfile(PackedCoordinateSequence elev, boolean computed) {
        if (elev == null || elev.size() < 2) {
            return false;
        }
        if (super.isSlopeOverride() && !computed) {
            return false;
        }
        boolean slopeLimit = getPermission().allows(StreetTraversalPermission.CAR);
        SlopeCosts costs = ElevationUtils.getSlopeCosts(elev, slopeLimit);

        packedElevationProfile = CompactElevationProfile.compactElevationProfile(elev);
        slopeSpeedFactor = (float)costs.slopeSpeedFactor;
        slopeWorkFactor = (float)costs.slopeWorkFactor;
        maxSlope = (float)costs.maxSlope;
        flattened = costs.flattened;

        bicycleSafetyFactor *= costs.lengthMultiplier;
        bicycleSafetyFactor += costs.slopeSafetyCost / getDistance();
        return costs.flattened;
    }

    @Override
    public PackedCoordinateSequence getElevationProfile() {
        return CompactElevationProfile.uncompactElevationProfile(packedElevationProfile);
    }

    @Override
    public boolean isElevationFlattened() {
        return flattened;
    }

    @Override
    public float getMaxSlope() {
        return maxSlope;
    }

    @Override
    public double getSlopeSpeedEffectiveLength() {
        return slopeSpeedFactor * getDistance();
    }

    @Override
    public double getSlopeWorkCostEffectiveLength() {
        return slopeWorkFactor * getDistance();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("StreetWithElevationEdge(");
        sb.append(getId());
        sb.append(", ");
        sb.append(getName());
        sb.append(", ");
        sb.append(getOsmId());
        sb.append(", ");
        sb.append(fromv);
        sb.append(" -> ");
        sb.append(tov);
        sb.append(" length=");
        sb.append(this.getDistance());
        sb.append(" permission=");
        sb.append(this.getPermission());
        if (super.getExtraOptionFields() != null) {
            sb.append(super.getExtraOptionFields().toString());
        }
        if (super.getExtraNumericFields() != null) {
            sb.append(super.getExtraNumericFields().toString());
        }
        sb.append(")");
        return sb.toString();
    }
}
