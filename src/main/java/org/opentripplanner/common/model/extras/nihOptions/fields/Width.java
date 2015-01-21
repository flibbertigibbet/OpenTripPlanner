package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class Width extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.WIDTH;

    public static final Width LESS_THAN_FOUR_FEET = new Width("< 4 feet");
    public static final Width FOUR_TO_FIVE_FEET = new Width("> 4-4'11 feet");
    public static final Width MORE_THAN_FIVE_FEET = new Width("> 5 feet");
    public static final Width MORE_THAN_TEN_FEET = new Width(">10 feet");

    // make constructor private to prevent subclasses
    private Width(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
