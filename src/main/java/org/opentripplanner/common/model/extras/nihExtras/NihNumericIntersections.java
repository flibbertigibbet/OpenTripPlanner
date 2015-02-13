package org.opentripplanner.common.model.extras.nihExtras;

import org.opentripplanner.common.MavenVersion;
import org.opentripplanner.common.model.extras.ExtraFieldsFactory;

import java.io.Serializable;


/**
 * Created by kathrynkillebrew on 1/22/15.
 */
public enum NihNumericIntersections implements ExtraFieldsFactory, Serializable {

    SIGNAL_TIME("SignalTime"),
    LANE_COUNT("LaneCount");

    private static final long serialVersionUID = MavenVersion.VERSION.getUID();

    // Column name in input
    private final String fieldName;

    private NihNumericIntersections(String fieldName) {
        this.fieldName = fieldName;
    }

    @Override
    public String getFieldName() {
        return fieldName;
    }

}
