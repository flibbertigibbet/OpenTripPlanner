package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class Shoulder extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.SHOULDER;

    public static final Shoulder YES = new Shoulder("Both");
    public static final Shoulder NO = new Shoulder("None");

    // make constructor private to prevent subclasses
    private Shoulder(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
