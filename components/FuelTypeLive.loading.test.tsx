// test what renders when useFuelTypeLiveQuery retruns loading and null data

import React from "react";
import { render, screen } from "@testing-library/react-native";
import { FuelTypeLive } from "./FuelTypeLive";
import { FuelTypeLiveHookResultLoading } from "../common/types";

const mockFns = {
  refresh: jest.fn(),
  FuelTypeCompletenessListHeader: jest.fn(),
  setOptions: jest.fn(),
};

jest.mock("../services/state/fuelTypeLive", () => {
  return {
    useFuelTypeLiveQuery: () =>
      ({
        data: null,
        isLoading: true,
        refetch: mockFns.refresh as any,
        completeness: {
          bm: false,
          embedded: false,
        },
      } as FuelTypeLiveHookResultLoading),
  };
});

jest.mock("expo-router", () => ({
    useNavigation: () => ({
        setOptions: (x: any) => mockFns.setOptions(x),
      }),
  useRouter: () => ({
    push: () => {},
  }),
}));

// mockrenders for mocked components

const mockRenders = {
  listItems: {
    FuelTypeLive: jest.fn(),
  },
  cards: {
    ApiErrorCard: jest.fn(),
    CallForContributions: jest.fn(),
    FuelTypeCompletenessListHeader: jest.fn(),
  },
  controls: {
    Refresh: jest.fn(),
  },
};

// mock the list-items

jest.mock("../atoms/list-items", () => ({
  FuelTypeLive: (props: any) => {
    mockRenders.listItems.FuelTypeLive(props);
    return <></>;
  },
}));

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

describe("components/FuelTypeLive.loading", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<FuelTypeLive />);
  });

  test('header displays National Grid at: 00:00:00', () => {
    expect(mockFns.setOptions).toHaveBeenCalledTimes(1)
    expect(mockFns.setOptions.mock.calls[0][0]).toEqual(expect.objectContaining({
      title: 'Loading...'
    }))
  })

  test("list has been rendered", () => {
    screen.getByTestId("fuel-type-live-list");
  });

  test("list header has been called once with completeness false for bm and embedded", () => {
    expect(
      mockRenders.cards.FuelTypeCompletenessListHeader
    ).toHaveBeenCalledTimes(1);
    expect(
      mockRenders.cards.FuelTypeCompletenessListHeader
    ).toHaveBeenCalledWith({ completeness: { bm: false, embedded: false } });
  });

  test("list footer has been called once", () => {
    expect(mockRenders.cards.CallForContributions).toHaveBeenCalledTimes(1);
  });

  test("refresh control has been called with isLoading true and correct refresh function", () => {
    expect(mockRenders.controls.Refresh).toHaveBeenCalledTimes(1);
    expect(mockRenders.controls.Refresh).toHaveBeenCalledWith({
      refreshing: true,
      onRefresh: mockFns.refresh,
    });
  });

  test("list item has not been called", () => {
    expect(mockRenders.listItems.FuelTypeLive).toHaveBeenCalledTimes(0);
  });
});
