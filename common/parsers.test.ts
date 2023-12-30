import * as p from "./parsers";
import {
  BmUnitLevelPairs,
  BmUnitLevelValue,
  ElexonInsightsAcceptancesDataRecord,
  ElexonInsightsAcceptancesParsed,
  ElexonInsightsAcceptancesParsedNoLevels,
  FuelTypeLevel,
  LevelPairDelta,
} from "./types";

describe("parsers/shouldIncludeUnit", () => {
  test("should include T_ prefix", () => {
    expect(p.shouldIncludeUnit("T_")).toBe(true);
  });
  test("should ignore an A_ prefix", () => {
    expect(p.shouldIncludeUnit("A_")).toBe(false);
  });
});

describe("parsers/getBmUnits", () => {
  test("should return a unique list of BM units", () => {
    const input = [
      {
        bmUnit: "T_1",
      },
      {
        bmUnit: "T_2",
      },
      {
        bmUnit: "T_1",
      },
    ];
    const output = ["T_1", "T_2"];
    expect(p.getBmUnits(input)).toEqual(output);
  });

  test("it should exclude A_ units if filterUnits is true", () => {
    const input = [
      {
        bmUnit: "T_1",
      },
      {
        bmUnit: "A_1",
      },
      {
        bmUnit: "T_1",
      },
    ];
    const output = ["T_1"];
    expect(p.getBmUnits(input, true)).toEqual(output);
  });

  test("it should include A_ units if filterUnits is false", () => {
    const input = [
      {
        bmUnit: "T_1",
      },
      {
        bmUnit: "A_1",
      },
      {
        bmUnit: "T_1",
      },
    ];
    const output = ["A_1", "T_1"];
    expect(p.getBmUnits(input, false)).toEqual(output);
  });
});

describe("parsers/levelDictToLevelPairs", () => {
  test("should turn a dict with key: time, value: number into a basic array", () => {
    const input = {
      "2021-01-01T00:00": 1,
      "2021-01-01T00:30": 2,
    };
    const output = [
      {
        time: "2021-01-01T00:00",
        level: 1,
      },
      {
        time: "2021-01-01T00:30",
        level: 2,
      },
    ];
    expect(p.levelDictToLevelPairs(input)).toEqual(output);
  });

  test("if input is not in date order should sort by time", () => {
    const input = {
      "2021-01-01T00:30": 2,
      "2021-01-01T00:00": 1,
    };
    const output = [
      {
        time: "2021-01-01T00:00",
        level: 1,
      },
      {
        time: "2021-01-01T00:30",
        level: 2,
      },
    ];
    expect(p.levelDictToLevelPairs(input)).toEqual(output);
  });
});

describe("parsers/intervalRecordToLevelDict", () => {
  test("should unwind the interval record into a dict with key: time, value: number", () => {
    const input: p.IntervalRecord[] = [
      {
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:30",
        levelFrom: 1,
        levelTo: 2,
      },
      {
        timeFrom: "2021-01-01T00:45",
        timeTo: "2021-01-01T01:00",
        levelFrom: 3,
        levelTo: 4,
      },
    ];
    const output = {
      "2021-01-01T00:00": 1,
      "2021-01-01T00:30": 2,
      "2021-01-01T00:45": 3,
      "2021-01-01T01:00": 4,
    };
    expect(p.intervalRecordToLevelDict(input)).toEqual(output);
  });

  test("in event of duplicates should take the last stated value", () => {
    const input: p.IntervalRecord[] = [
      {
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:30",
        levelFrom: 1,
        levelTo: 2,
      },
      {
        timeFrom: "2021-01-01T00:30",
        timeTo: "2021-01-01T01:00",
        levelFrom: 3,
        levelTo: 4,
      },
    ];
    const output = {
      "2021-01-01T00:00": 1,
      "2021-01-01T00:30": 3,
      "2021-01-01T01:00": 4,
    };
    expect(p.intervalRecordToLevelDict(input)).toEqual(output);
  });
});

