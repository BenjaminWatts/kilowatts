import React from "react";
import { Text } from "react-native";
import { ForegroundComponent } from "./Foreground";
import { render, screen } from "@testing-library/react-native";

jest.mock("react-native/Libraries/AppState/AppState", () => ({
  currentState: "background",
  addEventListener: jest.fn(),
}));

const MockBackgroundScreen = () => <Text>MOCK_BACKGROUND_SCREEN</Text>;

jest.mock("../atoms/screens", () => ({
  BackgroundScreen: () => <MockBackgroundScreen/>
}));

const mockChildrenRender = jest.fn();

const MockChildren = () => {
  mockChildrenRender()
  return <Text>MOCK_CHILDREN</Text>;
}

describe("components/ForegroundComponent/background", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <ForegroundComponent>
        <MockChildren />
      </ForegroundComponent>
    );
  });

  test("should render MockBackgroundScreen when app is in background", () => {
    screen.getByText("MOCK_BACKGROUND_SCREEN");
  });

  test('mockChildrenRender should not be called', () => {
    expect(mockChildrenRender).not.toHaveBeenCalled()
  })

});
