package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class Aesthetics extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.AESTHETIC;

    public static final Aesthetics YES = new Aesthetics("Y");
    public static final Aesthetics NO = new Aesthetics("N");

    // make constructor private to prevent subclasses
    private Aesthetics(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