describe("parsers/interpolateLevelPair", () => {
  test("for an exact response should return the exact level", () => {
    const input = { time: "2021-01-01T00:00", level: 1 };
    const output = 1;
    expect(p.interpolateLevelPair(input.time, [input])).toBe(output);
  });

  test("should perform simple linear interpolation", () => {
    const inputs = [
      { time: "2021-01-01T00:00", level: 1 },
      { time: "2021-01-01T00:30", level: 5 },
    ];
    const halfWay = "2021-01-01T00:15";
    const output = 3;
    expect(p.interpolateLevelPair(halfWay, inputs)).toBe(output);
  });

  test("should throw an error if the requested point is outside of the range", () => {
    const inputs = [
      { time: "2021-01-01T00:00", level: 1 },
      { time: "2021-01-01T00:30", level: 5 },
    ];
    const halfWay = "2021-01-01T01:15";
    try {
      p.interpolateLevelPair(halfWay, inputs);
      throw new Error("Should not get here");
    } catch (e: any) {
      expect(e.message).toBe(
        "interpolateLevelPair: no levels found after 2021-01-01T01:15"
      );
    }
  });
});

describe("parsers/interpolateBmUnitLevelPairs", () => {
  test("can perform simple interpolation for a single unit", () => {
    const bmUnitLevelPairs: BmUnitLevelPairs = {
      "T_DRAXX-1": [
        { time: "2021-01-01T00:00", level: 1 },
        { time: "2021-01-01T00:30", level: 5 },
      ],
    };

    const time = "2021-01-01T00:15";
    const omitZero = true;
    expect(
      p.interpolateBmUnitLevelPairs({
        time,
        bmUnitLevelPairs,
        omitZero,
      })
    ).toEqual({
      "T_DRAXX-1": 3,
    });
  });

  test("can perform simple interpolation for two simple units", () => {
    const bmUnitLevelPairs: BmUnitLevelPairs = {
      "T_DRAXX-1": [
        { time: "2021-01-01T00:00", level: 1 },
        { time: "2021-01-01T00:30", level: 5 },
      ],
      "T_DRAXX-2": [
        { time: "2021-01-01T00:00", level: 5 },
        { time: "2021-01-01T00:30", level: 9 },
      ],
    };

    const time = "2021-01-01T00:15";
    const omitZero = true;
    expect(
      p.interpolateBmUnitLevelPairs({
        time,
        bmUnitLevelPairs,
        omitZero,
      })
    ).toEqual({
      "T_DRAXX-1": 3,
      "T_DRAXX-2": 7,
    });
  });

  test("will omit a unit if the output rounds to 0", () => {
    const bmUnitLevelPairs: BmUnitLevelPairs = {
      "T_DRAXX-1": [
        { time: "2021-01-01T00:00", level: 1 },
        { time: "2021-01-01T00:30", level: 5 },
      ],
      "T_DRAXX-2": [
        { time: "2021-01-01T00:00", level: 5 },
        { time: "2021-01-01T00:30", level: 9 },
      ],
      // new smaller unit to ignore
      "T_DRAXX-23": [
        { time: "2021-01-01T00:00", level: 0.1 },
        { time: "2021-01-01T00:30", level: 0.3 },
      ],
    };

    const time = "2021-01-01T00:15";
    const omitZero = true;
    expect(
      p.interpolateBmUnitLevelPairs({
        time,
        bmUnitLevelPairs,
        omitZero,
      })
    ).toEqual({
      "T_DRAXX-1": 3,
      "T_DRAXX-2": 7,
    });
  });
});

