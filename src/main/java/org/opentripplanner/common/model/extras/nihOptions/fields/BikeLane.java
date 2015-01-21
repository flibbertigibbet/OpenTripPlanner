package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class BikeLane extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.BIKE_LANE;

    public static final BikeLane YES = new BikeLane("Both");
    public static final BikeLane NO = new BikeLane("None");

    // make constructor private to prevent subclasses
    private BikeLane(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
