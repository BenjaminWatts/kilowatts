import { render, screen } from "@testing-library/react-native";
import * as m from "./maps.web";

describe("atoms/maps.web/UnitGroupMap", () => {
  test("renders undefined as maps not supported on web yet", () => {
    render(<m.UnitGroupMap />);
    expect(screen.debug()).toBe(undefined);
  });

  test("renders undefined as maps not supported on web yet", () => {
    render(<m.UnitsGroupMap />);
    expect(screen.debug()).toBe(undefined);
  });
});
