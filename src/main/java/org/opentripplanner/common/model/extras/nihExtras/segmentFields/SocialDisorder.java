package org.opentripplanner.common.model.extras.nihExtras.segmentFields;

import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;


public class SocialDisorder extends OptionAttribute<NihSegmentOptions> {

    public static final NihSegmentOptions optionName = NihSegmentOptions.SOCIAL_DISORDER;

    public static final SocialDisorder NO_SOCIAL_DISORDER = new SocialDisorder("None");
    public static final SocialDisorder LITTLE = new SocialDisorder("A little");
    public static final SocialDisorder SOME = new SocialDisorder("Some");

    // make constructor private to prevent subclasses
    private SocialDisorder(String inputLabel) {
        super(inputLabel);
    }

    @Override
    public NihSegmentOptions getName() {
        return optionName;
    }

}
