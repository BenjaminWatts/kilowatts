import * as t from "./types";
import log from "../services/log";
import { fuelTypeUnitsDict, unitGroups } from "../assets/data/units";
import { interconnectors } from "../assets/data/interconnectors";

/*
shouldIncludeUnit
For use when filtering units from a list of records
Removes demand units and other units that are not major generators
*/
export const shouldIncludeUnit = (bmUnit: string) => {
  return (
    bmUnit.startsWith("T_") ||
    bmUnit.startsWith("E_") ||
    bmUnit.startsWith("I_") //||
    // bmUnit.startsWith("2_") remove supplier codes for now
  );
};

/*
get bm units runs through a list of records. 
if filterUnits is true, it filters using shouldIncludeUnit.
*/
export const getBmUnits = (
  records: { bmUnit?: string | null }[],
  filterUnits: boolean = false
): string[] => {
  const unitSet = new Set<string>();

  for (const record of records) {
    const { bmUnit } = record;
    if (bmUnit) {
      if (shouldIncludeUnit(bmUnit) || !filterUnits) {
        unitSet.add(bmUnit);
      }
    }
  }

  const output = Array.from(unitSet);
  log.debug(
    `getBmUnits: ${output.length} units found from ${records.length} records`
  );
  log.debug(`getBmUnits: sort alphabetically`);
  output.sort((a, b) => a.localeCompare(b));
  return output;
};

/*
levelDictToLevelPairs
For use when converting a levelDict to a levelPairs
Returns an array of levelPairs, sorted by time
*/
export const levelDictToLevelPairs = (levelDict: t.LevelDict): t.LevelPair[] =>
  Object.keys(levelDict)
    .map((time) => ({ time, level: levelDict[time] }))
    .sort((a, b) => a.time.localeCompare(b.time));

export type IntervalRecord = {
  timeFrom: string;
  timeTo: string;
  levelFrom: number;
  levelTo: number;
};

/*
intervalRecordToLevelDict
For use when converting an interval record into a levelDict
*/
export const intervalRecordToLevelDict = (r: IntervalRecord[]): t.LevelDict => {
  let levelDict: t.LevelDict = {};
  for (const x of r) {
    levelDict[x.timeFrom] = x.levelFrom;
    levelDict[x.timeTo] = x.levelTo;
  }
  return levelDict;
};

/*
intervalRecordToLevelPairs
Combines intervalRecordToLevelDict and levelDictToLevelPairs
*/
export const intervalRecordToLevelPairs = (
  r: IntervalRecord[]
): t.LevelPair[] => levelDictToLevelPairs(intervalRecordToLevelDict(r));

/*
interpolateLevelPair
this is a core piece of logic for the app.
takes a number of level pairs and a required output interpolation time
separates the level pairs into before and after
identifies the last before i.e the immediately preceding level pair 
identifies the first after i.e. the immediately following level pair
uses time linear interpolation to calculate the level at the required output interpolation time
if the required output interpolation time is exactly the same as one of the level pairs, it returns that level pair
if there is no before or after, it throws an error
*/
export const interpolateLevelPair = (
  time: string,
  levelPairs: t.LevelPair[]
): number => {
  let befores: t.LevelPair[] = [];
  let afters: t.LevelPair[] = [];

  const rounder = (x: number) => Math.round(x * 100) / 100;

  for (const levelPair of levelPairs) {
    const isExactMatch = levelPair.time === time;
    if (isExactMatch) {
      return rounder(levelPair.level);
    } else {
      const isBefore = levelPair.time < time;
      if (isBefore) {
        befores.push(levelPair);
      } else {
        afters.push(levelPair);
      }
    }
  }

  if (befores.length === 0)
    throw new Error(`interpolateLevelPair: no levels found before ${time}`);
  if (afters.length === 0)
    throw new Error(`interpolateLevelPair: no levels found after ${time}`);

  const previous = befores[befores.length - 1];
  const subsequent = afters[0];

  // calculate weights
  const totalSeconds =
    new Date(subsequent.time).getTime() - new Date(previous.time).getTime();
  const secondsBefore =
    new Date(time).getTime() - new Date(previous.time).getTime();
  const secondsAfter =
    new Date(subsequent.time).getTime() - new Date(time).getTime();
  const weightBefore = secondsAfter / totalSeconds;
  const weightAfter = secondsBefore / totalSeconds;

  const interpolatedLevel =
    previous.level * weightBefore + subsequent.level * weightAfter;

  return rounder(interpolatedLevel);
};

