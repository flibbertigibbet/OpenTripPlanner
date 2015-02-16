package org.opentripplanner.common.model.extras.nihExtras;

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.common.model.extras.ExtraFieldsFactory;

import java.io.Serializable;


/**
 * Created by kathrynkillebrew on 1/22/15.
 */
public enum NihNumericSegments implements ExtraFieldsFactory, Serializable {

    SAFE_SCORE("safescore"),
    CROWD_SCORE("crowdscore"),
    PLEASANTNESS("pleasantne"),
    NICENESS("niceness"),
    LAST_AUDIT("updated_at");

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    // Column name in input
    private final String fieldName;

    private NihNumericSegments(String fieldName) {
        this.fieldName = fieldName;
    }

    @Override
    public String getFieldName() {
        return fieldName;
    }

}
