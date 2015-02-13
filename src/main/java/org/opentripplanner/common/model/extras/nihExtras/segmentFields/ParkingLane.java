package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class ParkingLane extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.PARKING_LANE;

    public static final ParkingLane YES = new ParkingLane("Both");
    public static final ParkingLane NO = new ParkingLane("None");

    // make constructor private to prevent subclasses
    private ParkingLane(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
