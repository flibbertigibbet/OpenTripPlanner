package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class Traffic extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.TRAFFIC;

    public static final Traffic NO_TRAFFIC = new Traffic("None");
    public static final Traffic LIGHT = new Traffic("Light");
    public static final Traffic MODERATE = new Traffic("Moderate");
    public static final Traffic HEAVY = new Traffic("Heavy");

    // make constructor private to prevent subclasses
    private Traffic(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