type InterpolateBmUnitLevelPairsParams = {
  time: string;
  bmUnitLevelPairs: t.BmUnitLevelPairs;
  omitZero: boolean;
};

/*
interpolateBmUnitLevelPairs
Pass a BmUnitLevelPairs object and a time
Get interpolated values for each bmUnit at that time
*/
export const interpolateBmUnitLevelPairs = ({
  time,
  bmUnitLevelPairs,
  omitZero,
}: InterpolateBmUnitLevelPairsParams): t.BmUnitValues => {
  log.debug(`interpolateBmUnitLevelPairs: interpolating for ${time}`);
  let output: t.BmUnitValues = {};

  for (const bmUnit of Object.keys(bmUnitLevelPairs)) {
    const level = interpolateLevelPair(time, bmUnitLevelPairs[bmUnit]);

    if (!omitZero || Math.round(level) !== 0) {
      output[bmUnit] = level;
    }
  }

  log.debug(
    `interpolateBmUnitLevelPairs: ${
      Object.keys(output).length
    } units found for ${time}`
  );
  return output;
};

/*
sortDescendingBmUnitValues
For use when sorting a BmUnitValues object by level descending
*/
export const sortDescendingBmUnitValues = (
  v: t.BmUnitValues
): t.BmUnitLevelValue[] => {
  let bmUnits: { id: string; level: number }[] = [];
  for (const id of Object.keys(v)) {
    bmUnits.push({ id, level: v[id] });
  }
  return bmUnits.sort((a, b) => b.level - a.level);
};

export const getAcceptancesNoLevels = (
  x: t.ElexonInsightsAcceptancesDataRecord[]
): t.ElexonInsightsAcceptancesParsedNoLevels[] => {
  let output: Record<string, t.ElexonInsightsAcceptancesParsedNoLevels> = {};
  for (const a of x) {
    if (a.bmUnit) {
      output[a.acceptanceNumber] = {
        bmUnit: a.bmUnit,
        acceptanceNumber: a.acceptanceNumber,
        acceptanceTime: a.acceptanceTime,
        deemedBoFlag: a.deemedBoFlag,
        soFlag: a.soFlag,
        storFlag: a.storFlag,
        rrFlag: a.rrFlag,
      };
    }
  }
  return Object.values(output);
};

/*
parseAcceptancesWithLevels
combines getAcceptancesNoLevels with intervalRecordToLevelPairs
*/
export const parseAcceptancesWithLevels = (
  x: t.ElexonInsightsAcceptancesDataRecord[]
): t.ElexonInsightsAcceptancesParsed[] =>
  getAcceptancesNoLevels(x).map((a) => {
    return {
      ...a,
      levels: intervalRecordToLevelPairs(
        x.filter((y) => y.acceptanceNumber === a.acceptanceNumber)
      ),
    };
  });

type CombinePnsAndAccsParams = {
  pns: t.ElexonInsightsPnResponseParsed;
  accs: t.ElexonInsightsAcceptancesResponseParsed;
};

