package org.opentripplanner.routing.edgetype;

import org.opentripplanner.common.model.extras.NumericFieldSet;
import org.opentripplanner.common.model.extras.OptionAttribute;
import org.opentripplanner.common.model.extras.OptionSet;
import org.opentripplanner.common.model.extras.nihExtras.NihIntersectionOptions;
import org.opentripplanner.common.model.extras.nihExtras.NihNumericIntersections;
import org.opentripplanner.common.model.extras.nihExtras.NihNumericSegments;
import org.opentripplanner.common.model.extras.nihExtras.NihSegmentOptions;
import org.opentripplanner.common.model.extras.nihExtras.intersectionFields.CrossingRisk;
import org.opentripplanner.common.model.extras.nihExtras.intersectionFields.IntersectionType;
import org.opentripplanner.common.model.extras.nihExtras.intersectionFields.Signalization;
import org.opentripplanner.routing.core.RoutingRequest;
import org.opentripplanner.routing.core.State;
import org.opentripplanner.routing.core.StateEditor;
import org.opentripplanner.routing.core.TraverseMode;
import org.opentripplanner.routing.graph.Edge;
import org.opentripplanner.routing.graph.Vertex;
import org.opentripplanner.routing.util.ElevationUtils;
import org.opentripplanner.routing.vertextype.IntersectionVertex;
import org.opentripplanner.routing.vertextype.StreetVertex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.EnumMap;

/**
 * Created by kathrynkillebrew on 1/23/15.
 */
public class StreetEdgeTraversal {

    private static Logger LOG = LoggerFactory.getLogger(StreetEdgeTraversal.class);

    // assume 12 ft (3.7 m) standard lane width
    // http://en.wikipedia.org/wiki/Lane
    private static final double LANE_WIDTH_METERS = 3.7;

    // constant for dealing with values ranging from 0 to 100
    private static final double NIH_RANGE_WEIGHTING = 50;

    private static final double GREENWAY_SAFETY_FACTOR = 0.1;

    public static final byte CONCRETE_VAL = org.opentripplanner.common.model.extras.nihExtras.segmentFields.Surface.CONCRETE.getValue();

    private StreetEdge edge;
    private State state;

    public StreetEdgeTraversal(StreetEdge edge, State state) {
        this.edge = edge;
        this.state = state;
    }

