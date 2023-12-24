import React from "react";
import * as u from "./UnitGroupsLiveList";

//mock expo router

jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: () => {},
  }),
}));

// useUnitGroupsLiveQuery
jest.mock("../services/state/api/elexon-insights-api.hooks", () => ({
  useUnitGroupsLiveQuery: () => ({
    data: null,
    isLoading: true,
    refetch: () => {},
  }),
}));

describe("UnitGroupsLiveList/filterData", () => {
  it("should return null if data is null", () => {
    expect(
      u.filterData({
        data: null,
        search: "",
        fuelType: undefined,
      })
    ).toBe(null);
  });

  it("should remove non coal units if fuelType is coal", () => {
    expect(
      u.filterData({
        data: [
          {
            details: {
              name: "coal",
              fuelType: "coal",
            },
            units: [],
            level: 0,
          },
          {
            details: {
              name: "gas",
              fuelType: "gas",
            },
            units: [],
            level: 0,
          },
        ],
        search: "",
        fuelType: "coal",
      })
    ).toEqual([
      {
        details: {
          name: "coal",
          fuelType: "coal",
        },
        units: [],
        level: 0,
      },
    ]);
  });

  it("it should filter search results", () => {
    const search = "Drax";
    expect(
      u.filterData({
        data: [
          {
            details: {
              name: "Drax",
              fuelType: "coal",
            },
            units: [],
            level: 0,
          },
          {
            details: {
              name: "Carrington",
              fuelType: "gas",
            },
            units: [],
            level: 0,
          },
        ],
        search,
        fuelType: undefined,
      })
    ).toEqual([
      {
        details: {
          name: "Drax",
          fuelType: "coal",
        },
        units: [],
        level: 0,
      },
    ]);
  });

  it("search is not case sensitive", () => {
    const search = "DrAx";
    expect(
      u.filterData({
        data: [
          {
            details: {
              name: "Drax",
              fuelType: "coal",
            },
            units: [],
            level: 0,
          },
          {
            details: {
              name: "Carrington",
              fuelType: "gas",
            },
            units: [],
            level: 0,
          },
        ],
        search,
        fuelType: undefined,
      })
    ).toEqual([
      {
        details: {
          name: "Drax",
          fuelType: "coal",
        },
        units: [],
        level: 0,
      },
    ]);
  });


});
