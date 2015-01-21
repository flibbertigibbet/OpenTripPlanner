package org.opentripplanner.common.model.extras;

/**
 * Interface for optional fields enumeration.
 *
 * Created by kathrynkillebrew on 1/23/15.
 */
public interface OptionFieldsFactory {
    public abstract String getFieldName();
    public abstract Class<? extends OptionAttribute> getOptionClass();
}
