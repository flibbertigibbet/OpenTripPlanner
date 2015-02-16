package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class Traffic extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.TRAFFIC;

    public static final Traffic LIGHT = new Traffic("Light");
    public static final Traffic MEDIUM = new Traffic("Medium");
    public static final Traffic HEAVY = new Traffic("Heavy");

    // make constructor private to prevent subclasses
    private Traffic(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
