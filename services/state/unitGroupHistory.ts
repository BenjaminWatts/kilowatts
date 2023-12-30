import * as p from "../../common/parsers";
import log from "../log";
import {
  LevelPairDelta,
  UnitGroup,
  UseCurrentRangeParams,
} from "../../common/types";
import { useUnitHistoryQuery } from "./unitsHistory";

type UnitGroupHistoryQueryParams = {
  range: UseCurrentRangeParams;
  ug: UnitGroup;
};

/* Get the data for a single unit group over the required interval */
export const useUnitGroupHistoryQuery = ({
  ug,
  range,
}: UnitGroupHistoryQueryParams) => {
  const query = useUnitHistoryQuery({
    range,
    bmUnits: ug.units.map((u) => u.bmUnit),
  });

  if (!query.data) {
    return query;
  }

  try {
    const units = p.transformUnitHistoryQuery({
      data: query.data,
      units: ug.units,
    });

    const { from, to } = query.range;

    const timeseries: { name: string; levels: LevelPairDelta[] }[] = units
      .filter((u) => u.data.levels.length !== 0)
      .map((u) => {
        return {
          levels: p.createRegularTimeseries({
            from,
            to,
            levels: u.data.levels,
          }),
          name: u.details.bmUnit,
        };
      });

    const joined = p.joinRegularTimeseries({
      from,
      to,
      timeseries,
    });

    return {
      ...query,
      data: joined,
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
