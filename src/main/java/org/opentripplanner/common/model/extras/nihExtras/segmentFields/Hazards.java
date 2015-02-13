package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class Hazards extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.HAZARD_SEVERE;

    public static final Hazards NO_HAZARDS = new Hazards("");
    public static final Hazards LOW = new Hazards("Low");
    public static final Hazards MODERATE = new Hazards("Moderate");
    public static final Hazards HIGH = new Hazards("High");

    // make constructor private to prevent subclasses
    private Hazards(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