/*
combinePnsAndAccs
For use when combining PNs and ACCs across a number of bmUnits
1. Loops through each bmUnit in the PN (the ultimate source of truth)
2. If there are no ACCs for that bmUnit, it just returns the PN
3. If there are ACCs, it combines the PN and ACCs, running through the acceptances recursively
It returns a BmUnitLevelPairs object, which is a
*/
export const combinePnsAndAccs = ({
  pns,
  accs,
}: CombinePnsAndAccsParams): t.BmUnitLevelPairs => {
  log.debug(`combinePnsAndAccs`);
  let output: t.BmUnitLevelPairs = {};
  for (const bmUnit of Object.keys(pns)) {
    log.debug(`combinePnsAndAccs: combining ${bmUnit}`);
    if (!Object.keys(accs).includes(bmUnit)) {
      // log.debug(`combinePnsAndAccs: no acceptances found for ${bmUnit}`)
      output[bmUnit] = pns[bmUnit];
    } else {
      log.debug(`combinePnsAndAccs: acceptances found for ${bmUnit}`);
      let schedule: t.LevelPair[] = pns[bmUnit];
      for (const acc of accs[bmUnit]) {
        log.debug(
          `combinePnsAndAccs: ${bmUnit} combining acceptance ${acc.acceptanceNumber}`
        );
        schedule = [
          ...schedule.filter((x) => x.time < acc.levels[0].time),
          ...acc.levels,
          ...schedule.filter(
            (x) => x.time > acc.levels[acc.levels.length - 1].time
          ),
        ];
      }
      log.debug(
        `updating schedule for ${bmUnit} from ${pns[bmUnit].length} to ${schedule.length} levels`
      );
      output[bmUnit] = schedule;
    }
  }
  return output;
};

// export type UnitGroup

export const groupByUnitGroup = (x: t.BmUnitValues): t.UnitGroupLevel[] => {
  log.debug(`getUnitGroups`);
  let output: t.UnitGroupLevel[] = [];
  let bmUnits: string[] = [];

  log.debug(`getUnitGroups: domestic units`);
  for (const ug of unitGroups) {
    let units: t.UnitGroupUnitLevel[] = [];
    for (const unit of ug.units) {
      units.push({
        unit,
        level: x[unit.bmUnit] || 0,
      });
      bmUnits.push(unit.bmUnit);
    }
    const level = units.reduce((a, b) => a + b.level, 0);
    if (level < -1 || level > 1) {
      output.push({
        details: ug.details,
        units,
        level,
      });
    }
  }

  log.debug(`getUnitGroups: interconnectors`);
  for (const int of interconnectors) {
    let units: t.UnitGroupUnitLevel[] = [];
    for (const unit of int.units) {
      const level = x[unit.bmUnit] || 0;
      units.push({
        unit,
        level,
      });
      bmUnits.push(unit.bmUnit);
    }
    output.push({
      details: int.details,
      units,
      level: units.reduce((a, b) => a + b.level, 0),
    });
  }
  // debugger

  log.debug(`getUnitGroups: other unknown units`);
  for (const unit of Object.keys(x)) {
    if (!bmUnits.includes(unit)) {
      const isDomestic =
        unit.startsWith("T_") || unit.startsWith("E_") || unit.startsWith("2_");

      if (isDomestic) {
        output.push({
          details: {
            name: unit,
            fuelType: "unknown",
          },
          units: [
            {
              unit: {
                bmUnit: unit,
              },
              level: x[unit],
            },
          ],
          level: x[unit],
        });
      }

      const isInterconnector = unit.startsWith("I_");

      if (isInterconnector) {
        output.push({
          details: {
            name: unit,
            fuelType: "interconnector",
          },
          units: [
            {
              unit: {
                bmUnit: unit,
              },
              level: x[unit],
            },
          ],
          level: x[unit],
        });
      }
    }
  }
  return output;
};

const isEmbeddedUnit = (bmUnit: string) => {
  return bmUnit.startsWith("E_");
};

type GroupByFuelTypeAndInterconnectorsParams = {
  x: t.UnitGroupLevel[];
  includeEmbedded: boolean;
};

/*
Group by fuel type

Group the output of groupByUnitGroup by fuel type
includeEmedded will include embedded wind and solar units
default false as total data on these is sourced separately from NG ESO.
*/
export const groupByFuelTypeAndInterconnectors = ({
  x,
  includeEmbedded,
}: GroupByFuelTypeAndInterconnectorsParams): t.FuelTypeLevel[] => {
  log.debug(`groupByFuelType`);
  let output: t.FuelTypeLevel[] = [];
  let fuelTypesAndInterconnectors: t.FuelType[] = [];
  log.debug(`groupByFuelType: getting fuel types for domestic generators`);
  for (const ug of x) {
    if (
      ug.details.fuelType === "unknown" ||
      ug.details.fuelType === "battery"
    ) {
      continue;
    }
    if (!fuelTypesAndInterconnectors.includes(ug.details.fuelType)) {
      fuelTypesAndInterconnectors.push(ug.details.fuelType);
    }
  }

  for (const ft of fuelTypesAndInterconnectors) {
    let level: number = 0;
    let unitGroupLevels: t.UnitGroupLevel[] = [];
    for (const ug of x) {
      if (ug.details.fuelType === ft) {
        for (const u of ug.units) {
          if (includeEmbedded || !isEmbeddedUnit(u.unit.bmUnit)) {
            level += u.level;
            unitGroupLevels.push(ug);
          }
        }
      }
    }
    output.push({
      name: ft,
      unitGroupLevels,
      level,
    });
  }

  return output.sort(
    (
      a,
      b // sort by level descending
    ) => b.level - a.level
  );
};

