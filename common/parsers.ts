import * as t from "./types";
import log from "../services/log";
import { unitGroups } from "../assets/data/units";
import { interconnectors } from "../assets/data/interconnectors";

/*
get bm units runs through a list of records. 

if filterUnits is true, it only returns units that start with T_ or E_. This removes demand units and other units that are not generators or sources of power
*/
export const getBmUnits = (
  records: { bmUnit: string }[],
  filterUnits: boolean = false
): string[] => {
  let set = new Set<string>();
  for (const r of records) {
    if (filterUnits) {
      if (r.bmUnit) {
        const { bmUnit } = r;
        console.log(bmUnit);
        // this preserves transmission units, embedded units and interconnectors
        if (
          (bmUnit && bmUnit.startsWith("T_")) ||
          bmUnit.startsWith(
            "E_" || bmUnit.startsWith("I_") || bmUnit.startsWith("2_")
          )
        ) {
          set.add(r.bmUnit);
        }
      }
    } else {
      set.add(r.bmUnit);
    }
  }
  const output = Array.from(set);
  log.debug(
    `getBmUnits: ${output.length} units found from ${records.length} records`
  );
  return output;
};

export const levelDictToLevelPairs = (
  levelDict: t.LevelDict
): t.LevelPair[] => {
  let output: t.LevelPair[] = [];
  for (const time of Object.keys(levelDict)) {
    output.push({ time, level: levelDict[time] });
  }
  return output.sort((a, b) => a.time.localeCompare(b.time));
};

type IntervalRecord = {
  timeFrom: string;
  timeTo: string;
  levelFrom: number;
  levelTo: number;
};

export const intervalRecordToLevelDict = (r: IntervalRecord[]): t.LevelDict => {
  let levelDict: t.LevelDict = {};
  for (const x of r) {
    levelDict[x.timeFrom] = x.levelFrom;
    levelDict[x.timeTo] = x.levelTo;
  }
  return levelDict;
};

export const intervalRecordToLevelPairs = (
  r: IntervalRecord[]
): t.LevelPair[] => {
  const levelDict = intervalRecordToLevelDict(r);
  return levelDictToLevelPairs(levelDict);
};

export const interpolateLevelPair = (
  time: string,
  levelPairs: t.LevelPair[]
): number => {
  const exact = levelPairs.find((x) => x.time === time);
  if (exact) {
    log.debug(`interpolateLevelPair: exact match found for ${time}`);
  }
  const befores = levelPairs.filter((x) => x.time < time);
  const afters = levelPairs.filter((x) => x.time > time);
  if (befores.length === 0 || afters.length === 0) {
    log.debug(`interpolateLevelPair: no before or after found for ${time}`);
  }
  // interpolate on a linear basis
  const before = befores[befores.length - 1];
  const after = afters[0];
  const times = {
    before: new Date(before.time).getTime(),
    after: new Date(after.time).getTime(),
    output: new Date(time).getTime(),
  };
  const timeDiffs = {
    before: times.output - times.before,
    total: times.after - times.before,
    after: times.after - times.output,
  };
  const weights = {
    before: timeDiffs.before / timeDiffs.total,
    after: timeDiffs.after / timeDiffs.total,
  };
  const interp = before.level * weights.before + after.level * weights.after;
  return Math.round(interp * 10) / 10;
};

type InterpolateBmUnitLevelPairsParams = {
  time: string;
  bmUnitLevelPairs: t.BmUnitLevelPairs;
  omitZero: boolean;
};

export const interpolateBmUnitLevelPairs = ({
  time,
  bmUnitLevelPairs,
  omitZero,
}: InterpolateBmUnitLevelPairsParams): t.BmUnitValues => {
  log.debug(`interpolateBmUnitLevelPairs: interpolating for ${time}`);
  let output: t.BmUnitValues = {};
  for (const bmUnit of Object.keys(bmUnitLevelPairs)) {
    const level = interpolateLevelPair(time, bmUnitLevelPairs[bmUnit]);
    if (level !== 0 || !omitZero) {
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

export const sortDescendingBmUnitValues = (v: t.BmUnitValues) => {
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
  return Object.values(output);
};

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
    output.push({
      details: ug.details,
      units,
      level: units.reduce((a, b) => a + b.level, 0),
    });
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

  log.debug(`getUnitGroups: other unknown units`);
  for (const unit of Object.keys(x)) {
    if (!bmUnits.includes(unit)) {
      const isDomestic = unit.startsWith("T_") || unit.startsWith("E_");

      if (isDomestic) {
        output.push({
          details: {
            name: unit,
            coords: {
              lat: 0,
              lng: 0,
            },
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
            coords: {
              lat: 0,
              lng: 0,
            },
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

/*
Group by fuel type

Group the output of groupByUnitGroup by fuel type
*/
export const groupByFuelTypeAndInterconnectors = (
  x: t.UnitGroupLevel[]
): t.FuelTypeLevel[] => {
  log.debug(`groupByFuelType`);
  let output: t.FuelTypeLevel[] = [];
  let fuelTypesAndInterconnectors: t.FuelType[] = [];
  log.debug(`groupByFuelType: getting fuel types for domestic generators`);
  for (const ug of x) {
    if (!fuelTypesAndInterconnectors.includes(ug.details.fuelType)) {
      fuelTypesAndInterconnectors.push(ug.details.fuelType);
    }
  }

  for (const ft of fuelTypesAndInterconnectors) {
    output.push({
      name: ft,
      unitGroupLevels: x.filter((y) => y.details.fuelType === ft),
      level: x
        .filter((y) => y.details.fuelType === ft)
        .reduce((a, b) => a + b.level, 0),
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
    output[bmUnit] = l[bmUnit].filter((x) => new Date(x.time) < cutoff);
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
  log.debug(`transformUnitGroupsLiveQuery: combining pns and accs`);
  const combined = combinePnsAndAccs({
    pns,
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
  pns: t.BmUnitLevelPairs
  accs: t.ElexonInsightsAcceptancesResponseParsed
  truncateBefore: Date
  units: t.UnitGroupUnit[]
};

export const transformUnitHistoryQuery = ({
  pns, 
  accs,
  truncateBefore,
  units
}: TransformUnitHistoryQueryParams) => {

  log.debug(`useUnitGroupHistoryQuery: joining pns and accs`);
  const combined = combinePnsAndAccs({pns, accs});

  console.log(combined)

  log.debug(
    `useUnitGroupHistoryQuery: removing any values before ${truncateBefore}`
  );
  const filtered = filterBefore(combined, truncateBefore);

  log.debug(`useUnitGroupHistoryQuery: joining with ug.units`);
  const unitData = units.map((u) => {
    const bmUnitData = filtered[u.bmUnit];
    return {
      details: u,
      data: {
        levels: bmUnitData,
        average: averageLevel(bmUnitData),
      },
    };
  });

  log.debug(`useUnitGroupHistoryQuery: sort by average level `);
  unitData.sort((a, b) => {
    if (a.data.average && b.data.average) {
      return b.data.average - a.data.average;
    } else if (a.data.average) {
      return -1;
    } else if (b.data.average) {
      return 1;
    } else {
      return 0;
    }
  });

  return unitData
};
