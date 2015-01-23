package org.opentripplanner.common.model.extras;

import org.opentripplanner.common.MavenVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

/**
 * An optional additional field with a numeric value that may be added to an Edge or Vertex.
 * Enum type defines the list of optional fields available as an enumeration.
 *
 * Created by kathrynkillebrew on 1/22/15.
 */
public abstract class ExtraAttribute<T extends Enum<T> & OptionFieldsFactory> implements Serializable {

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    private static Logger LOG = LoggerFactory.getLogger(ExtraAttribute.class);

    // Field name used by input source
    private final String inputLabel;


    public ExtraAttribute(String inputLabel) {
        this.inputLabel = inputLabel;
    }

    public String getLabel() {
        return inputLabel;
    }

    /**
     * Find which field this option is for
     *
     * @return Enumeration value defined for field
     */
    public abstract T getName();

    public abstract Number getValue();

    // An ExtraAttribute equals another if of the same option type and with the same value
    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (this.getClass().equals(o.getClass())) {
            ExtraAttribute obj = (ExtraAttribute)o;
            if (obj.getValue() == this.getValue()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // <ExtraAttribute> FIELD_ENUMERATION_VALUE -> 5 (Input label for byte value 5)
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("<ExtraAttribute> ");
        sb.append(this.getName());
        sb.append(" -> ");
        sb.append(this.getValue());
        sb.append(" (");
        sb.append(this.getLabel());
        sb.append(")");
        return sb.toString();
    }
}

