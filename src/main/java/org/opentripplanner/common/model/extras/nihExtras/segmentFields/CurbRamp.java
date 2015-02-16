package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class CurbRamp extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.CURB_RAMP;

    public static final CurbRamp YES = new CurbRamp("Y");
    public static final CurbRamp NO = new CurbRamp("N");

    // make constructor private to prevent subclasses
    private CurbRamp(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
