// test that the a loading component is rendered when the app is determining if it is connected to the internet

import { InternetConnection } from "./InternetConnection";
import { render, screen } from "@testing-library/react-native";

jest.mock("../services/hooks", () => ({
  useInternetConnection: () => ({
    isConnected: null,
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

describe("InternetConnection/loading", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <InternetConnection/>
    );
  });

  test("expect refresh control to be rendered", () => {
    screen.findByTestId('refresh-control')
  });
});
