// test rendering the UnitGroupsLive component, and entering text into the search box
import { render, act } from "@testing-library/react-native";
import { UnitGroupsLive } from "./UnitGroupsLive";

const mockFns = {
  SearchUnitGroups: jest.fn(),
  UnitGroupLiveWithSearch: jest.fn(),
};

// mock the search box component
jest.mock("../atoms/inputs", () => ({
  SearchUnitGroups: (p: any) => {
    mockFns.SearchUnitGroups(p);
    return <></>;
  },
}));

// mock the with search component
jest.mock("./UnitGroupsLiveWithSearch", () => ({
  UnitGroupLiveWithSearch: (p: any) => {
    mockFns.UnitGroupLiveWithSearch(p);
    return <></>;
  },
}));

describe("UnitGroupsLive/noFuelType", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log(UnitGroupsLive);
    render(<UnitGroupsLive />);
  });

  test("SearchUnitGroups has been called with value=='' ", () => {
    const call = mockFns.SearchUnitGroups.mock.calls[0][0];
    expect(call.value).toBe("");
  });

  test('UnitGroupLiveList is rendered with the prop search == "" and fuelType undefined ', () => {
    const call = mockFns.UnitGroupLiveWithSearch.mock.calls[0][0];
    expect(call.search).toBe("");
    expect(call.fuelType).toBe(undefined);
  });

  test("typing Drax results in rerenders to the search and with search components", () => {
    const call = mockFns.SearchUnitGroups.mock.calls[0][0];
    const onChangeText = call.onChangeText;
    console.log(onChangeText);
    act(() => onChangeText("Drax"));

    const nextSearchCall = mockFns.SearchUnitGroups.mock.calls[1][0];
    expect(nextSearchCall.value).toBe("Drax");

    const nextWithSearchCall = mockFns.UnitGroupLiveWithSearch.mock.calls[1][0];
    expect(nextWithSearchCall.search).toBe("Drax");
    expect(nextWithSearchCall.fuelType).toBe(undefined);
  });
});

describe("UnitGroupsLive/withFuelType", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log(UnitGroupsLive);
    render(<UnitGroupsLive fuelType="coal" />);
  });

  test("SearchUnitGroups has been called with value=='' ", () => {
    const call = mockFns.SearchUnitGroups.mock.calls[0][0];
    expect(call.value).toBe("");
  });

  test('UnitGroupLiveList is rendered with the prop search == "" and fuelType coal ', () => {
    const call = mockFns.UnitGroupLiveWithSearch.mock.calls[0][0];
    expect(call.search).toBe("");
    expect(call.fuelType).toBe("coal");
  });

  test("typing Drax results in rerenders to the search and with search components", () => {
    const call = mockFns.SearchUnitGroups.mock.calls[0][0];
    const onChangeText = call.onChangeText;
    console.log(onChangeText);
    act(() => onChangeText("Drax"));

    const nextSearchCall = mockFns.SearchUnitGroups.mock.calls[1][0];
    expect(nextSearchCall.value).toBe("Drax");

    const nextWithSearchCall = mockFns.UnitGroupLiveWithSearch.mock.calls[1][0];
    expect(nextWithSearchCall.search).toBe("Drax");
    expect(nextWithSearchCall.fuelType).toBe("coal");
  });
});
