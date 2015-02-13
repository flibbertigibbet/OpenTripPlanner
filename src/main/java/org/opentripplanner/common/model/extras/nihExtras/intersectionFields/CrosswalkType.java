package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class CrosswalkType extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.CROSSWALK_TYPE;

    public static final CrosswalkType HAS_NONE = new CrosswalkType("None");
    public static final CrosswalkType HAS_CROSSWALK = new CrosswalkType("Crosswalk");
    public static final CrosswalkType HIGH_VISIBILITY = new CrosswalkType("High visibility crosswalk");

    // make constructor private to prevent subclasses
    private CrosswalkType(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
