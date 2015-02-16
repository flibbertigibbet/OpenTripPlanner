package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class Configuration extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.CONFIGURATION;

    public static final Configuration T_INTERSECTION = new Configuration("T-intersection");
    public static final Configuration FOUR_WAY = new Configuration("4-way intersection");

    // make constructor private to prevent subclasses
    private Configuration(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
