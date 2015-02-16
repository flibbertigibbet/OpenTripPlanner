package org.opentripplanner.common.model.extras.nihExtras;

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.OptionFieldsFactory;
import org.opentripplanner.common.model.extras.nihExtras.segmentFields.*;

import java.io.Serializable;


/**
 * Created by kathrynkillebrew on 1/22/15.
 */
public enum NihSegmentOptions implements OptionFieldsFactory, Serializable {


    SIDEWALK("sidewalk", false, Sidewalk.class),
    BIKE_LANE("bikelane", false, BikeLane.class),
    PARKING_LANE("parkinglan", false, ParkingLane.class),
    SHOULDER("shoulder", false, Shoulder.class),
    WIDTH("width", true, Width.class),
    SURFACE("surface", true, Surface.class),
    CURB_RAMP("curbramp", true, CurbRamp.class),
    XSLOPE("xslope", true, XSlope.class),
    REST("rest", false, Rest.class),
    AESTHETIC("aesthetics", false, Aesthetics.class),
    PHYSICAL_DISORDER("physicaldi", false, PhysicalDisorder.class),
    SOCIAL_DISORDER("socialdiso", false, SocialDisorder.class),
    HAZARD_SEVERE("hazardseve", false, Hazards.class);

    // NOTE:
    // Fields that are directional, but encoded in a single column (bike lane, parking lane, etc.)
    // have their input values (Both, Left, Right, None) normalized to just (Both, None) when read, so
    // a street edge with "Both" set for the attribute has that attribute going in that edge's direction.

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    // Column name in input
    private final String fieldName;

    // If true, there are two columns for the field, for each side of the road.
    private final boolean hasLeftRight;

    private final Class<? extends OptionAttribute> optionClass;

    private NihSegmentOptions(String fieldName, boolean hasLeftRight, Class<? extends OptionAttribute> clazz) {
        this.fieldName = fieldName;
        this.hasLeftRight = hasLeftRight;
        this.optionClass = clazz;
    }

    public boolean hasLeftRight() {
        return hasLeftRight;
    }

    @Override
    public String getFieldName() {
        return fieldName;
    }

    @Override
    public Class<? extends OptionAttribute> getOptionClass() {
        return optionClass;
    }
}
