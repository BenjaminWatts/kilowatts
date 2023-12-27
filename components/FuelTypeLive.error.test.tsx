// test what renders when useFuelTypeLiveQuery returns data

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { FuelTypeLive } from "./FuelTypeLive";
import { FuelTypeLiveHookResultError } from "../common/types";

const mockFns = {
  refresh: jest.fn(),
  push: jest.fn(),
  FuelTypeCompletenessListHeader: jest.fn(),
  setOptions: jest.fn(),
};

jest.mock("../services/state/fuelTypeLive", () => {
  return {
    useFuelTypeLiveQuery: () =>
      ({
        isLoading: false,
        error: new Error("test error"),
        refetch: mockFns.refresh as any,
        completeness: {
          bm: false,
          embedded: false,
        },
        data: null,
      } as FuelTypeLiveHookResultError),
  };
});

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    setOptions: (x: any) => mockFns.setOptions(x),
  }),
  useRouter: () => ({
    push: (x: any) => mockFns.push(x),
  }),
}));


// mockrenders for mocked components

const mockRenders = {
  controls: {
    Refresh: jest.fn(),
  },
};

// mock the controls

jest.mock("../atoms/controls", () => ({
  Refresh: (props: any) => {
    mockRenders.controls.Refresh(props);
    return <></>;
  },
}));

describe("components/FuelTypeLive.loaded", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<FuelTypeLive />);
  });

  test("header displays Loading...", () => {
    expect(mockFns.setOptions).toHaveBeenCalledTimes(1);
    expect(mockFns.setOptions.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        title: "Loading...",
      })
    );
  });

  test("has not rendered a list at all", () => {
    expect(screen.queryByTestId("fuel-type-live-list")).toBeNull();
  });

  test("refresh control has not been called", () => {
    expect(mockRenders.controls.Refresh).toHaveBeenCalledTimes(0);
  });

  test("renders error message in card", () => {
    screen.findByTestId(
      "There was an error fetching/interpreting data from the Elexon API. Please try again later."
    );
  });

  test('pushing Try Again button calls "refresh"', () => {
    fireEvent.press(screen.getByText("Try Again"));
    expect(mockFns.refresh).toHaveBeenCalledTimes(1);
  })
});
