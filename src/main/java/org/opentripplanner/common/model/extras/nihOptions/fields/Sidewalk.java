package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class Sidewalk extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.SIDEWALK;

    public static final Sidewalk YES = new Sidewalk("Both");
    public static final Sidewalk NO = new Sidewalk("None");

    // make constructor private to prevent subclasses
    private Sidewalk(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
