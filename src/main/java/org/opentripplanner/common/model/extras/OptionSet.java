package org.opentripplanner.common.model.extras;

import org.opentripplanner.common.MavenVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.Serializable;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Set;

/**
 * Collection of optional, extra information that may be set on an Edge or Vertex.
 * Enum type defines the enumeration of optional fields that are set.
 *
 * Created by kathrynkillebrew on 1/22/15.
 */
public class OptionSet<T extends Enum<T> & OptionFieldsFactory> implements Serializable {

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    private static Logger LOG = LoggerFactory.getLogger(OptionSet.class);

    // cannot reference generic type in static block, so initialize option classes once with this flag
    private static boolean optionsInitialized = false;

    private transient EnumMap<T, Byte> optionValues;

    // keep track of the enumeration type
    private Class<T> enumClass;

    // due to type erasure, must pass enum class in to constructor
    public OptionSet(Class<T> clazz) {
        optionValues = new EnumMap(clazz);
        enumClass = clazz;

        if (!optionsInitialized) {
            initializeOptions();
        }
    }

    private void initializeOptions() {
        for (T option : EnumSet.allOf(enumClass)) {
            Class<? extends OptionAttribute> optionClass = option.getOptionClass();
            try {
                // force initialization of option class (otherwise no options will exist unless referenced directly)
                Class.forName(optionClass.getName());
            } catch (ClassNotFoundException e) {
                LOG.error("Could not find OptionAttribute class {} to initialize", optionClass.getName());
                LOG.error(e.getStackTrace().toString());
            }
        }
        optionsInitialized = true;
    }

    /**
     * Set the value for field using the field and value models
     *
     * @param option Field from fields enumeration
     * @param attr Attribute instance for value to set on field
     */
    public void setValue(T option, OptionAttribute attr) {
        optionValues.put(option, attr.getValue());
    }

    /**
     * Set value for field using the field model and input string for option value
     *
     * @param option Field from fields enumeration
     * @param label Input field option value string defined in OptionAttribute model
     */
    public void setValue(T option, String label) {
        String fldName = option.getFieldName();

        if ((fldName == null) || fldName.isEmpty()) {
            throw new IllegalArgumentException("No field name found for option");
        }

        OptionAttribute attr = OptionAttribute.getOptionForLabel(fldName + label);

        if (attr == null) {
            throw new IllegalArgumentException("No OptionAttribute found for label " + fldName + label);
        }

        setValue(option, attr);
    }

    /**
     * Set value for field with input column name and value strings
     *
     * @param fieldName Input field name string defined in fields enumeration
     * @param fieldValue Input field option value string defined in OptionAttribute model
     */
    public void setValue(String fieldName, String fieldValue) {
        OptionAttribute attr = OptionAttribute.getOptionForLabel(fieldName + fieldValue);

        if (attr == null) {
            throw new IllegalArgumentException("No OptionAttribute found for field " + fieldName + " with value " + fieldValue);
        }

        T option = (T) attr.getName();

        if (option == null) {
            throw new IllegalArgumentException("No option field found in OptionAttribute for field " + fieldName);
        }
        setValue(option, attr);
    }

    /**
     * Get the full set of option values
     * @return Collection mapping field name from enumeration to byte value set for field
     */
    public EnumMap<T, Byte> getOptions() {
        return optionValues;
    }

    /**
     * Fetch the value set for the given option in this option collection.
     *
     * @param option Field name from the enumeration of fields
     * @return Attribute object for the value set on the given field
     */
    public OptionAttribute getOption(T option) {
        byte val = optionValues.get(option);
        return OptionAttribute.getOptionForValue(val);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("<OptionSet <");
        sb.append(enumClass.getName());
        sb.append(">>: ");
        Set<T> options = optionValues.keySet();
        for (T option : options) {
            OptionAttribute attr = getOption(option);
            if (attr == null) {
                LOG.warn("No attribute found for option {}!", option);
                continue;
            }
            sb.append(option.name());
            sb.append(" (");
            sb.append(option.getFieldName());
            sb.append((") -> "));
            sb.append((optionValues.get(option)));
            sb.append(" (");
            sb.append(attr.getLabel());
            sb.append((") "));
        }
        return sb.toString();
    }

    private void writeObject(java.io.ObjectOutputStream out) throws IOException {
        // perform default serialization of non-transient, non-static fields
        out.defaultWriteObject();

        // put extras into a HashMap for serialization
        HashMap<T, Byte> serializableExtras = new HashMap<>(optionValues.size());

        for (T option : optionValues.keySet()) {
            serializableExtras.put(option, optionValues.get(option));
        }

        if (serializableExtras.size() > 0) {
            out.writeObject(serializableExtras);
        }

        out.writeObject(optionValues);
        out.flush();
    }

    private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException {
        // perform the default de-serialization first
        in.defaultReadObject();

        HashMap<T, Byte> serializableExtras = (HashMap<T, Byte>) in.readObject();

        if (serializableExtras == null) {
            return;
        }

        // This is why serialization methods have been overridden here:
        // it is necessary to force the option classes to initialize after the
        // enum type class has been set, but before the values EnumMap is set.
        if (!optionsInitialized) {
            initializeOptions();
        }

        optionValues = new EnumMap(enumClass);
        optionValues.putAll(serializableExtras);
    }
}
