import * as p from "../../common/parsers";
import log from "../log";
import { UnitGroup } from "../../common/types";
import { useUnitsLiveQuery } from "./unitsLive";

/* Get the latest data for a single unit group - passed the list of bm units to useBmUnitsLiveQuery hook*/
export const useUnitGroupLiveQuery = (ug: UnitGroup) => {
  log.debug(`useUnitGroupLiveQuery: mounting`);
  const bmUnits = ug.units.map((u) => u.bmUnit);
  const query = useUnitsLiveQuery({ bmUnits });

  if (!query.data) {
    return query;
  }

  try {
    const data = p.transformUnitGroupLiveQuery({
      ...query.data,
      now: query.now,
      units: ug.units,
    })
  
    return {
      ...query,
      data
    };
  } catch (e) {
    return {
      ...query,
      data: null,
      isError: true,
    };
  }
};
