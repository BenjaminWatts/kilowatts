import { usePnRangeQuery, useAccRangeQuery } from "./api/elexon-insights-api";
import * as p from "../../common/parsers";
import log from "../log";
import {
  LevelPair,
  UnitGroup,
  UseCurrentRangeParams,
} from "../../common/types";
import { useCurrentRange } from "../hooks";

type UnitGroupHistoryQueryParams = {
  range: UseCurrentRangeParams;
  ug: UnitGroup;
};

/* Get the data for a single unit group over the required interval */
export const useUnitGroupHistoryQuery = ({
  ug,
  range,
}: UnitGroupHistoryQueryParams) => {
  const params = {
    ...useCurrentRange(range),
    bmUnits: ug.units.map((u) => u.bmUnit),
  };

  log.debug(
    `useUnitGroupHistoryQuery: establishing queries with params ${JSON.stringify(
      params
    )}`
  );

  const queries = {
    pn: usePnRangeQuery(params),
    acc: useAccRangeQuery(params),
  };

  const baseParams = {
    isLoading: queries.pn.isLoading || queries.acc.isLoading,
    refetch: () => {
      log.debug(`useUnitGroupHistoryQuery: refetching`);
      queries.pn.refetch();
      queries.acc.refetch();
    },
    data: null,
    isError: false,
  };

  if (baseParams.isLoading || !queries.pn.data || !queries.acc.data) {
    return baseParams;
  }

  try {
    const units = p.transformUnitHistoryQuery({
      pns: queries.pn.data,
      accs: queries.acc.data,
      units: ug.units,
    });

    const from = new Date(params.from);
    const to = new Date(params.to);

    const timeseries: { name: string; levels: LevelPair[] }[] = units
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
      ...baseParams,
      data: joined,
    };
  } catch (e: any) {
    log.error(e);
    return {
      ...baseParams,
      data: null,
      isError: true,
    };
  }
};
