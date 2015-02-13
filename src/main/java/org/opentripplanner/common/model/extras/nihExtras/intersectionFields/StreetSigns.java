package org.opentripplanner.common.model.extras.nihExtras.intersectionFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;


public class StreetSigns extends OptionAttribute<NihIntersectionOptions> {

    public static final NihIntersectionOptions optionName = NihIntersectionOptions.STREET_SIGNS;

    public static final StreetSigns HAS_NONE = new StreetSigns("None");
    public static final StreetSigns ONE = new StreetSigns("One sign");
    public static final StreetSigns MULTIPLE = new StreetSigns("More than one sign");

    // make constructor private to prevent subclasses
    private StreetSigns(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihIntersectionOptions getName() {
        return optionName;
    }

}
