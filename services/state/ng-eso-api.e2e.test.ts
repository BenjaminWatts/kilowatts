import "@testing-library/jest-dom";
import { store } from "./index";
import { ngEsoApi } from "./ng-eso-api";


describe("services/state/ng-eso-api/endpoints", () => {
    test("fetch, validate and parse embeddedWindAndSolarForecast", async () => {
        const result = await store.dispatch(
            ngEsoApi.endpoints.embeddedWindAndSolarForecast.initiate({})
        );  
        if(!result.data) {
            throw new Error("no data");
        }
    });
  });