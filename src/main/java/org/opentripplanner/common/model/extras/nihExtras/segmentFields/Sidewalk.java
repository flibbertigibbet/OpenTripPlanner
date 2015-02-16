package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class Sidewalk extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.SIDEWALK;

    public static final Sidewalk YES = new Sidewalk("Both");
    public static final Sidewalk NO = new Sidewalk("None");

    // make constructor private to prevent subclasses
    private Sidewalk(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