/*
joinBmUnitLevelPairs
For use when combining data from adjoinining settlement dates
before should represent a prior settlement date
after should represent a later settlement date
This function will join the two together

*/
export const joinBmUnitLevelPairs = (
  before: t.BmUnitLevelPairs,
  after: t.BmUnitLevelPairs
) => {
  let output: t.BmUnitLevelPairs = {};
  log.debug(
    `joinBmUnitLevelPairs: looking at before ${
      Object.keys(before).length
    } and after ${Object.keys(after).length}`
  );
  for (const bmUnit of Object.keys(before)) {
    output[bmUnit] = before[bmUnit];
  }
  for (const bmUnit of Object.keys(after)) {
    if (output[bmUnit]) {
      output[bmUnit] = [...output[bmUnit], ...after[bmUnit]];
    } else {
      output[bmUnit] = after[bmUnit];
    }
  }
  return output;
};

/*
joinAccs
For use when combining data from adjoinining settlement dates
before should represent a prior settlement date
after should represent a later settlement date
This function will join the two together

*/
export const joinAccs = (
  before: t.ElexonInsightsAcceptancesResponseParsed,
  after: t.ElexonInsightsAcceptancesResponseParsed
) => {
  let output: t.ElexonInsightsAcceptancesResponseParsed = {};
  log.debug(
    `joinAccs: looking at before ${Object.keys(before).length} and after ${
      Object.keys(after).length
    }`
  );
  for (const bmUnit of Object.keys(before)) {
    output[bmUnit] = before[bmUnit];
  }
  for (const bmUnit of Object.keys(after)) {
    if (output[bmUnit]) {
      output[bmUnit] = [...output[bmUnit], ...after[bmUnit]];
    } else {
      output[bmUnit] = after[bmUnit];
    }
  }
  return output;
};

/*
filterBefore
For use when potentially having to remove data that is before the cut off of what should be rendered (e.g. 24 hours ago)
: param l: a BmUnitLevelPairs object
: param cutoff: a Date object
*/
export const filterBefore = (l: t.BmUnitLevelPairs, cutoff: Date) => {
  log.debug(
    `filterBefore: filtering ${
      l.length
    } settlement dates before ${cutoff.toISOString()}`
  );
  let output: t.BmUnitLevelPairs = {};
  for (const bmUnit of Object.keys(l)) {
    output[bmUnit] = l[bmUnit].filter((x) => new Date(x.time) > cutoff);
  }
  return output;
};

/*
averageLevel
For use when calculating the average level of a BmUnitLevelPairs object
Iterate through each level pair, and add the level to a running total
Interpolate to take account of the fact that the level pairs are not necessarily at regular intervals
output the average level in MW
*/
export const averageLevel = (pair: t.LevelPair[]): number => {
  let totalMwh = 0;
  let totalSeconds = 0;
  // iterate through the 2nd to the last level pair
  for (let i = 1; i < pair.length; i++) {
    const timeDiff =
      new Date(pair[i].time).getTime() - new Date(pair[i - 1].time).getTime();
    totalSeconds += timeDiff;
    const averageLevel = (pair[i].level + pair[i - 1].level) / 2;
    const volumeMwh = (averageLevel * timeDiff) / 3600000;
    totalMwh += volumeMwh;
  }
  const averageMw = totalMwh / (totalSeconds / 3600000);
  return Math.round(averageMw * 10) / 10;
};

