import { useFuelTypeLiveQuery } from "./fuelTypeLive";


jest.mock("./api/elexon-insights-api.hooks", () => ({
  useUnitGroupsLiveQuery: () => ({
    data: [],
    isLoading: false,
    refetch: () => {},
  }),
}));

const mockgroupByFuelTypeAndInterconnectors = jest.fn();

jest.mock("../../common/parsers", () => ({
  groupByFuelTypeAndInterconnectors: (x: any) => mockgroupByFuelTypeAndInterconnectors(x),
  combineFuelTypesAndEmbedded: () => {},
  interpolateCurrentEmbeddedWindAndSolar: () => {},
}));


jest.mock("./api/ng-eso-api", () => ({
  useEmbeddedWindAndSolarForecastQuery: () => ({
    data: null,
    isLoading: true,
    refetch: () => {},
  }),
}));

describe("useFuelTypeLiveQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it("should not return null data if bm data is null", () => {
    const { data } = useFuelTypeLiveQuery();
    expect(data).not.toBeNull();
  });
  it("should return isLoading true because em is still loading", () => {
    const { isLoading } = useFuelTypeLiveQuery();
    expect(isLoading).toBe(true);
  });
  it("completeness should be true for bm but false for embedded", () => {
    const { completeness } = useFuelTypeLiveQuery();
    expect(completeness.bm).toBe(true);
    expect(completeness.embedded).toBe(false);
  });
  it('groupByFuelTypeAndInterconnectors should be called', () => {
    expect(mockgroupByFuelTypeAndInterconnectors).toHaveBeenCalledTimes(0);
    useFuelTypeLiveQuery();
    expect(mockgroupByFuelTypeAndInterconnectors).toHaveBeenCalledTimes(1);
  })
});
