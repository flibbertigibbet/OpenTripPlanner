package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class Signalization extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.SIGNALIZATION;

    public static final Signalization WALK_SIGNAL = new Signalization("Walk Signal");

    // make constructor private to prevent subclasses
    private Signalization(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
