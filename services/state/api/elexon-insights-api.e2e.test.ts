import "@testing-library/jest-dom";
import { store } from "../root";
import { elexonInsightsApi } from "./elexon-insights-api";
import {
  BmUnitLevelPairs,
  ElexonInsightsAcceptancesParsed,
} from "../../../common/types";

// list of common bm units to expect in any response
const bmUnitsToExpect = ["T_CARR-1", "T_DRAXX-1"];

const params = {
  sp: {
    settlementDate: "2023-12-01",
    settlementPeriod: 40,
  },
  range: {
    from: "2023-12-03",
    to: "2023-12-05",
    bmUnits: bmUnitsToExpect,
  },
};

const sp = {
  start: new Date(Date.parse("2023-12-01T19:30:00Z")),
  end: new Date(Date.parse("2023-12-01T20:00:00Z")),
};

const checkTimeInterval = (time: string) => {
  // check that when converted to a date, it is between 2023-12-01T19:30:00Z and 2023-12-01T20:00:00Z

  const date = new Date(time);
  expect(Number(date)).toBeGreaterThanOrEqual(Number(sp.start));
  expect(Number(date)).toBeLessThanOrEqual(Number(sp.end));
};

const checkObjectKeysContainsAllBmUnits = (obj: BmUnitLevelPairs) => {
  const keys = Object.keys(obj);
  bmUnitsToExpect.forEach((bmUnit) => {
    expect(keys).toContain(bmUnit);
  });
};

const checkLevelPairsAreInValidRange = (obj: BmUnitLevelPairs) => {
  let count = 0;
  for (const levelPairs of Object.values(obj)) {
    expect(levelPairs.length).toBeGreaterThan(0);
    for (const levelPair of levelPairs) {
      checkTimeInterval(levelPair.time);
      count++;
    }
  }
  console.log(`validated ${count} level pair values`);
};

describe("services/state/elexon-insights-api/endpoints/pnSp", () => {
  test("pnSp", async () => {
    const result = await store.dispatch(
      elexonInsightsApi.endpoints.pnSp.initiate(params.sp)
    );
    if (!result.data) throw new Error("no data");
    expect(result.data).toMatchSnapshot();
    checkObjectKeysContainsAllBmUnits(result.data);
    checkLevelPairsAreInValidRange(result.data);
  });
});

/*
checkAcceptances
check that acceptances are relevant to the query made
*/
const checkAcceptances = (accs: ElexonInsightsAcceptancesParsed[]) => {
  // check that acceptanceTime is increasing
  let lastTime = "";
  for (const acc of accs) {
    if (lastTime !== "")
      expect(acc.acceptanceTime.localeCompare(lastTime)).toBeGreaterThan(0);
    lastTime = acc.acceptanceTime;

    // check that acceptance spans some of the period between sp.start and sp.end
    const start = acc.levels[0].time;
    const end = acc.levels[acc.levels.length - 1].time;
    const startNum = Number(new Date(start));
    const endNum = Number(new Date(end));
    const spStartNum = Number(sp.start);
    const spEndNum = Number(sp.end);
    expect(startNum).toBeLessThanOrEqual(spEndNum);
    expect(endNum).toBeGreaterThanOrEqual(spStartNum);
  }
};

describe("services/state/elexon-insights-api/endpoints/accSp", () => {
  test("accSp", async () => {
    const result = await store.dispatch(
      elexonInsightsApi.endpoints.accSp.initiate(params.sp)
    );
    if (!result.data) throw new Error("no data");
    expect(result.data).toMatchSnapshot();
    const bmUnitCount = Object.keys(result.data).length;
    // there were 14 active bm units in the settlement period
    expect(bmUnitCount).toBe(14);
    for (const bmUnit of Object.keys(result.data)) {
      const accs = result.data[bmUnit];
      checkAcceptances(accs);
    }
  });
});

describe("services/state/elexon-insights-api/endpoints/pnRange", () => {
  test("pnRange", async () => {
    const result = await store.dispatch(
      elexonInsightsApi.endpoints.pnRange.initiate(params.range)
    );
    if (!result.data) throw new Error("no data");
    checkObjectKeysContainsAllBmUnits(result.data);
    expect(result.data).toMatchSnapshot();
  });
});


describe("services/state/elexon-insights-api/endpoints/accRange", () => {
    test("accRange", async () => {
      const result = await store.dispatch(
        elexonInsightsApi.endpoints.accRange.initiate(params.range)
      );
      if (!result.data) throw new Error("no data");
      expect(result.data).toMatchSnapshot();
    });
  });
  