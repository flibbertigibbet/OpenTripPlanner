package org.opentripplanner.common.model.extras;

import com.conveyal.gtfs.error.NumberParseError;
import org.opentripplanner.common.MavenVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;

/**
 * An optional additional field that may be added to an Edge or Vertex.
 * Enum type defines the list of optional fields available as an enumeration.
 * The option attribute subclasses of this will be assigned a byte value; all of the field subclasses
 * will have their option byte values taken from the shared byte here, so there can be a a maximum of
 * 256 possible option values across all the option fields without using a larger type.
 *
 * Created by kathrynkillebrew on 1/22/15.
 */
public abstract class OptionAttribute<T extends Enum<T> & OptionFieldsFactory> extends ExtraAttribute {

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    // ordinal of next option to be created (start with minimum byte value)
    private static byte nextOrdinal = -128;

    // assign an ordinal to this option
    private final byte ordinal = nextOrdinal++;

    // for reverse lookup by field name + input label
    private static HashMap<String, OptionAttribute> labelLookup = new HashMap();

    // for reverse lookup by option value
    private static HashMap<Byte, OptionAttribute> byteLookup = new HashMap();


    public OptionAttribute(String inputLabel) {
        super(inputLabel);

        byteLookup.put(this.ordinal, this);

        // for lookup during input processing by input field name label + option column value
        labelLookup.put(((T)this.getName()).getFieldName() + this.getLabel(), this);
    }

    /**
     * Find the field option model for its input string value
     *
     * @param label String used in input to define the value assigned
     * @return Option model for selection (an instance of a subclass of this class)
     */
    public static OptionAttribute getOptionForLabel(String label) {
        return labelLookup.get(label);
    }

    /**
     * Find the field option model for its byte value
     *
     * @param value Ordinal value assigned to this option, tracked in the OptionSet
     * @return Option model for selection (an instance of a subclass of this class)
     */
    public static OptionAttribute getOptionForValue(Byte value) {
        return byteLookup.get(value);
    }

    @Override
    public Number getValue() {
        return ordinal;
    }

    // An OptionAttribute equals another if of the same option type and with the same byte value
    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (this.getClass().equals(o.getClass())) {
            OptionAttribute obj = (OptionAttribute)o;
            if (obj.getValue() == this.getValue()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // <OptionAttribute> FIELD_ENUMERATION_VALUE -> 5 (Input label for byte value 5)
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("<OptionAttribute> ");
        sb.append(this.getName());
        sb.append(" -> ");
        sb.append(this.getValue());
        sb.append(" (");
        sb.append(this.getLabel());
        sb.append(")");
        return sb.toString();
    }
}

