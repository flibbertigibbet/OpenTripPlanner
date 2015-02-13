package org.opentripplanner.common.model.extras.nihOptions;

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.common.model.extras.ExtraFieldsFactory;

import java.io.Serializable;


/**
 * Created by kathrynkillebrew on 1/22/15.
 */
public enum NihNumeric implements ExtraFieldsFactory, Serializable {

    SAFE_SCORE("safescore"),
    CROWD_SCORE("crowdscore"),
    PLEASANTNESS("pleasantne"),
    NICENESS("niceness"),
    LAST_AUDIT("updated_at");

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    // Column name in input
    private final String fieldName;

    private NihNumeric(String fieldName) {
        this.fieldName = fieldName;
    }

    @Override
    public String getFieldName() {
        return fieldName;
    }

}
