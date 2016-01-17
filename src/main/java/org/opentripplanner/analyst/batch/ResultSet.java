/* This program is free software: you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public License
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>. */

package org.opentripplanner.analyst.batch;

import org.opentripplanner.analyst.core.Sample;
import org.opentripplanner.routing.spt.ShortestPathTree;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// store output outside individuals so populations can be reused
public class ResultSet {

    private static final Logger LOG = LoggerFactory.getLogger(ResultSet.class);

    public Population population;
    public int[] travelTimes;        // total travel time, in seconds
    public double[] walkDistances;   // distance walked, in meters
    public int[] boardings;          // transit vehicle boardings (# transfers + 1, or 0 if walking only)

    
    public static ResultSet forTravelTimes(Population population, ShortestPathTree spt) {
        int[] travelTimes = new int[population.size()];
        double[] walkDistances = new double[population.size()];
        int[] boardings = new int[population.size()];

        int i = 0;
        for (Individual indiv : population) {

            Sample s = indiv.sample;

            if (s == null) {
                continue;
            } else {
                long travelTime = s.eval(spt);
                if (travelTime == Long.MAX_VALUE) {
                    continue;
                }

                // if travel time is > 2,147,483,647 seconds (68 years),
                // should really consider a better search cutoff :-)
                travelTimes[i] = (int) travelTime;

                walkDistances[i] = s.evalWalkDistance(spt);
                boardings[i] = s.evalBoardings(spt);
            }

            i++;
        }
        return new ResultSet(population, travelTimes, walkDistances, boardings);
    }
    
    public ResultSet(Population population, int[] results, double[] walkDistnaces, int[] boardings) {
        this.population = population;
        this.travelTimes = results;
        this.walkDistances = walkDistnaces;
        this.boardings = boardings;
    }
    
    protected ResultSet(Population population) {
        this.population = population;
        this.travelTimes = new int[population.size()];
        this.walkDistances = new double[population.size()];
        this.boardings = new int[population.size()];
    }

    public void writeAppropriateFormat(String outFileName) {
        population.writeAppropriateFormat(outFileName, this);
    }
    
}
