import {
  useAccSpQuery,
  usePnSpQuery,
  usePnRangeQuery,
  useAccRangeQuery,
} from "./elexon-insights-api";
import * as p from "../../../common/parsers";
import log from "../../log";
import { UnitGroup } from "../../../common/types";
import {
  useNowSettlementPeriod,
  useNowTime,
  useRecentHistoryElexonRange,
  useRefetchOnAppOrNetworkResume,
} from "../../hooks";
import { useEmbeddedWindAndSolarForecastQuery } from "./ng-eso-api";

export const UPDATE_INTERVAL_LIVE_GENERATION_SECS = 1;
export const POLLING_INTERVAL_ACCS_SECS = 15;
export const MAX_RETRIES = 99999999;

type UseBmUnitsLiveQueryParams = {
  bmUnits?: string[];
};
export const useBmUnitsLiveQuery = ({ bmUnits }: UseBmUnitsLiveQueryParams) => {
  const { settlementPeriod, now } = useNowSettlementPeriod(
    UPDATE_INTERVAL_LIVE_GENERATION_SECS
  );
  const queryParams = {
    ...settlementPeriod,
    bmUnits,
  };
  const pns = usePnSpQuery(queryParams);
  const accs = useAccSpQuery(queryParams, {
    pollingInterval: POLLING_INTERVAL_ACCS_SECS * 1000,
  });

  const baseParams = {
    now,
    refetch: () => {
      log.debug(`useUnitGroupLiveQuery: refetching`);
      pns.refetch();
      accs.refetch();
    },
    isLoading: pns.isLoading || accs.isLoading,
    data: null,
    isError: false,
  };

  useRefetchOnAppOrNetworkResume(baseParams);

  if (baseParams.isLoading || !pns.data || !accs.data) {
    return baseParams;
  } else {
    return {
      ...baseParams,
      data: {
        pns: pns.data,
        accs: accs.data,
      },
      now,
    };
  }
};

export const useUnitGroupsLiveQuery = () => {
  const query = useBmUnitsLiveQuery({
    bmUnits: undefined,
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

/*
useFuelTypeLiveQuery
Get the latest data for output in each fuel type category
*/
export const useFuelTypeLiveQuery = () => {
  log.debug(`useFuelTypeLiveQuery: mounting`);
  const queries = {
    fuelTypes: useUnitGroupsLiveQuery(),
    embedded: useEmbeddedWindAndSolarForecastQuery({}),
  };
  if (!queries.fuelTypes.data) {
    // we allow the embedded query to fail
    log.debug(`useFuelTypeLiveQuery: no data`);
    return {
      ...queries.fuelTypes,
      data: null,
    };
  } else {
    log.debug(`useFuelTypeLiveQuery: transforming to group by fuel type`);
    try {
      if (queries.embedded.data) {
        log.debug(
          `useFuelTypeLiveQuery: interpolating embedded wind and solar`
        );
        const fuelTypes = p.groupByFuelTypeAndInterconnectors({
          x: queries.fuelTypes.data,
          includeEmbedded: false,
        });
        const embedded = p.interpolateCurrentEmbeddedWindAndSolar(
          queries.fuelTypes.now.toISOString(),
          queries.embedded.data
        );
        return {
          ...queries.fuelTypes,
          data: p.combineFuelTypesAndEmbedded(fuelTypes, embedded),
        };
      } else {
        log.debug(`useFuelTypeLiveQuery: no embedded data`);
        return {
          ...queries.fuelTypes,
          data: p.groupByFuelTypeAndInterconnectors({
            x: queries.fuelTypes.data,
            includeEmbedded: true,
          }),
        };
      }
    } catch (e: any) {
      log.error(e);
      return {
        ...queries.fuelTypes,
        data: null,
        isError: true,
      };
    }
  }
};

/*
useUnitGroupLiveQuery
Get the latest data for a single unit grou
*/
export const useUnitGroupLiveQuery = (ug: UnitGroup) => {
  log.debug(`useUnitGroupLiveQuery: mounting`);
  const bmUnits = ug.units.map((u) => u.bmUnit);
  const query = useBmUnitsLiveQuery({ bmUnits });

  if (!query.data) {
    return query;
  }

  try {
    return {
      ...query,
      data: p.transformUnitGroupLiveQuery({
        ...query.data,
        now: query.now,
        units: ug.units,
      }),
    };
  } catch (e) {
    return {
      ...query,
      data: null,
      isError: true,
    };
  }
};

/*
useUnitGroupHistoryQuery
Get the data for a single unit group, going back over the last 24 hours
*/
export const useUnitGroupHistoryQuery = (ug: UnitGroup) => {
  const twentyFourHoursAgo = new Date(Date.now() - 86400000);

  const bmUnits = ug.units.map((u) => u.bmUnit);
  log.debug(
    `useUnitGroupHistoryQuery: mounting,, will track ${
      bmUnits.length
    } bmUnits: ${bmUnits.join(", ")}`
  );

  const params = {
    ...useRecentHistoryElexonRange(),
    bmUnits,
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

  useRefetchOnAppOrNetworkResume(baseParams);

  if (baseParams.isLoading || !queries.pn.data || !queries.acc.data) {
    return baseParams;
  }

  try {
    return {
      ...baseParams,
      data: p.transformUnitHistoryQuery({
        pns: queries.pn.data,
        accs: queries.acc.data,
        truncateBefore: twentyFourHoursAgo,
        units: ug.units,
      }),
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

/*
useUnitGroupScheduleQuery
takes the output from transformUnitHistoryQuery
1. returns the most recent level for each unit plus all those in the future. 
2. it always returns the last value, but will omit any repeating values
*/
export const useUnitGroupScheduleQuery = (ug: UnitGroup) => {
  const now = useNowTime(60);
  const query = useUnitGroupHistoryQuery(ug);
  if (!query.data) {
    return query;
  } else {
    {
      try {
        return {
          ...query,
          data: p.filterUnitGroupScheduleQuery(now, query.data),
        };
      } catch (e: any) {
        log.error(e);
        return {
          ...query,
          data: null,
          isError: true,
        };
      }
    }
  }
};
