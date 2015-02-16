package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class Rest extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.REST;

    public static final Rest NONE_AVAILABLE = new Rest("");
    public static final Rest OTHER_AVAILABLE = new Rest("Other");
    public static final Rest LOW_WALL = new Rest("Low Wall");
    public static final Rest BENCH = new Rest("Bench");
    public static final Rest SHELTER = new Rest("Shelter");

    // make constructor private to prevent subclasses
    private Rest(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