type TransformUnitGroupsLiveQueryParams = {
  now: Date;
  pns: t.BmUnitLevelPairs;
  accs: t.ElexonInsightsAcceptancesResponseParsed;
};
export const transformUnitGroupsLiveQuery = ({
  pns,
  accs,
  now,
}: TransformUnitGroupsLiveQueryParams): t.UnitGroupLevel[] => {
  log.debug(`remove bmCodes from pn units that are not wanted`);
  let filteredPns: t.BmUnitLevelPairs = {};
  for (const bmUnit of Object.keys(pns)) {
    if (shouldIncludeUnit(bmUnit)) {
      filteredPns[bmUnit] = pns[bmUnit];
    }
  }
  log.debug(`transformUnitGroupsLiveQuery: combining pns and accs`);
  const combined = combinePnsAndAccs({
    pns: filteredPns,
    accs,
  });
  log.debug(`transformUnitGroupsLiveQuery: interpolating bmUnitLevelPairs `);
  const unitGroups = groupByUnitGroup(
    interpolateBmUnitLevelPairs({
      bmUnitLevelPairs: combined,
      time: now.toISOString(),
      omitZero: true,
    })
  );
  return unitGroups.sort((a, b) => b.level - a.level);
};

type UnitGroupLiveQueryData = {
  level: number;
  details: t.UnitGroupUnit;
}[];

type TransformUnitGroupLiveQueryParams = {
  now: Date;
  pns: t.BmUnitLevelPairs;
  accs: t.ElexonInsightsAcceptancesResponseParsed;
  units: t.UnitGroupUnit[];
};
export const transformUnitGroupLiveQuery = ({
  pns,
  accs,
  now,
  units,
}: TransformUnitGroupLiveQueryParams): UnitGroupLiveQueryData => {
  log.debug(`transformUnitGroupLiveQuery: combining pns and accs`);
  const combined = combinePnsAndAccs({
    pns,
    accs,
  });
  log.debug(`transformUnitGroupLiveQuery: interpolating bmUnitLevelPairs `);
  const interp = interpolateBmUnitLevelPairs({
    bmUnitLevelPairs: combined,
    time: now.toISOString(),
    omitZero: true,
  });
  log.debug(`transformUnitGroupLiveQuery: combine with ug.units `);
  const withUnits = units.map((u) => {
    const level = interp[u.bmUnit] || 0;
    return {
      details: u,
      level,
    };
  });
  log.debug(`transformUnitGroupLiveQuery: sorting by level descending `);
  withUnits.sort((a, b) => b.level - a.level);
  return withUnits;
};

type TransformUnitHistoryQueryParams = {
  pns: t.BmUnitLevelPairs;
  accs: t.ElexonInsightsAcceptancesResponseParsed;
  // truncateBefore: Date;
  units: t.UnitGroupUnit[];
};

type TransformUnitHistoryDataOutput = {
  details: t.UnitGroupUnit;
  data: {
    levels: t.LevelPair[];
    average: number;
  };
};

/* group pns and accs by bmUnit */
export const transformUnitHistoryQuery = ({
  pns,
  accs,
  // truncateBefore,
  units,
}: TransformUnitHistoryQueryParams): TransformUnitHistoryDataOutput[] => {
  log.debug(`useUnitGroupHistoryQuery: joining pns and accs`);
  const combined = combinePnsAndAccs({ pns, accs });
  // const filtered = filterBefore(combined, truncateBefore);
  log.debug(`useUnitGroupHistoryQuery: joining with ug.units`);
  const unitData = units.map((u) => {
    const bmUnitData = combined[u.bmUnit];
    if (!bmUnitData) {
      return {
        details: u,
        data: {
          levels: [],
          average: 0,
        },
      };
    } else {
      return {
        details: u,
        data: {
          levels: bmUnitData.sort((a, b) => a.time.localeCompare(b.time)),
          average: averageLevel(bmUnitData),
        },
      };
    }
  });
  unitData.sort((a, b) => b.data.average - a.data.average);
  return unitData;
};