    /** return a StateEditor rather than a State so that we can make parking/mode switch modifications for kiss-and-ride. */
    public StateEditor doTraverse(RoutingRequest options, TraverseMode traverseMode) {
        boolean walkingBike = options.walkingBike;
        boolean backWalkingBike = state.isBackWalkingBike();
        TraverseMode backMode = state.getBackMode();
        Edge backEdge = state.getBackEdge();
        if (backEdge != null) {
            // No illegal U-turns.
            // NOTE(flamholz): we check both directions because both edges get a chance to decide
            // if they are the reverse of the other. Also, because it doesn't matter which direction
            // we are searching in - these traversals are always disallowed (they are U-turns in one direction
            // or the other).
            // TODO profiling indicates that this is a hot spot.
            if (edge.isReverseOf(backEdge) || backEdge.isReverseOf(edge)) {
                return null;
            }
        }

        // Ensure we are actually walking, when walking a bike
        backWalkingBike &= TraverseMode.WALK.equals(backMode);
        walkingBike &= TraverseMode.WALK.equals(traverseMode);

        /* Check whether this street allows the current mode. If not and we are biking, attempt to walk the bike. */
        if (!edge.canTraverse(options, traverseMode)) {
            if (traverseMode == TraverseMode.BICYCLE) {
                return doTraverse(options.bikeWalkingOptions, TraverseMode.WALK);
            }
            return null;
        }

        // Automobiles have variable speeds depending on the edge type
        double speed = edge.calculateSpeed(options, traverseMode);

        double time = edge.getDistance() / speed;
        double weight;

        if (options.wheelchairAccessible) {
            weight = edge.getSlopeSpeedEffectiveLength() / speed;
        } else if (traverseMode.equals(TraverseMode.BICYCLE)) {
            time = edge.getSlopeSpeedEffectiveLength() / speed;
            switch (options.optimize) {
                case SAFE:
                    weight = edge.bicycleSafetyFactor * edge.getDistance() / speed;
                    break;
                case GREENWAYS:
                    weight = edge.bicycleSafetyFactor * edge.getDistance() / speed;
                    if (edge.bicycleSafetyFactor <= GREENWAY_SAFETY_FACTOR) {
                        // greenways are treated as even safer than they really are
                        weight *= 0.66;
                    }
                    break;
                case FLAT:
                /* see notes in StreetVertex on speed overhead */
                    weight = edge.getDistance() / speed + edge.getSlopeWorkCostEffectiveLength();
                    break;
                case QUICK:
                    weight = edge.getSlopeSpeedEffectiveLength() / speed;
                    break;
                case TRIANGLE:
                    double quick = edge.getSlopeSpeedEffectiveLength();
                    double safety = edge.bicycleSafetyFactor * edge.getDistance();
                    // TODO This computation is not coherent with the one for FLAT
                    double slope = edge.getSlopeWorkCostEffectiveLength();
                    weight = quick * options.triangleTimeFactor + slope
                            * options.triangleSlopeFactor + safety
                            * options.triangleSafetyFactor;
                    weight /= speed;
                    break;
                default:
                    weight = edge.getDistance() / speed;
            }
        } else {
            if (walkingBike) {
                // take slopes into account when walking bikes
                time = edge.getSlopeSpeedEffectiveLength() / speed;
            }
            weight = time;
            if (traverseMode.equals(TraverseMode.WALK)) {

                // original slope weighting logic; use when steepness multiplier not set
                // take slopes into account when walking
                // FIXME: this causes steep stairs to be avoided. see #1297.
                double costs = ElevationUtils.getWalkCostsForSlope(edge.getDistance(), edge.getMaxSlope());
                // as the cost walkspeed is assumed to be for 4.8km/h (= 1.333 m/sec) we need to adjust
                // for the walkspeed set by the user
                double elevationUtilsSpeed = 4.0 / 3.0;
                weight = costs * (elevationUtilsSpeed / speed);
                /////////////////////////////////////////////////

                //////////////////////////////////////////////////////////////////
                if (options.steepnessFactor > 0) {
                    double quick = edge.getSlopeSpeedEffectiveLength();
                    double slope = edge.getSlopeWorkCostEffectiveLength();
                    double timeFactor = 1 - options.steepnessFactor; // factors must sum to 1
                    
                    // TODO: calculate walking safety factor
                    //double safety = edge.bicycleSafetyFactor * edge.getDistance();

                    weight = quick * timeFactor + slope * options.steepnessFactor;
                    weight /= speed;

                    // TODO: to add safety calculation:
                    // +  safety * options.triangleSafetyFactor;
                }
                //////////////////////////////////////////////////////

                time = weight; //treat cost as time, as in the current model it actually is the same (this can be checked for maxSlope == 0)
                /*
                // debug code
                if(weight > 100){
                    double timeflat = length / speed;
                    System.out.format("line length: %.1f m, slope: %.3f ---> slope costs: %.1f , weight: %.1f , time (flat):  %.1f %n", length, elevationProfile.getMaxSlope(), costs, weight, timeflat);
                }
                */
            }
        }

        if (options.preferBenches && (edge.getBenchCount() > 0)) {
            LOG.info("Found edge {}: {} has a bench!  Weighting it.", edge.getName(), edge.getId());
            weight *= 0.001;
            time *= 0.001;
        }

        if (options.preferToilets && (edge.getToiletCount() > 0)) {
            LOG.info("Found edge {}: {} has a toilet!  Weighting it.", edge.getName(), edge.getId());
            weight *= 0.001;
            time *= 0.001;
        }

        StateEditor s1 = state.edit(edge);
        s1.setBackMode(traverseMode);
        s1.setBackWalkingBike(walkingBike);

        ///////////////////////////////////
        // NIH weighting preferences
        OptionSet extraOptions = edge.getExtraOptionFields();
        NumericFieldSet numericFieldSet = edge.getExtraNumericFields();
        boolean isAudited = (extraOptions != null) || (numericFieldSet != null);

        if (isAudited) {
            LOG.info("Found audited edge {}: {}", edge.getName(), edge.getOsmId());

            // prefer audited edges
            weight *= 0.8;

            // check for NIH routing params
            OptionAttribute slope = extraOptions.getOption(NihSegmentOptions.XSLOPE);
            if ((slope != null) && (slope == org.opentripplanner.common.model.extras.nihExtras.segmentFields.XSlope.SLOPED)) {
                s1.setHasCrossSlope(); // mark state
                if (!options.allowCrossSlope) {
                    LOG.info("Not taking edge {}: {} due to cross slope", edge.getName(), edge.getOsmId());
                    return null;
                } else if (options.usingWalkerCane || options.wheelchairAccessible) {
                    // strongly prefer to avoid cross slope for wheelchairs, walkers, or canes
                    weight *= 2;
                } else {
                    // negatively weight cross-sloped edge
                    LOG.info("Avoiding edge {}: {} due to cross slope", edge.getName(), edge.getOsmId());
                    weight *= 1.2;
                }
            }

            OptionAttribute rest = extraOptions.getOption(NihSegmentOptions.REST);
            if ((rest != null) && (rest != org.opentripplanner.common.model.extras.nihExtras.segmentFields.Rest.NONE_AVAILABLE)) {
                s1.setPassesRestingPlaces(); // mark state
                if (options.restingPlaces) {
                    LOG.info("Preferring edge {}: {} with resting place {}", edge.getName(), edge.getOsmId(), rest.getLabel());
                    weight *= 0.1;
                    time *= 0.1;
                }
            }

            /*
            if (options.walkSpeed <= SLIGHTLY_SLOW_WALKSPEED) {
                // TODO: number of lanes is missing from shapefile.
                // use it to increase weight for lots of lanes for slow walkers.
            }
            */

            OptionAttribute curbRamp = extraOptions.getOption(NihSegmentOptions.CURB_RAMP);
            if (curbRamp == org.opentripplanner.common.model.extras.nihExtras.segmentFields.CurbRamp.YES) {
                // prefer audited edges with curb ramps
                weight *= 0.9;
            } else if (curbRamp == org.opentripplanner.common.model.extras.nihExtras.segmentFields.CurbRamp.NO && (options.wheelchairAccessible || options.usingWalkerCane)) {
                // avoid streets without curb ramps if using wheelchair, walker or cane
                weight *= 2;
            }

            OptionAttribute sidewalk = extraOptions.getOption(NihSegmentOptions.SIDEWALK);
            if (sidewalk == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Sidewalk.YES) {
                // prefer audited edges with a sidewalk
                weight *= 0.8;
            }

            OptionAttribute aesthetic = extraOptions.getOption(NihSegmentOptions.AESTHETIC);
            if (aesthetic == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Aesthetics.YES) {
                // prefer pretty edges
                weight *= 0.9;
                s1.setIsAesthetic(); // mark state
            }

            // set weights generally based on NIH data
            // TODO: why do we have both "niceness" and "pleasantness"?
            // Does having these values mean we can ignore several of the other columns (traffic, disorder, etc?)
            if (numericFieldSet != null) {
                EnumMap<NihNumericSegments, Integer> numericExtras = numericFieldSet.getNumericValues();
                int niceness = numericExtras.get(NihNumericSegments.NICENESS);
                int pleasantness = numericExtras.get(NihNumericSegments.PLEASANTNESS);
                int safety = numericExtras.get(NihNumericSegments.SAFE_SCORE);

                /////////////////////////////////////////////////////////////////
                // weight all routes for niceness/pleasantness/safety
                // subtract 50 for these values (ranging from 0 to 100) so negative values reflect desirability
                niceness -= NIH_RANGE_WEIGHTING;
                pleasantness -= NIH_RANGE_WEIGHTING;
                safety -= NIH_RANGE_WEIGHTING;

                // modify weight for these up to 1/4 of original value, so they don't overwhelm other factors
                niceness /= NIH_RANGE_WEIGHTING * 4;
                pleasantness /= NIH_RANGE_WEIGHTING * 4;
                safety /= NIH_RANGE_WEIGHTING * 4;

                weight *= niceness;
                weight *= pleasantness;
                weight *= safety;
                //////////////////////////////////////////////////////////////////

                if (options.crowding != 0) {
                    LOG.info("Have crowding preference of {}", options.crowding);
                    int crowding = numericExtras.get(NihNumericSegments.CROWD_SCORE);

                    // crowding from shapefile ranges from 0 to 100;
                    // subtract 50 so negative numbers reflect magnitude of quietness,
                    // and positive numbers reflect magnitude of crowding
                    // (assuming middle of range is neither quiet nor crowded)
                    crowding -= NIH_RANGE_WEIGHTING;

                    // If crowding preference param is negative, prefer quiet.
                    double crowdingWeight = options.crowding * crowding / NIH_RANGE_WEIGHTING;
                    // if crowding amount is preferable, now have positive value ranging from 0 to 1
                    // if crowding amount is undesirable, now have negative value from 0 to -1
                    weight -= crowdingWeight;
                    LOG.info("Subtracting crowding weight: {}", crowdingWeight);
                }
            }

            if (options.wheelchairAccessible) {
                 OptionAttribute width = extraOptions.getOption(NihSegmentOptions.WIDTH);
                 if (width == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Width.LESS_THAN_FOUR_FEET || width == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Width.FOUR_TO_FIVE_FEET) {
                     LOG.info("Avoiding narrow sidewalk on {}: {}", edge.getName(), edge.getOsmId());
                     // strongly prefer streets wider than 5 feet for wheelchairs
                     weight *= 2;
                 }
            }
            OptionAttribute surface = extraOptions.getOption(NihSegmentOptions.SURFACE);

            // avoid non-concrete surfaces for wheelchairs or walker/cane
            if (options.wheelchairAccessible || options.usingWalkerCane) {
                 if (surface != null && surface != org.opentripplanner.common.model.extras.nihExtras.segmentFields.Surface.CONCRETE) {
                     LOG.info("Avoiding edge {}: {} due to surface {}", edge.getName(), edge.getOsmId(), surface.getLabel());
                     weight *= 2;
                 }
            }

            // add to weight for non-concrete surfaces
            if ((surface != null) && (options.surfaceComfort < 1) && (surface != org.opentripplanner.common.model.extras.nihExtras.segmentFields.Surface.CONCRETE)) {
                // byte values increase by 1 for each surface more difficult to traverse than previous
                // (concrete is the easiest)
                // get a value between 0 and 1
                double val = (Math.abs(surface.getValue() - CONCRETE_VAL) / 4.0);
                // reverse input param range of 0 (not comfortable) to 1 (very comfortable)
                double surfaceWeight = (1 - options.surfaceComfort) * val;
                LOG.info("Avoiding edge {}: {} with surface {} using added weight {}", edge.getName(), edge.getOsmId(),
                        surface.getLabel(), surfaceWeight);
                weight += surfaceWeight;
            }

            OptionAttribute hazard = extraOptions.getOption(NihSegmentOptions.HAZARD_SEVERE);
            if (hazard != null) {
                if (hazard == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Hazards.NO_HAZARDS) {
                    weight *= 0.8;
                } else if (hazard == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Hazards.LOW) {
                    weight *= 1.1;
                } else if (hazard == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Hazards.MODERATE) {
                    weight *= 1.5;
                } else if (hazard == org.opentripplanner.common.model.extras.nihExtras.segmentFields.Hazards.HIGH) {
                    weight *= 1.7;
                } else {
                    LOG.warn("Hazard level {} not recognized", hazard.getLabel());
                }
            }
        }
        //////////////////////////////////

        // accumulate feature counts
        s1.incrementBenchCount(edge.getBenchCount());
        s1.incrementToiletCount(edge.getToiletCount());
        ////////////////////////////////////////

        if (edge.isStairs()) {
            weight *= options.stairsReluctance;
        } else {
            // TODO: this is being applied even when biking or driving.
            weight *= options.walkReluctance;
        }

        /* Compute turn cost. */
        StreetEdge backPSE;
        if (backEdge != null && backEdge instanceof StreetEdge) {
            backPSE = (StreetEdge) backEdge;
            RoutingRequest backOptions = backWalkingBike ?
                    state.getOptions().bikeWalkingOptions : state.getOptions();
            double backSpeed = backPSE.calculateSpeed(backOptions, backMode);
            double realTurnCost;  // Units are seconds.

            // Apply turn restrictions
            if (options.arriveBy && !edge.canTurnOnto(backPSE, state, backMode)) {
                return null;
            } else if (!options.arriveBy && !backPSE.canTurnOnto(edge, state, traverseMode)) {
                return null;
            }

            /*
             * This is a subtle piece of code. Turn costs are evaluated differently during
             * forward and reverse traversal. During forward traversal of an edge, the turn
             * *into* that edge is used, while during reverse traversal, the turn *out of*
             * the edge is used.
             *
             * However, over a set of edges, the turn costs must add up the same (for
             * general correctness and specifically for reverse optimization). This means
             * that during reverse traversal, we must also use the speed for the mode of
             * the backEdge, rather than of the current edge.
             */

            Vertex fromv = edge.getFromVertex();
            Vertex tov = edge.getToVertex();
            IntersectionVertex traversedVertex = null;

            if (options.arriveBy && tov instanceof IntersectionVertex) { // arrive-by search
                traversedVertex = ((IntersectionVertex) tov);

                realTurnCost = backOptions.getIntersectionTraversalCostModel().computeTraversalCost(
                        traversedVertex, edge, backPSE, backMode, backOptions, (float) speed,
                        (float) backSpeed);
            } else if (!options.arriveBy && fromv instanceof IntersectionVertex) { // depart-after search
                traversedVertex = ((IntersectionVertex) fromv);

                realTurnCost = options.getIntersectionTraversalCostModel().computeTraversalCost(
                        traversedVertex, backPSE, edge, traverseMode, options, (float) backSpeed,
                        (float) speed);
            } else {
                // In case this is a temporary edge not connected to an IntersectionVertex
                LOG.debug("Not computing turn cost for edge {}", edge);
                realTurnCost = 0;
            }

            if (options.preferBenches && (edge.getBenchCount() > 0)) {
                LOG.info("Found edge {}: {} has a bench!  Changing its turn cost.", edge.getName(), edge.getId());
                realTurnCost *= 0.001;
            }

            if (options.preferToilets && (edge.getToiletCount() > 0)) {
                LOG.info("Found edge {}: {} has a toilet!  Changing its turn cost.", edge.getName(), edge.getId());
                realTurnCost *= 0.001;
            }

            //////////////////////////////////////////////////////////
            // NIH turn cost preferences

            // use intersections data here to set turning costs
            OptionSet<NihIntersectionOptions> intersectionOptions = traversedVertex.getExtraOptionFields();
            if (traversedVertex != null && intersectionOptions != null) {
                // how long is spent waiting to cross, and then walking across the intersection
                double enterSeconds;
                double traverseSeconds;

                OptionAttribute intersectionType = intersectionOptions.getOption(NihIntersectionOptions.INTERSECTION_TYPE);
                OptionAttribute signalType = intersectionOptions.getOption(NihIntersectionOptions.SIGNALIZATION);
                OptionAttribute crossRisk = intersectionOptions.getOption(NihIntersectionOptions.CROSSING_RISK);

                NumericFieldSet<NihNumericIntersections> intersectionsNumericFieldSet = traversedVertex.getExtraNumericFields();
                if (intersectionsNumericFieldSet != null) {
                    EnumMap<NihNumericIntersections, Integer> intersectionNumericFields =
                            intersectionsNumericFieldSet.getNumericValues();

                    // Strangely, lane counts are associated with intersections and not edges.
                    // What happens if streets with different lane counts intersect?
                    int laneCt = intersectionNumericFields.get(NihNumericIntersections.LANE_COUNT);
                    float signalLength = intersectionNumericFields.get(NihNumericIntersections.SIGNAL_TIME) /
                            NumericFieldSet.SIGNAL_TIME_CONVERSION;

                    // set turn cost (traversal time, in seconds) based on lane count and time spent waiting to enter

                    // if we have signal length, then there is a walk sign present
                    if (signalLength > 0) {
                        // pedestrian will have to wait up to signal length to enter; assume average wait is about half that time
                        enterSeconds = signalLength / 2;
                    } else if (intersectionType == IntersectionType.TRAFFIC_SIGNAL && signalType != Signalization.WALK_SIGNAL) {
                        // an intersection controlled by a traffic light, but has no walk sign
                        enterSeconds = 60;
                    } else if (intersectionType == IntersectionType.STOP_SIGN) {
                        // presumably drivers at a stop sign will allow pedestrians waiting to cross pretty quickly
                        enterSeconds = 10;
                    } else {
                        // no stop sign, light, or walk signal; pedestrians might end up waiting a long time to enter
                        enterSeconds = 180;
                    }


                    traverseSeconds = laneCt * LANE_WIDTH_METERS * options.walkSpeed;
                    realTurnCost = enterSeconds + traverseSeconds;

                    if (crossRisk == CrossingRisk.LOW) {
                        realTurnCost *= 0.5;
                    } else if (crossRisk == CrossingRisk.SEVERE) {
                        realTurnCost += 120;
                    }

                }
            }
            //////////////////////////////////////////////////////////

            if (!traverseMode.isDriving()) {
                s1.incrementWalkDistance(realTurnCost / 100);  // just a tie-breaker
            }

            long turnTime = (long) Math.ceil(realTurnCost);
            time += turnTime;
            weight += options.turnReluctance * realTurnCost;
        }


        if (walkingBike || TraverseMode.BICYCLE.equals(traverseMode)) {
            if (!(backWalkingBike || TraverseMode.BICYCLE.equals(backMode))) {
                s1.incrementTimeInSeconds(options.bikeSwitchTime);
                s1.incrementWeight(options.bikeSwitchCost);
            }
        }

        if (!traverseMode.isDriving()) {
            s1.incrementWalkDistance(edge.getDistance());
        }

        /* On the pre-kiss/pre-park leg, limit both walking and driving, either soft or hard. */
        int roundedTime = (int) Math.ceil(time);
        if (options.kissAndRide || options.parkAndRide) {
            if (options.arriveBy) {
                if (!state.isCarParked()) s1.incrementPreTransitTime(roundedTime);
            } else {
                if (!state.isEverBoarded()) s1.incrementPreTransitTime(roundedTime);
            }
            if (s1.isMaxPreTransitTimeExceeded(options)) {
                if (options.softPreTransitLimiting) {
                    weight += calculateOverageWeight(state.getPreTransitTime(), s1.getPreTransitTime(),
                            options.maxPreTransitTime, options.preTransitPenalty,
                            options.preTransitOverageRate);
                } else return null;
            }
        }

        /* Apply a strategy for avoiding walking too far, either soft (weight increases) or hard limiting (pruning). */
        if (s1.weHaveWalkedTooFar(options)) {

            // if we're using a soft walk-limit
            if( options.softWalkLimiting ){
                // just slap a penalty for the overage onto s1
                weight += calculateOverageWeight(state.getWalkDistance(), s1.getWalkDistance(),
                        options.getMaxWalkDistance(), options.softWalkPenalty,
                        options.softWalkOverageRate);
            } else {
                // else, it's a hard limit; bail
                LOG.debug("Too much walking. Bailing.");
                return null;
            }
        }

        s1.incrementTimeInSeconds(roundedTime);
        s1.incrementWeight(weight);

        return s1;
    }

    private static double calculateOverageWeight(double firstValue, double secondValue, double maxValue,
                                          double softPenalty, double overageRate) {
        // apply penalty if we stepped over the limit on this traversal
        boolean applyPenalty = false;
        double overageValue;

        if(firstValue <= maxValue && secondValue > maxValue){
            applyPenalty = true;
            overageValue = secondValue - maxValue;
        } else {
            overageValue = secondValue - firstValue;
        }

        // apply overage and add penalty if necessary
        return (overageRate * overageValue) + (applyPenalty ? softPenalty : 0.0);
    }
}
