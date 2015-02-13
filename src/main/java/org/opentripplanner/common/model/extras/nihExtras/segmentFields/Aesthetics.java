package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class Aesthetics extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.AESTHETIC;

    public static final Aesthetics YES = new Aesthetics("Y");
    public static final Aesthetics NO = new Aesthetics("N");

    // make constructor private to prevent subclasses
    private Aesthetics(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