describe("parsers/sortDescendingBmUnitValues", () => {
  test("can sort a simple object", () => {
    const input = {
      "T_DRAXX-1": 3,
      "T_DRAXX-2": 5,
    };
    const output: BmUnitLevelValue[] = [
      {
        id: "T_DRAXX-2",
        level: 5,
      },
      {
        id: "T_DRAXX-1",
        level: 3,
      },
    ];
    expect(p.sortDescendingBmUnitValues(input)).toEqual(output);
  });

  test("gives an acceptable answer when duplicate values exist", () => {
    const input = {
      "T_DRAXX-1": 3,
      "T_DRAXX-2": 5,
      "T_DRAXX-3": 5,
    };
    const output: BmUnitLevelValue[] = [
      {
        id: "T_DRAXX-2",
        level: 5,
      },
      {
        id: "T_DRAXX-3",
        level: 5,
      },
      {
        id: "T_DRAXX-1",
        level: 3,
      },
    ];
    expect(p.sortDescendingBmUnitValues(input)).toEqual(output);
  });
});

//getAcceptancesNoLevels

describe("parsers/getAcceptancesNoLevels", () => {
  test("can combine an acceptance of two parts into a sincle record", () => {
    const input: ElexonInsightsAcceptancesDataRecord[] = [
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelFrom: 1,
        levelTo: 2,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 3,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    const output: ElexonInsightsAcceptancesParsedNoLevels[] = [
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    expect(p.getAcceptancesNoLevels(input)).toMatchObject(output);
  });

  test("can combine two acceptances for different units", () => {
    const input: ElexonInsightsAcceptancesDataRecord[] = [
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelFrom: 1,
        levelTo: 2,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 3,
        nationalGridBmUnit: "T_DRAXX-2",
        bmUnit: "T_DRAXX-2",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    const output: ElexonInsightsAcceptancesParsedNoLevels[] = [
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        bmUnit: "T_DRAXX-2",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    expect(p.getAcceptancesNoLevels(input)).toMatchObject(output);
  });

  test("can distinguish two overlapping acceptances for the same unit - where the first one is in two parts", () => {
    const input: ElexonInsightsAcceptancesDataRecord[] = [
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelFrom: 1,
        levelTo: 2,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 1,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 3,
        nationalGridBmUnit: "T_DRAXX-2",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:10",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    const output: ElexonInsightsAcceptancesParsedNoLevels[] = [
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:10",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    expect(p.getAcceptancesNoLevels(input)).toMatchObject(output);
  });
});

describe("parsers/intervalRecordToLevelPairs", () => {
  test("can scour a list of separate interval records (e.g. from an acceptance) and combine in order from levelTo and levelFrom", () => {
    const input = [
      {
        levelFrom: 3,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelTo: 5,
      },
      {
        timeFrom: "2021-01-01T00:15",
        levelFrom: 5,
        timeTo: "2021-01-01T00:30",
        levelTo: 4,
      },
    ];
    const output = [
      {
        time: "2021-01-01T00:00",
        level: 3,
      },
      {
        time: "2021-01-01T00:15",
        level: 5,
      },
      {
        time: "2021-01-01T00:30",
        level: 4,
      },
    ];
    expect(p.intervalRecordToLevelPairs(input)).toMatchObject(output);
  });
});

describe("parsers/parseAcceptancesWithLevels", () => {
  test("can take a list of raw acceptance intervals from elexon and combine by acceptance with sorted levels", () => {
    // deliberately in wrong order
    const input: ElexonInsightsAcceptancesDataRecord[] = [
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 2,
        settlementPeriodTo: 3,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 3,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelFrom: 1,
        levelTo: 2,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    const output: ElexonInsightsAcceptancesParsed[] = [
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        levels: [
          {
            level: 1,
            time: "2021-01-01T00:00",
          },
          {
            level: 2,
            time: "2021-01-01T00:15",
          },
          {
            level: 3,
            time: "2021-01-01T00:30",
          },
        ],
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    expect(p.parseAcceptancesWithLevels(input)).toMatchObject(output);
  });

  test("can deal with two acceptances", () => {
    // deliberately in wrong order
    const input: ElexonInsightsAcceptancesDataRecord[] = [
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 2,
        settlementPeriodTo: 3,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 3,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelFrom: 1,
        levelTo: 2,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },

      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 2,
        settlementPeriodTo: 3,
        timeFrom: "2021-01-01T00:15",
        timeTo: "2021-01-01T00:30",
        levelFrom: 2,
        levelTo: 3,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        settlementDate: "2021-01-01",
        settlementPeriodFrom: 1,
        settlementPeriodTo: 2,
        timeFrom: "2021-01-01T00:00",
        timeTo: "2021-01-01T00:15",
        levelFrom: 1,
        levelTo: 2,
        nationalGridBmUnit: "T_DRAXX-1",
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:00",
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    const output: ElexonInsightsAcceptancesParsed[] = [
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 1,
        acceptanceTime: "2021-01-01T00:00",
        levels: [
          {
            level: 1,
            time: "2021-01-01T00:00",
          },
          {
            level: 2,
            time: "2021-01-01T00:15",
          },
          {
            level: 3,
            time: "2021-01-01T00:30",
          },
        ],
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
      {
        bmUnit: "T_DRAXX-1",
        acceptanceNumber: 2,
        acceptanceTime: "2021-01-01T00:00",
        levels: [
          {
            level: 1,
            time: "2021-01-01T00:00",
          },
          {
            level: 2,
            time: "2021-01-01T00:15",
          },
          {
            level: 3,
            time: "2021-01-01T00:30",
          },
        ],
        deemedBoFlag: false,
        soFlag: false,
        storFlag: false,
        rrFlag: false,
      },
    ];
    expect(p.parseAcceptancesWithLevels(input)).toMatchObject(output);
  });
});

describe("parsers/removeRepeatingLevels", () => {
  test("can remove repeating levels", () => {
    const input: LevelPairDelta[] = [
      {
        time: "2021-01-01T00:00",
        level: 1,
      },
      {
        time: "2021-01-01T00:15",
        level: 1,
      },
      {
        time: "2021-01-01T00:30",
        level: 2,
      },
      {
        time: "2021-01-01T00:45",
        level: 2,
      },
      {
        time: "2021-01-01T01:00",
        level: 5,
      },
    ];
    const output: LevelPairDelta[] = [
      {
        time: "2021-01-01T00:00",
        level: 1,
      },
      {
        time: "2021-01-01T00:30",
        level: 2,
      },
      {
        time: "2021-01-01T01:00",
        level: 5,
      },
    ];

    expect(p.removeRepeatingLevels(input)).toEqual(output);
  });

  test("will keep the last pair even if it has the same value as previous ones", () => {
    const input: LevelPairDelta[] = [
      {
        time: "2021-01-01T00:00",
        level: 1,
      },
      {
        time: "2021-01-01T00:15",
        level: 1,
      },
      {
        time: "2021-01-01T00:30",
        level: 2,
      },
      {
        time: "2021-01-01T00:45",
        level: 2,
      },
      {
        time: "2021-01-01T01:00",
        level: 2,
      },
    ];
    const output: LevelPairDelta[] = [
      {
        time: "2021-01-01T00:00",
        level: 1,
      },
      {
        time: "2021-01-01T00:30",
        level: 2,
      },
      {
        time: "2021-01-01T01:00",
        level: 2,
      },
    ];

    expect(p.removeRepeatingLevels(input)).toEqual(output);
  });
});

describe("parsers/interpolateCurrentEmbeddedWindAndSolar", () => {
  test("can interpolate basic solar and wind values", () => {
    const input = [
      {
        time: "2023-12-21T07:30:00.000Z",
        wind: { level: 5358, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:00:00.000Z",
        wind: { level: 5361, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:30:00.000Z",
        wind: { level: 5382, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T09:00:00.000Z",
        wind: { level: 5402, capacity: 6488 },
        solar: { level: 63, capacity: 15905 },
      },
      {
        time: "2023-12-21T09:30:00.000Z",
        wind: { level: 5434, capacity: 6488 },
        solar: { level: 256, capacity: 15905 },
      },
    ];
    const time = "2023-12-21T09:15:00.000Z";
    const output = {
      wind: 5418,
      solar: 159.5,
    };
    expect(p.interpolateCurrentEmbeddedWindAndSolar(time, input)).toMatchObject(
      output
    );
  });

  test("throws an error if a time is requested outside of the provided range", () => {
    const input = [
      {
        time: "2023-12-21T07:30:00.000Z",
        wind: { level: 5358, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:00:00.000Z",
        wind: { level: 5361, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:30:00.000Z",
        wind: { level: 5382, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T09:00:00.000Z",
        wind: { level: 5402, capacity: 6488 },
        solar: { level: 63, capacity: 15905 },
      },
      {
        time: "2023-12-21T09:30:00.000Z",
        wind: { level: 5434, capacity: 6488 },
        solar: { level: 256, capacity: 15905 },
      },
    ];
    const time = "2023-12-21T07:15:00.000Z";
    try {
      p.interpolateCurrentEmbeddedWindAndSolar(time, input);
      throw new Error("should not get here");
    } catch (e: any) {
      expect(e.message).toBe(
        "interpolateLevelPair: no levels found before 2023-12-21T07:15:00.000Z"
      );
    }
  });

  test('interpolation outputs move in expected direction', () => {

    const times = [
      "2023-12-21T07:30:00.000Z",
      "2023-12-21T07:31:00.000Z",
      "2023-12-21T07:45:00.000Z",
      "2023-12-21T08:00:00.000Z",
    ]

    const input = [
      {
        time: "2023-12-21T07:30:00.000Z",
        wind: { level: 5358, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:00:00.000Z",
        wind: { level: 5361, capacity: 6488 },
        solar: { level: 30, capacity: 15905 },
      }
    ]
    const output = times.map((time) => p.interpolateCurrentEmbeddedWindAndSolar(time, input))
    const solarLevels = output.map((x) => x.solar)
    expect(solarLevels).toMatchObject([0, 1, 15, 30])
  })
});


// describe('combineFuelTypesAndEmbedded', () => {

//   test('can add solar to the existing list of fuel types', () => {
//     const inputs = {
//       fuelTypes: [],
//       embedded: {
//         wind: 100,
//         solar: 50,
//       }
//     }
//     const output = p.combineFuelTypesAndEmbedded(inputs.fuelTypes, inputs.embedded)
//     const solar = output.find((x) => x.name === 'solar')
//     if(!solar) throw new Error('solar not found')
//     expect(solar.level).toBe(50)
//   })

//   test('can add embedded wind to the existing wind value', () => {
//     const inputs = {
//       fuelTypes: [
//         {
//           name: 'wind',
//           level: 50,
//           unitGroupLevels: []
//         }
//       ] as FuelTypeLevel[],
//       embedded: {
//         wind: 100,
//         solar: 0,
//       }
//     }
//     const output = p.combineFuelTypesAndEmbedded(inputs.fuelTypes, inputs.embedded)
//     const wind = output.find((x) => x.name === 'wind')
//     if(!wind) throw new Error('wind not found')
//     expect(wind.level).toBe(150)
//   })

//   test('can deal with no transmission wind in existing list', () => {
//     const inputs = {
//       fuelTypes: [] as FuelTypeLevel[],
//       embedded: {
//         wind: 100,
//         solar: 0,
//       }
//     }
//     const output = p.combineFuelTypesAndEmbedded(inputs.fuelTypes, inputs.embedded)
//     const wind = output.find((x) => x.name === 'wind')
//     if(!wind) throw new Error('wind not found')
//     expect(wind.level).toBe(100)
//   })

//   test('can deal with a solar unit in the transmission list', () => {
//     const inputs = {
//       fuelTypes: [
//         {
//           name: 'solar',
//           level: 75,
//           unitGroupLevels: []
//         }
//       ] as FuelTypeLevel[],
//       embedded: {
//         wind: 100,
//         solar: 100,
//       }
//     }
//     const output = p.combineFuelTypesAndEmbedded(inputs.fuelTypes, inputs.embedded)
//     const solar = output.find((x) => x.name === 'solar')
//     if(!solar) throw new Error('solar not found')
//     expect(solar.level).toBe(175)
//   })
// })