package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class IntersectionType extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.INTERSECTION_TYPE;

    public static final IntersectionType STOP_SIGN = new IntersectionType("Stop Sign");
    public static final IntersectionType TRAFFIC_SIGNAL = new IntersectionType("Traffic Signal");
    public static final IntersectionType HAS_NONE = new IntersectionType("None");

    // make constructor private to prevent subclasses
    private IntersectionType(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
