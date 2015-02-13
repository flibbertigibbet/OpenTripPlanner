package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class BikeLane extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.BIKE_LANE;

    public static final BikeLane YES = new BikeLane("Both");
    public static final BikeLane NO = new BikeLane("None");

    // make constructor private to prevent subclasses
    private BikeLane(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
