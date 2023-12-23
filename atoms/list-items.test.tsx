import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import * as l from "./list-items";
import { Text } from "react-native";

// local mocks
const mockOnPress = jest.fn();
const mockLondonTime = (x: any) => {
  if (x === "2021-01-01T00:00:00Z")
    throw new Error("mockLondonTime: unexpected input");
  return "12:45:00";
};
const mockFuelTypeIcon = jest.fn();

// mock out the FuelTypeIcon component
jest.mock("./icons", () => ({
  FuelTypeIcon: (x: any) => mockFuelTypeIcon(x),
}));

// mock out the londonTime function
jest.mock("../common/utils", () => ({
  londonTimeHHMMSS: (x: any) => mockLondonTime(x),
}));

describe("atoms/list-items/GeneratorLive", () => {
  beforeEach(() => {
    mockOnPress.mockClear();
    mockFuelTypeIcon.mockClear();
    render(
      <l.GeneratorLive
        index={0}
        fuelType="coal"
        name="my name"
        level={100}
        onPress={mockOnPress}
      />
    );
  });

  test("renders expected text", () => {
    screen.getByText("my name");
    screen.getByText("100 MW");
  });

  test("has called mockFuelTypeIcon with expected props", () => {
    expect(mockFuelTypeIcon).toHaveBeenCalledTimes(1);
    expect(mockFuelTypeIcon).toHaveBeenCalledWith({
      fuelType: "coal",
      size: 20,
    });
  });

  test("renders generator-live-0 testId used in e2e tests", () => {
    screen.findByTestId("generator-live-0");
  });

  test("calls onPress when pressed", () => {
    expect(mockOnPress).toHaveBeenCalledTimes(0);
    const item = screen.getByTestId("generator-live-0");
    fireEvent.press(item);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

describe("atoms/list-items/FuelTypeLive", () => {
  beforeEach(() => {
    mockFuelTypeIcon.mockClear();

    render(<l.FuelTypeLive name="coal" level={100} />);
  });

  test("renders expected text", () => {
    screen.getByText("Coal");
    screen.getByText("100 MW");
  });

  test("has called mockFuelTypeIcon with expected props", () => {
    expect(mockFuelTypeIcon).toHaveBeenCalledTimes(1);
    expect(mockFuelTypeIcon).toHaveBeenCalledWith({
      fuelType: "coal",
      size: 20,
    });
  });
});

describe("atoms/list-items/UnitLive", () => {
  beforeEach(() => {
    render(
      <l.UnitLive
        index={0}
        details={{ bmUnit: "T_MYUNIT-1", name: "unit name" }}
        level={120}
      />
    );
  });

  test("renders expected text", () => {
    screen.getByText("T_MYUNIT-1");
    screen.getByText("120 MW");
  });
});

describe("atoms/list-items/UnitLevelListItem", () => {
  beforeEach(() => {
    render(<l.UnitLevelListItem time="2021-01-01T00:00:00Z" level={120} />);
  });

  test("renders time", () => {
    screen.getByText("12:45:00");
  });

  test("renders output value", () => {
    screen.getByText("120 MW");
  });
});
