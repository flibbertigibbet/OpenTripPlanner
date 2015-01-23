package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class XSlope extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.XSLOPE;

    public static final XSlope LEVEL = new XSlope("Level");
    public static final XSlope SLOPED = new XSlope("Sloped");

    // make constructor private to prevent subclasses
    private XSlope(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
