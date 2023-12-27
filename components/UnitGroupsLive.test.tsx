// test rendering the UnitGroupsLive component, and entering text into the search box
import { render, screen, fireEvent } from "@testing-library/react-native";
import { UnitGroupsLive } from "./UnitGroupsLive";

const mockRenders = [
  jest.spyOn(require("../components/UnitGroupsLiveList"), "UnitGroupLiveList"),
  jest.spyOn(require("../atoms/inputs"), "SearchUnitGroups"),
];

// mock the list component
jest.mock("../components/UnitGroupsLiveList", () => ({
  UnitGroupLiveList: () => <div>UnitGroupLiveList</div>,
}));

// mock useUnitGroupsLiveQuery
jest.mock("../services/state/api/elexon-insights-api.hooks", () => ({
  useUnitGroupsLiveQuery: () => ({
    data: [],
    now: new Date(),
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

// mock expo router
jest.mock("expo-router", () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
  useRouter: () => ({
    params: {},
  }),
}));

const typingEvents = {
  drax: () => {
    const input = screen.getByPlaceholderText("Search");
    fireEvent.changeText(input, "Drax");
    return input;
  },
  ratcliffe: () => {
    const input = screen.getByPlaceholderText("Search");
    fireEvent.changeText(input, "Ratcliffe");
    return input;
  }
};

describe("UnitGroupsLive/noFuelType", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<UnitGroupsLive />);
  });

  test("search input is visible", () => {
    screen.getByPlaceholderText("Search");
  });

  test('UnitGroupLiveList is rendered with the prop search == "" and fuelType undefined ', () => {
    expect(mockRenders[0]).toHaveBeenCalledWith(
      { search: "", fuelType: undefined },
      {}
    );
  });

  test("can enter Drax into search input and this is reflected in the rendered text", () => {
    const input = typingEvents.drax();
    expect(input.props.value).toBe("Drax");
  });

  test("after typing Drax, UnitGroupLiveList is called with prop Search == Drax", () => {
    typingEvents.drax();
    expect(mockRenders[0]).toHaveBeenCalledWith(
      { search: "Drax", fuelType: undefined },
      {}
    );
  });
});


describe("UnitGroupsLive/coal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<UnitGroupsLive fuelType="coal"/>);
  });

  test("search input is visible", () => {
    screen.getByPlaceholderText("Search");
  });

  test('UnitGroupLiveList is rendered with the prop search == "" and fuelType coal ', () => {
    expect(mockRenders[0]).toHaveBeenCalledWith(
      { search: "", fuelType: 'coal' },
      {}
    );
  });

  test("can enter Ratcliffe into search input and this is reflected in the rendered text", () => {
    const input = typingEvents.ratcliffe();
    expect(input.props.value).toBe("Ratcliffe");
  });

  test("after typing Drax, UnitGroupLiveList is called with prop Search == Ratcliffe", () => {
    typingEvents.ratcliffe();
    expect(mockRenders[0]).toHaveBeenCalledWith(
      { search: "Ratcliffe", fuelType: 'coal' },
      {}
    );
  });
});
