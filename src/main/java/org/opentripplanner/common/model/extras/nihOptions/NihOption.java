package org.opentripplanner.common.model.extras.nihOptions;

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.OptionFieldsFactory;
import org.opentripplanner.common.model.extras.nihOptions.fields.*;

import java.io.Serializable;


/**
 * Created by kathrynkillebrew on 1/22/15.
 */
public enum NihOption implements OptionFieldsFactory, Serializable {

    SIDEWALK("Sidewalk", false, Sidewalk.class),
    BIKE_LANE("BikeLane", false, BikeLane.class),
    PARKING_LANE("ParkingLan", false, ParkingLane.class),
    SHOULDER("Shoulder", false, Shoulder.class),
    WIDTH("Width", true, Width.class),
    SURFACE("Surface", true, Surface.class),
    CURB_RAMP("CurbRamp", true, CurbRamp.class),
    XSLOPE("Xslope", true, XSlope.class),
    REST("Rest", false, Rest.class),
    TRAFFIC("Traffic", false, Traffic.class),
    AESTHETIC("Aesthetics", false, Aesthetics.class),
    PHYSICAL_DISORDER("PhysicalDi", false, PhysicalDisorder.class),
    SOCIAL_DISORDER("SocialDiso", false, SocialDisorder.class),
    HAZARD_SEVERE("HazardSeve", false, Hazards.class);

    // TODO: these are numeric fields, not options
    //SAFE_SCORE("SafeScore", false),
    //PLEASANTNESS("Pleasantne", false),
    //NICENESS("Niceness", false);

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

    private NihOption(String fieldName, boolean hasLeftRight, Class<? extends OptionAttribute> clazz) {
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
