package org.opentripplanner.common.model.extras.nihOptions.fields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihOptions.NihOption;


public class SocialDisorder extends OptionAttribute<NihOption> {

    public static final NihOption optionName = NihOption.SOCIAL_DISORDER;

    public static final SocialDisorder NO_SOCIAL_DISORDER = new SocialDisorder("None");
    public static final SocialDisorder LITTLE = new SocialDisorder("A little");
    public static final SocialDisorder SOME = new SocialDisorder("Some");

    // make constructor private to prevent subclasses
    private SocialDisorder(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihOption getName() {
        return optionName;
    }

}
