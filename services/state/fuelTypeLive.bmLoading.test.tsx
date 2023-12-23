import { useFuelTypeLiveQuery } from "./fuelTypeLive";


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

jest.mock("./api/ng-eso-api", () => ({
  useEmbeddedWindAndSolarForecastQuery: () => ({
    data: {
      embeddedWindAndSolarForecast: [
        {
          timestamp: "2021-01-01T00:00:00Z",
          wind: 1,
          solar: 1,
        },
      ],
    },
    isLoading: false,
    refetch: () => {},
  }),
}));

describe("useFuelTypeLiveQuery", () => {
  it("should return null data if bm data is null", () => {
    const { data } = useFuelTypeLiveQuery();
    expect(data).toBeNull();
  });
  it("should return isLoading true because bm is still loading", () => {
    const { isLoading } = useFuelTypeLiveQuery();
    expect(isLoading).toBeTruthy();
  });
  it("completeness should be false for bm but now positive for embedded", () => {
    const { completeness } = useFuelTypeLiveQuery();
    expect(completeness.bm).toBe(false);
    expect(completeness.embedded).toBe(true);
  });
});
