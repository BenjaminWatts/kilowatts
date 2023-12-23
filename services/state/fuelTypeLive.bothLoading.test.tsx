import { useFuelTypeLiveQuery } from "./fuelTypeLive";


jest.mock("./api/ng-eso-api", () => ({
  useEmbeddedWindAndSolarForecastQuery: () => ({
    data: null,
    isLoading: true,
    refetch: () => {},
  }),
}));

jest.mock("./api/elexon-insights-api.hooks", () => ({
  useUnitGroupsLiveQuery: () => ({
    data: null,
    isLoading: true,
    refetch: () => {},
  }),
}));

jest.mock("../../common/parsers", () => ({
  groupByFuelTypeAndInterconnectors: () => {},
  combineFuelTypesAndEmbedded: () => {},
  interpolateCurrentEmbeddedWindAndSolar: () => {},
}));

describe("useFuelTypeLiveQuery", () => {
  it("should return null data if bm data is null", () => {
    const { data } = useFuelTypeLiveQuery();
    expect(data).toBeNull();
  });
  it("should return isLoading true", () => {
    const { isLoading } = useFuelTypeLiveQuery();
    expect(isLoading).toBeTruthy();
  });
  it("completeness should be false for bm and embedded", () => {
    const { completeness } = useFuelTypeLiveQuery();
    expect(completeness.bm).toBeFalsy();
    expect(completeness.embedded).toBeFalsy();
  });
});

