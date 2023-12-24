import { render, screen, fireEvent } from "@testing-library/react-native";
import * as c from "./cards";
import { urls } from "../services/nav";

const mockLinkingOpenURL = jest.fn();
jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: mockLinkingOpenURL,
}));

//modk useRouter
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockLinkingOpenURL,
    replace: mockLinkingOpenURL,
  }),
}));

let mockLondonTime = jest.fn();
jest.mock("../common/utils", () => ({
  londonTimeHHMMSS: (x: any) => mockLondonTime(x),
}));

describe("atoms/cards/CallForContributions", () => {
  beforeEach(() => {
    render(<c.CallForContributions />);
    mockLinkingOpenURL.mockClear();
  });

  test("renders text", () => {
    screen.getByText("Help us!");
    screen.getByText(
      "This open-source app is incomplete."
    );
    screen.getByText(
      "Please help us by contributing to the project on GitHub."
    );
  });

  test("github link", () => {
    const githubButton = screen.getByTestId("github-repo-link");
    fireEvent.press(githubButton);
    expect(mockLinkingOpenURL).toBeCalledWith(urls.githubRepo);
  });
});

describe("atoms/cards/UnknownUnitGroupCode", () => {
  beforeEach(() => {
    render(<c.UnknownUnitGroupCode />);
  });

  test("renders text", () => {
    screen.getByText("Error");
    screen.getByText(
      "Cannot find details for this generator. Please check the URL and try again."
    );
  });
});

describe("atoms/cards/MissingScreen", () => {
  beforeEach(() => {
    mockLinkingOpenURL.mockClear();
    render(<c.MissingScreen />);
  });

  test("renders expected text", () => {
    screen.getByText("Error");
    screen.getByText("This screen does not exist.");
  });

  test("can click on home link", () => {
    const homeButton = screen.getByText("Go to Home Screen");
    fireEvent.press(homeButton);
    expect(mockLinkingOpenURL).toBeCalledWith(urls.home);
  });
});

describe("atoms/cards/UnitListHeader", () => {

  test("renders loading text with undefined now prop", () => {
    render(<c.UnitListHeader />);
    screen.getByText("Loading individual unit data");
  });

  test("renders live individual unit output and local time if now prop is a Date ", () => {

    const now = new Date(Date.parse("2023-01-01"));
    mockLondonTime.mockReturnValue("NOW");
    render(<c.UnitListHeader now={now} />);
    expect(mockLondonTime).toBeCalledWith(now);
    screen.getByText("Live Output: NOW");
  });

  afterAll(() => {
    mockLondonTime.mockRestore();
  });
});


describe("atoms/cards/UnitGroupScheduleHeader", () => {

    test('renders the words Unit BMU1 schedule', () => {
        render(<c.UnitGroupScheduleHeader bmUnit="BMU1" />);
        screen.getByText("Unit BMU1 schedule");
    })




})