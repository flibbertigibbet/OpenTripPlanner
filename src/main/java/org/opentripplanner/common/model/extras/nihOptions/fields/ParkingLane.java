package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class ParkingLane extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.PARKING_LANE;

    public static final ParkingLane YES = new ParkingLane("Both");
    public static final ParkingLane NO = new ParkingLane("None");

    // make constructor private to prevent subclasses
    private ParkingLane(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
