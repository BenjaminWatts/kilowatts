import { useFuelTypeLiveQuery } from "./fuelTypeLive";

// mock so that data is returned from both apis but an error happens while transforming the data

jest.mock("./api/elexon-insights-api.hooks", () => ({
  useUnitGroupsLiveQuery: () => ({
    data: [],
    isLoading: false,
    refetch: () => {},
  }),
}));

jest.mock("./api/ng-eso-api", () => ({
  useEmbeddedWindAndSolarForecastQuery: () => ({
    data: [],
    isLoading: false,
    refetch: () => {},
  }),
}));

const mockFn = jest.fn();

jest.mock("../../common/parsers", () => ({
  combineFuelTypesAndEmbedded: (x: any) => {
    mockFn(x);
    throw Error("fake error");
  },
}));


describe("useFuelTypeLiveQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it("should return null data because of the error", () => {
    const { data } = useFuelTypeLiveQuery();
    expect(data).toBeNull();
  });
  it("should return isLoading false because both have loaded", () => {
    const { isLoading } = useFuelTypeLiveQuery();
    expect(isLoading).toBe(false);
  });
  it("it should return completeness true for both queries", () => {
    const { completeness } = useFuelTypeLiveQuery();
    expect(completeness.bm).toBe(true);
    expect(completeness.embedded).toBe(true);
  });

  it('groupByFuelTypeAndInterconnectors should be called', () => {
    expect(mockFn).toHaveBeenCalledTimes(0);
    useFuelTypeLiveQuery();
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

  it('error should not be null and message should match the mock function', () => {
    const query = useFuelTypeLiveQuery();
    expect(query.error).not.toBeNull();
    expect(query.error?.message).toBe('fake error')
  })


});
