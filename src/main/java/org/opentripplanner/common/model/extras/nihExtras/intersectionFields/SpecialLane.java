package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class SpecialLane extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.SPECIAL_LANE;

    public static final SpecialLane ONE_WAY = new SpecialLane("One-way");
    public static final SpecialLane LEFT_TURN = new SpecialLane("Left Turn Lane");
    public static final SpecialLane CURB_EXTENSION = new SpecialLane("Curb Extension");
    public static final SpecialLane REFUGE_ISLAND = new SpecialLane("Refuge Island");

    // make constructor private to prevent subclasses
    private SpecialLane(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
