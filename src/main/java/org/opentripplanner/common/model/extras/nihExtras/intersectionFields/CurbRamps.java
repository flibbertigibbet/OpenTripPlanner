package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class CurbRamps extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.CURB_RAMPS;

    public static final CurbRamps SOME = new CurbRamps("Some");
    public static final CurbRamps ALL = new CurbRamps("All");

    // make constructor private to prevent subclasses
    private CurbRamps(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
