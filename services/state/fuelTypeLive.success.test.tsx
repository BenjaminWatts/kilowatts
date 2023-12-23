import { useFuelTypeLiveQuery } from "./fuelTypeLive";

// mock so that data is returned from both apis

const mockCombineFuelTypesAndEmbedded = jest.fn();

// mock../../common/parsers
jest.mock("../../common/parsers", () => ({
  combineFuelTypesAndEmbedded: (x: any) => mockCombineFuelTypesAndEmbedded(x),
}));

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

describe("useFuelTypeLiveQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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


  it("should return an empty array of data if the mock is primed", () => {
    expect(mockCombineFuelTypesAndEmbedded).toHaveBeenCalledTimes(0);
    mockCombineFuelTypesAndEmbedded.mockReturnValueOnce([]);
    const query = useFuelTypeLiveQuery();
    expect(mockCombineFuelTypesAndEmbedded).toHaveBeenCalledTimes(1);
    expect(query.data).toMatchObject([]);
  });
});