/*
removeRepeatingLevels
For use when removing repeating levels
This reduces visual clutter when rendering schedules in the UI
It will always keep the first and last level pair
*/
export const removeRepeatingLevels = (x: t.LevelPair[]): t.LevelPair[] => {
  let levels: t.LevelPair[] = [];

  for (let i = 0; i < x.length; i++) {
    const isFirst = i === 0;
    const isLast = i === x.length - 1;

    if (isFirst || isLast) {
      levels.push(x[i]);
    } else {
      const isSameAsPrevious = x[i].level === x[i - 1].level;
      if (!isSameAsPrevious) {
        levels.push(x[i]);
      }
    }
  }
  return levels;
};

/*
filterUnitGroupScheduleQuery
filter the levels to only include the record immediately before, plus all subsequent records
always keep the last record, however remove any other repeating values
*/

export const filterUnitGroupScheduleQuery = (
  now: Date,
  x: TransformUnitHistoryDataOutput[]
) => {
  log.debug(
    `filterUnitGroupScheduleQuery: filtering to only include the record immediately before, plus all subsequent records`
  );
  const output: TransformUnitHistoryDataOutput[] = [];
  for (const unit of x) {
    const index = unit.data.levels.findIndex((x) => new Date(x.time) > now);
    if (index === -1 || index === 0) {
      log.info(
        `filterUnitGroupScheduleQuery: no levels found for ${unit.details.bmUnit}`
      );
    } else {
      const priorAndSubsequent = unit.data.levels.slice(index - 1);
      const allZero = priorAndSubsequent.every((x) => x.level === 0);
      if (!allZero) {
        const levels = removeRepeatingLevels(priorAndSubsequent);

        output.push({
          ...unit,
          data: {
            ...unit.data,
            levels,
            average: averageLevel(levels),
          },
        });
      }
    }
  }
  log.debug(`sort by average`);
  output.sort((a, b) => b.data.average - a.data.average);
  return output;
};

type InterpolateCurrentEmbeddedWindAndSolarResult = {
  wind: number;
  solar: number;
};

/*
interpolateCurrentEmbeddedWindAndSolar
For use when interpolating current embedded wind and solar

*/

export const interpolateCurrentEmbeddedWindAndSolar = (
  time: string,
  x: t.NgEsoEmbeddedWindAndSolarForecastParsedResponse
): InterpolateCurrentEmbeddedWindAndSolarResult => {
  log.debug(
    `interpolateWindAndSolar: interpolating for ${time}.. generate level pairs for wind and solar, add 15 minutes to each value to interpolate correctly to mid point of settlment period`
  );

  // const add15Minutes = (time: string) => {
  //   const d = new Date(time);
  //   d.setMinutes(d.getMinutes() + 15);
  //   return d.toISOString();
  // };

  const levelPairs: Record<string, t.LevelPair[]> = {
    wind: x.map((y) => ({ time: y.time, level: y.wind.level })),
    solar: x.map((y) => ({ time: y.time, level: y.solar.level })),
  };

  log.debug(
    `interpolateWindAndSolar: interpolating for ${time}.. interpolate wind and solar`
  );

  const interpolateLevel = (type: string) =>
    interpolateLevelPair(time, levelPairs[type]);

  const wind = interpolateLevel("wind");
  const solar = interpolateLevel("solar");

  return { wind, solar };
};

type CombineFuelTypesAndEmbeddedParams = {
  now: Date;
  includeEmbedded: boolean;
  data: {
    bm: t.UnitGroupLevel[];
    embedded: t.NgEsoEmbeddedWindAndSolarForecastParsedResponse;
  };
};

/*
combineUnitsAndEmbedded
For use when combining units and embedded wind and solar
1. Creates a new category for solar
2. Adds embedded wind to the wind category
*/

