// test that the child component is rendered when the app is not connected to the internet

import { InternetConnection } from "./InternetConnection";
import { render, screen } from "@testing-library/react-native";

jest.mock("../services/hooks", () => ({
  useInternetConnection: () => ({
    isConnected: false,
  }),
}));

// mock expo router
jest.mock("expo-router", () => ({
  useNavigation: () => ({
    setOptions: (x: any) => {},
  }),
  useRouter: () => ({
    push: (x: any) => {},
  }),
}));

// mock WithLicense
jest.mock("./WithLicense", () => ({
  WithLicense: ({ children }: any) => children,
}));

// mock ForegroundComponent
jest.mock("./Foreground", () => ({
  ForegroundComponent: ({ children }: any) => children,
}));

describe("InternetConnection/connected", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <InternetConnection/>
    );
  });

  test("renders text expected when device not connected to the internet", () => {
    screen.findByText('No Internet Connection')
    screen.findByText('To function, the app needs a live internet connection to get the latest market information.')
    screen.findByText('Please check your connection and refresh the app.')
  });
});
