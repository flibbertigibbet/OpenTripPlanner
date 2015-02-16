package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class PhysicalDisorder extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.PHYSICAL_DISORDER;

    public static final PhysicalDisorder NO_PHYSICAL_DISORDER = new PhysicalDisorder("None");
    public static final PhysicalDisorder LITTLE_LOCALIZED = new PhysicalDisorder("A little concentrated in 1-2 are");
    public static final PhysicalDisorder LITTLE_WIDESPREAD = new PhysicalDisorder("A little that is widespread");
    public static final PhysicalDisorder MUCH_WIDESPREAD = new PhysicalDisorder("A lot that is widespread");

    // make constructor private to prevent subclasses
    private PhysicalDisorder(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
