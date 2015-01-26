package org.opentripplanner.common.model.extras;

/**
 * Interface for extra option fields enumeration.
 *
 * Created by kathrynkillebrew on 1/23/15.
 */
public interface OptionFieldsFactory extends ExtraFieldsFactory {
    public abstract Class<? extends OptionAttribute> getOptionClass();
}