export const combineFuelTypesAndEmbedded = ({
  now,
  data,
  includeEmbedded,
}: CombineFuelTypesAndEmbeddedParams) => {
  log.debug(`combineUnitsAndEmbedded: combining fuel types and embedded`);

  const fuelTypes = groupByFuelTypeAndInterconnectors({
    x: data.bm,
    includeEmbedded,
  });

  const embedded = interpolateCurrentEmbeddedWindAndSolar(
    now.toISOString(),
    data.embedded
  );

  const output: t.FuelTypeLevel[] = [];
  const found = {
    wind: false,
    solar: false,
  };
  for (const ft of fuelTypes) {
    if (ft.name === "wind") {
      output.push({
        ...ft,
        level: ft.level + embedded.wind,
      });
      found.wind = true;
    } else {
      if (ft.name === "solar") {
        output.push({
          ...ft,
          level: ft.level + embedded.solar,
        });
        found.solar = true;
      } else {
        output.push(ft);
      }
    }
  }

  if (!found.wind) {
    output.push({
      name: "wind",
      level: embedded.wind,
      unitGroupLevels: [],
    });
  }

  if (!found.solar) {
    output.push({
      name: "solar",
      level: embedded.solar,
      unitGroupLevels: [],
    });
  }

  // resort
  output.sort((a, b) => b.level - a.level);

  return output;
};

export const FUEL_LIVE_FREQUENCY_SECS = 15;

type CreateRegularTimeseriesParams = {
  from: Date;
  to: Date;
  levels: t.LevelPair[];
};

/* create regular timeseries */
export const createRegularTimeseries = ({
  from,
  to,
  levels,
}: CreateRegularTimeseriesParams): t.LevelPair[] => {
  const lastLevel = levels[levels.length - 1];

  const output: t.LevelPair[] = [];
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  let currentTime = fromTime;

  while (currentTime <= toTime) {
    const time = new Date(currentTime).toISOString();

    if (time < lastLevel.time) {
      const level = interpolateLevelPair(time, levels);
      output.push({ time, level });
    } else {
      output.push({ time, level: 0 });
    }

    currentTime += FUEL_LIVE_FREQUENCY_SECS * 1000;
  }

  return output;
};

type JoinRegularTimeseriesParams = {
  from: Date;
  to: Date;
  timeseries: {
    name: string;
    levels: t.LevelPair[];
  }[];
};

type TimeseriesDict = Record<string, Record<string, number>>;
type TimeseriesList = { time: Date }[];
/* join timeseries to create an object suitable for rendering using victory charts*/

export const joinRegularTimeseries = ({
  from,
  to,
  timeseries,
}: JoinRegularTimeseriesParams): TimeseriesList => {
  const outputDict: TimeseriesDict = {};
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  let currentTime = fromTime;
  while (currentTime <= toTime) {
    const time = new Date(currentTime).toISOString();
    outputDict[time] = {};
    for (const series of timeseries) {
      const interp = interpolateLevelPair(time, series.levels);
      if (interp !== 0) {
        outputDict[time][series.name] = interp;
      }
    }
    currentTime += FUEL_LIVE_FREQUENCY_SECS * 1000;
  }
  let outputList: TimeseriesList = [];
  for (const time of Object.keys(outputDict)) {
    outputList.push({ time: new Date(time), ...outputDict[time] });
  }
  return outputList;
};

type UnitGroupUnitsStackedChartDataValues = {
  gas: number;
  coal: number;
  nuclear: number;
  wind: number;
  solar: number;
  hydro: number;
  biomass: number;
  battery: number;
  interconnector: number;
};

type UnitGroupUnitsStackedChartData = UnitGroupUnitsStackedChartDataValues & {
  time: Date;
};

type TransformFuelTypeHistoryQueryParams = {
  range: {
    from: Date;
    to: Date;
  };
  bm: t.BmUnitLevelPairs;
  embedded: t.NgEsoEmbeddedWindAndSolarForecastParsedResponse;
};

export type TransformedFuelTypeHistoryQuery = {
  ranked: RankedFuelType[];
  stacked: UnitGroupUnitsStackedChartData[]
}

