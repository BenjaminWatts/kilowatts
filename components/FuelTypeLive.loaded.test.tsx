// test what renders when useFuelTypeLiveQuery returns data

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { FuelTypeLive } from "./FuelTypeLive";
import { FuelTypeLiveHookResultSuccess } from "../common/types";

const now = new Date(Date.parse("2021-01-01T00:00:00Z"));

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
        now: new Date(Date.parse("2021-01-01T00:00:00Z")),
        isLoading: false,
        error: undefined,
        refetch: mockFns.refresh as any,
        completeness: {
          bm: true,
          embedded: true,
        },
        data: [
          {
            name: "coal",
            level: 0,
            unitGroupLevels: [],
          },
        ],
      } as FuelTypeLiveHookResultSuccess),
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
  // listItems: {
  //   FuelTypeLive: jest.fn(),
  // },
  cards: {
    ApiErrorCard: jest.fn(),
    CallForContributions: jest.fn(),
    FuelTypeCompletenessListHeader: jest.fn(),
  },
  controls: {
    Refresh: jest.fn(),
  },
};

// mock the cards

jest.mock("../atoms/cards", () => ({
  ApiErrorCard: (props: any) => {
    mockRenders.cards.ApiErrorCard(props);
    return <></>;
  },
  CallForContributions: (props: any) => {
    mockRenders.cards.CallForContributions(props);
    return <></>;
  },
  FuelTypeCompletenessListHeader: (props: any) => {
    mockRenders.cards.FuelTypeCompletenessListHeader(props);
    return <></>;
  },
}));

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

  test("header displays National Grid at: 00:00:00", () => {
    expect(mockFns.setOptions).toHaveBeenCalledTimes(1);
    expect(mockFns.setOptions.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        title: "National Grid at: 00:00:00",
      })
    );
  });

  test("list has been rendered", () => {
    screen.getByTestId("fuel-type-live-list");
  });

  test("list header has been called once with completeness true for bm and embedded", () => {
    expect(
      mockRenders.cards.FuelTypeCompletenessListHeader
    ).toHaveBeenCalledTimes(1);
    expect(
      mockRenders.cards.FuelTypeCompletenessListHeader
    ).toHaveBeenCalledWith({ completeness: { bm: true, embedded: true } });
  });

  test("list footer has been called once", () => {
    expect(mockRenders.cards.CallForContributions).toHaveBeenCalledTimes(1);
  });

  test("refresh control has been called with isLoading false and correct refresh function", () => {
    expect(mockRenders.controls.Refresh).toHaveBeenCalledTimes(1);
    expect(mockRenders.controls.Refresh).toHaveBeenCalledWith({
      refreshing: false,
      onRefresh: mockFns.refresh,
    });
  });

  test("has rendered coal with level 0", () => {
    screen.getByText("Coal");
    screen.getByText("0 MW");
  });

  test("can navigate to coal and mockFns.push will have been called with the argument coal", () => {
    fireEvent.press(screen.getByText("Coal"));
    expect(mockFns.push).toHaveBeenCalledTimes(1);
    expect(mockFns.push).toHaveBeenCalledWith("/fuel-type/coal");
  });
});
