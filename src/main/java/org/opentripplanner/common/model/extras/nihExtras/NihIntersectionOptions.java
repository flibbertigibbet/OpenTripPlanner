package org.opentripplanner.common.model.extras.nihExtras;

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.OptionFieldsFactory;
import org.opentripplanner.common.model.extras.nihExtras.intersectionFields.*;

import java.io.Serializable;


/**
 * Created by kathrynkillebrew on 1/22/15.
 */
public enum NihIntersectionOptions implements OptionFieldsFactory, Serializable {

    INTERSECTION_TYPE("Intersec_1", IntersectionType.class),
    SIGNALIZATION("Signalizat", Signalization.class),
    CURB_RAMPS("CurbRamps", CurbRamps.class),
    STREET_SIGNS("StreetName", StreetSigns.class),
    CROSSWALK_TYPE("CrosswalkT", CrosswalkType.class),
    TRAFFIC("Traffic", Traffic.class),
    CONFIGURATION("Configurat", Configuration.class),
    SPECIAL_LANE("SpecialLan", SpecialLane.class),
    CROSSING_RISK("CrossingRi", CrossingRisk.class);

    // NOTE:
    // Fields that are directional, but encoded in a single column (bike lane, parking lane, etc.)
    // have their input values (Both, Left, Right, None) normalized to just (Both, None) when read, so
    // a street edge with "Both" set for the attribute has that attribute going in that edge's direction.

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    // Column name in input
    private final String fieldName;

    private final Class<? extends OptionAttribute> optionClass;

    private NihIntersectionOptions(String fieldName, Class<? extends OptionAttribute> clazz) {
        this.fieldName = fieldName;
        this.optionClass = clazz;
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
