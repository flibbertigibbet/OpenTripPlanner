package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class CurbRamp extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.CURB_RAMP;

    public static final CurbRamp YES = new CurbRamp("Y");
    public static final CurbRamp NO = new CurbRamp("N");

    // make constructor private to prevent subclasses
    private CurbRamp(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
