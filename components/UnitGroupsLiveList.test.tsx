import React from "react";
import * as u from "./UnitGroupsLiveList";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import { refresh } from "@react-native-community/netinfo";
import { UnitGroupLevel } from "../common/types";

const mockFns = {
  refresh: jest.fn(),
  UnitsGroupMap: jest.fn(),
};

//mock expo router

jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: () => {},
  }),
}));

// mock UnitsGroupMap
jest.mock("../atoms/maps", () => ({
  UnitsGroupMap: (p: any) => {
    mockFns.UnitsGroupMap(p);
    return <></>;
  },
}));

describe("components/UnitGroupsLiveList hideMap and no data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <u.UnitGroupsLiveList
        hideMap={true}
        isLoading={true}
        refetch={mockFns.refresh}
        data={null}
      />
    );
  });

  test("UnitsGroupMap should not have been called", () => {
    expect(mockFns.UnitsGroupMap).not.toHaveBeenCalled();
  });

  test("No Units Found should be visible (as ListEmptyComponent)", () => {
    expect(screen.getByText("No Units Found")).toBeTruthy();
  });

  test("Call for contributions component text should be visible ", () => {
    expect(
      screen.getByText("This open-source app is incomplete.")
    ).toBeTruthy();
  });
});

describe("components/UnitGroupsLiveList show map and render data", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // generate 200 items
    const data: UnitGroupLevel[] = [];
    for (let i = 0; i < 1000; i++) {
      data.push({
        details: {
          name: `coal ${i}`,
          fuelType: "coal",
          code: `coal-${i}`,
        },
        units: [],
        level: 0,
      });
    }

    render(
      <u.UnitGroupsLiveList
        hideMap={false}
        isLoading={true}
        refetch={() => {}}
        data={data}
      />
    );
  });

  test('expect "No Units Found" to not be visible', () => {
    expect(screen.queryByText("No Units Found")).toBeNull();
  })

  test("UnitsGroupMap should have been called with initially no items", () => {
    expect(mockFns.UnitsGroupMap).toHaveBeenCalled();
    const call = mockFns.UnitsGroupMap.mock.calls[0][0]
    expect(call.ugs).toEqual([]);
  });

  test('wait until list rendered', () => {
    screen.getByText("coal 0")
  })

  // :TODO: add tests to simulate scrolling and check that UnitsGroupMap is called with the correct items



});