/* create a regular minute-by-minute timeseries which aggregates by fuelType*/
export const transformFuelTypeHistoryQuery = ({
  range,
  bm,
  embedded,
}: TransformFuelTypeHistoryQueryParams): TransformedFuelTypeHistoryQuery => {
  let outputList: UnitGroupUnitsStackedChartData[] = [];
  const fromTime = new Date(range.from);
  const toTime = new Date(range.to);
  log.debug(`transformFuelTypeHistoryQuery: ${fromTime} to ${toTime}`);

  let currentTime = fromTime.getTime();
  while (currentTime <= toTime.getTime()) {
    const time = new Date(currentTime).toISOString();
    let hasBm = false;

    let timeDict: Record<string, number> = {
      ...interpolateCurrentEmbeddedWindAndSolar(time, embedded),
      gas: 0,
      coal: 0,
      nuclear: 0,
      hydro: 0,
      biomass: 0,
      battery: 0,
      interconnector: 0
    } as UnitGroupUnitsStackedChartDataValues
    for (const fuelType in timeDict) {
      const units = fuelTypeUnitsDict[fuelType];
      for (const unit of units) {
        if (!isEmbeddedUnit(unit)) {
          const pairs = bm[unit];
          if (pairs) {
            try {
              const level = interpolateLevelPair(time, pairs);
              if (level !== 0) {
                hasBm = true;
                timeDict[fuelType] += level;
              }
            } catch (e) {}
          }
        }
      }
    }
    if (hasBm) {
      outputList.push({ time: new Date(time), ...timeDict as any});
    }
    currentTime += FUEL_LIVE_FREQUENCY_SECS * 1000;
  }

  const ranked = rankByAverage(outputList);

  const stacked = stackTimeDict(outputList, ranked);

  return {ranked, stacked}

};

type RankedFuelType = {fuelType: t.FuelType, rank: number, average: number}

/* get the average for each attribute. return rankings for each where 0 is the highest and 9 is the lowest */
const rankByAverage = (x: UnitGroupUnitsStackedChartDataValues[]): RankedFuelType[] => {
  const averages: Record<string, number> = {
    gas: 0,
    coal: 0,
    nuclear: 0,
    wind: 0,
    solar: 0,
    hydro: 0,
    biomass: 0,
    battery: 0,
    interconnector: 0,
    oil: 0,
    unknown: 0
  };
  for (const y of x) {
    for (const fuelType of t.FUEL_TYPE_NAMES) {
      const level = (y as any)[fuelType];
      if(level && level > 0) {
        averages[fuelType] += level
      }
    }
  }
  for (const fuelType in averages) {
    averages[fuelType] = averages[fuelType] / x.length;
  }
  const sorted = Object.keys(averages).sort((a, b) => averages[a] - averages[b]);
  const output: RankedFuelType[] = []
  for (let i = 0; i < sorted.length; i++) {
    output.push({ fuelType: sorted[i] as t.FuelType, rank: i, average: averages[sorted[i]] })
  }
  return output
}

/* stack the values according to the average rankings. the lowest rank appears at the bottom the highest rank is at the top*/
const stackTimeDict = (x: UnitGroupUnitsStackedChartData[], ranked: RankedFuelType[]) => {
  // co
  let output: UnitGroupUnitsStackedChartData[] = []
  for (const y of x) {
    let total = 0
    let row: any = {}
    for( const fT of ranked) {
      const {fuelType} = fT
      const level = (y as any)[fuelType]
      if(level && level > 0) {total += level}
      row[fuelType] = total
    }
    output.push({
      ...row,
      time: y.time,
    })
  }
  return output
}


// const stackTimeDict = (x: UnitGroupUnitsStackedChartDataValues) => {
//   // x.wind = 0
//   let output: UnitGroupUnitsStackedChartDataValues = {
//     nuclear: x.nuclear,
//     wind: x.wind + x.nuclear,
//     solar: x.solar + x.wind + x.nuclear,
//     hydro: x.hydro + x.solar + x.wind + x.nuclear,
//     biomass: x.biomass + x.hydro + x.solar + x.wind + x.nuclear,
//     gas: x.gas + x.biomass + x.hydro + x.solar + x.wind + x.nuclear,
//     coal: x.coal + x.gas + x.biomass + x.hydro + x.solar + x.wind + x.nuclear,
//     battery: x.battery + x.coal + x.gas + x.biomass + x.hydro + x.solar + x.wind + x.nuclear,
//     interconnector: x.interconnector + x.battery + x.coal + x.gas + x.biomass + x.hydro + x.solar + x.wind + x.nuclear
//   }
//   return output
// }