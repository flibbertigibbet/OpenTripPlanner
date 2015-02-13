package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class CrossingRisk extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.CROSSING_RISK;

    public static final CrossingRisk LOW = new CrossingRisk("Low");
    public static final CrossingRisk MODERATE = new CrossingRisk("Moderate");
    public static final CrossingRisk SEVERE = new CrossingRisk("Severe");

    // make constructor private to prevent subclasses
    private CrossingRisk(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
