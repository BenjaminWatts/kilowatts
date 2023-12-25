import { renderHook } from "@testing-library/react-hooks";
import { useNowSettlementPeriod } from "./useNowSettlementPeriod";

const updateIntervalSecs = 1; // this is ignored by the mock

const now = new Date(Date.parse("2021-01-01T12:00:00Z"));

const mockUseNowTime = jest.fn();

// mock useNowTime
jest.mock("./useNowTime", () => ({
  useNowTime: (x: number) => mockUseNowTime(x),
}));

describe("hooks/useNowSettlementPeriod", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  test("should return now and a settlementDate/Period of 2021-01-01/25", () => {
    mockUseNowTime.mockReturnValue(now);
    const { result } = renderHook(() =>
      useNowSettlementPeriod(updateIntervalSecs)
    );
    expect(result.current).toEqual({
      now,
      settlementPeriod: { settlementDate: "2021-01-01", settlementPeriod: 25 },
    });
  });
});
