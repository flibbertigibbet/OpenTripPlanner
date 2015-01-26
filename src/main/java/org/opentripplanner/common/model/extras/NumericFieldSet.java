package org.opentripplanner.common.model.extras;

import org.opentripplanner.common.MavenVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.Serializable;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Set;

/**
 * Collection of optional, extra information that may be set on an Edge or Vertex.
 * Enum type defines the enumeration of optional fields that are set.
 *
 * Created by kathrynkillebrew on 1/22/15.
 */
public class NumericFieldSet<T extends Enum<T> & OptionFieldsFactory> implements Serializable {

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    private static Logger LOG = LoggerFactory.getLogger(NumericFieldSet.class);

    // cannot reference generic type in static block, so initialize option classes once with this flag
    private static boolean optionsInitialized = false;

    private transient EnumMap<T, Float> numericValues;

    // keep track of the enumeration type
    private Class<T> enumClass;

    // due to type erasure, must pass enum class in to constructor
    public NumericFieldSet(Class<T> clazz) {
        numericValues = new EnumMap(clazz);
        enumClass = clazz;
    }

    /**
     * Set the value for field using the field and value models
     *
     * @param option Field from fields enumeration
     * @param value Numeric value for field
     */
    public void setValue(T option,float value) {
        numericValues.put(option, value);
    }

    /**
     * Get the full set of values
     * @return Collection mapping field name from enumeration to float value set for field
     */
    public EnumMap<T, Float> getNumericValues() {
        return numericValues;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("<OptionSet <");
        sb.append(enumClass.getName());
        sb.append(">>: ");
        Set<T> options = numericValues.keySet();
        for (T option : options) {
            sb.append(option.name());
            sb.append(" (");
            sb.append(option.getFieldName());
            sb.append((") -> "));
            sb.append((numericValues.get(option)));
        }
        return sb.toString();
    }

    /*
    private void writeObject(java.io.ObjectOutputStream out) throws IOException {
        // perform default serialization of non-transient, non-static fields
        out.defaultWriteObject();

        // put extras into a HashMap for serialization
        HashMap<T, Float> serializableExtras = new HashMap<>(numericValues.size());

        for (T option : numericValues.keySet()) {
            serializableExtras.put(option, numericValues.get(option));
        }

        if (serializableExtras.size() > 0) {
            out.writeObject(serializableExtras);
        }

        out.writeObject(numericValues);
        out.flush();
    }

    private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException {
        // perform the default de-serialization first
        in.defaultReadObject();

        HashMap<T, Float> serializableExtras = (HashMap<T, Float>) in.readObject();

        if (serializableExtras == null) {
            return;
        }

        numericValues = new EnumMap(enumClass);
        numericValues.putAll(serializableExtras);
    }
    */
}
