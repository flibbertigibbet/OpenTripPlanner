package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class Surface extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.SURFACE;

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
    public NihOption getName() {
        return optionName;
    }

}
