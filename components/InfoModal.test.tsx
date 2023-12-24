import { InfoModal } from "./InfoModal";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { updateId } from "expo-updates";

// local mocks
const mockConsentDialog = jest.fn();
const mockHeaderInfoIcon = jest.fn();

// mock ConsentDialog from ../atoms/dialogs
jest.mock("../atoms/dialogs", () => ({
  ConsentDialog: (x: any) => mockConsentDialog(x),
}));

describe("components/InfoModal", () => {
  beforeEach(() => {
    mockConsentDialog.mockClear();
    mockHeaderInfoIcon.mockClear();
    render(<InfoModal />);
  });
  test("expect ConsentDialog to be called with prop isVisible=false", () => {
    expect(mockConsentDialog).toHaveBeenCalledWith({
      isVisible: false,
      onBackdropPress: expect.any(Function),
      onAccept: expect.any(Function),
      updatedAt: null
    });
  });
  test('after clicking on header-info-icon expect ConsentDialog to be called with prop isVisible=true', () => {
    fireEvent.press(screen.getByTestId('header-info-icon'))
    
    expect(mockConsentDialog).toHaveBeenCalledWith({
      isVisible: true,
      onBackdropPress: expect.any(Function),
      onAccept: expect.any(Function),
      updatedAt: null
    });
  })
});
