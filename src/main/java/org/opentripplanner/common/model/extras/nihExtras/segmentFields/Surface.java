package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class Surface extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.SURFACE;

    // TODO: make new type for multiple choice options?

    // ordered in descending order of ease to traverse
    public static final Surface CONCRETE = new Surface("Concrete");
    public static final Surface GRAVEL_CONCRETE = new Surface("Gravel;Concrete");
    public static final Surface EARTH_CONCRETE = new Surface("Dirt/grass;Concrete");
    public static final Surface GRAVEL = new Surface("Gravel");
    public static final Surface EARTH = new Surface("Dirt/grass");

    // make constructor private to prevent subclasses
    private Surface(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
