import * as p from "../../common/parsers";
import log from "../log";
import {
  UseCurrentRangeParams,
} from "../../common/types";
import { useUnitHistoryQuery } from "./unitsHistory";
import { useEmbeddedWindAndSolarForecastQuery } from "./api/ng-eso-api";

const range: UseCurrentRangeParams = {
  hoursInPast: 0.5,
  hoursInAdvance: 2,
  updateIntervalSecs: 15,
};

/* Get the data for a single unit group over the required interval */
export const useFuelTypeHistoryQuery = () => {
  const queries = {
    bm: useUnitHistoryQuery({
      range,
    }),
    embedded: useEmbeddedWindAndSolarForecastQuery({}),
  };
  const baseParams = {
    isLoading: queries.bm.isLoading || queries.embedded.isLoading,
  };
  if (!queries.bm.data || !queries.embedded.data) {
    return {
      ...baseParams,
      data: null,
    };
  } else {
    try {
      return {
        ...baseParams,
        data: p.transformFuelTypeHistoryQuery({
          range: queries.bm.range,
          bm: queries.bm.data,
          embedded: queries.embedded.data,
        }),
      };
    } catch (e) {
      log.error(e);
      return {
        ...baseParams,
        data: null,
        error: e,
      };
    }
  }
};
