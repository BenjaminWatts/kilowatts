import React from "react";
import { Text } from "react-native";
import { ForegroundComponent } from "./Foreground";
import { render, screen } from "@testing-library/react-native";

jest.mock("react-native/Libraries/AppState/AppState", () => ({
  currentState: "active",
  addEventListener: jest.fn(),
}));

const mockBackgroundRender = jest.fn();

const MockBackgroundScreen = () => {
    mockBackgroundRender()
    return <Text testID='mock-background-screen'>MOCK_BACKGROUND_SCREEN</Text>
}

jest.mock("../atoms/screens", () => ({
    BackgroundScreen: () => <MockBackgroundScreen/>
  }));

const MockChildren = () => <Text>MOCK_CHILDREN</Text>;

describe("components/ForegroundComponent/forecast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ForegroundComponent>
        <MockChildren />
      </ForegroundComponent>
    );
  });
  test("should render MockChildren when app is in foreground", () => {
    screen.getByText("MOCK_CHILDREN");
  });

  test('mockBackgroundRender should not be called', () => {
    expect(mockBackgroundRender).not.toHaveBeenCalled()
  })
});
