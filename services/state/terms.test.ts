import { store } from "./root";
import * as terms from "./terms";

describe("services/state/terms", () => {
  test("initially terms are not accepted", () => {
    expect(terms.getTermsAccepted(store.getState())).toBe(false);
  });

  test("accepting terms changes state", () => {
    store.dispatch(terms.acceptLicense());
    expect(terms.getTermsAccepted(store.getState())).toBe(true);
  });
});
