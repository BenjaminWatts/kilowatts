import * as p from "../../common/parsers";
import log from "../log";
import { useUnitsLiveQuery } from "./unitsLive";

const UPDATE_INTERVAL_SECS = 1

/* get live output data for all unit groups - uses useBmUnitsLiveQuery for data */
export const useUnitGroupsLiveQuery = (updateIntervalSecs = UPDATE_INTERVAL_SECS) => {
  const query = useUnitsLiveQuery({
    bmUnits: undefined,
    updateIntervalSecs
  });

  if (!query.data) {
    return query;
  }

  try {
    return {
      ...query,
      data: p.transformUnitGroupsLiveQuery({
        ...query.data,
        now: query.now,
      }),
      isError: false,
    };
  } catch (e: any) {
    log.error(e);
    return {
      ...query,
      data: null,
      isError: true,
    };
  }
};
