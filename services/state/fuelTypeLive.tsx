import {groupByFuelTypeAndInterconnectors, combineFuelTypesAndEmbedded} from "../../common/parsers";
import log from "../log";
import { useEmbeddedWindAndSolarForecastQuery } from "./api/ng-eso-api";
import { useUnitGroupsLiveQuery } from "./api/elexon-insights-api.hooks";
import * as t from "../../common/types";

export const UPDATE_INTERVAL_LIVE_GENERATION_SECS = 1;
export const POLLING_INTERVAL_ACCS_SECS = 15;
export const POLLING_INTERVAL_EMBEDDED_SECS = 60;

export const MAX_RETRIES = 99999999;

/*Get the latest data for output in each fuel type category*/
export const useFuelTypeLiveQuery = (): t.FuelTypeLiveHookResult => {

  const queries = {
    bm: useUnitGroupsLiveQuery(),
    embedded: useEmbeddedWindAndSolarForecastQuery(
      {},
      { pollingInterval: POLLING_INTERVAL_EMBEDDED_SECS * 1000 }
    ),
  };

  // extract results from queries

  const completeness = {
    bm: queries.bm.data ? true : false,
    embedded: queries.embedded.data ? true : false,
  };

  const refetch = () => {
    log.info(`useFuelTypeLiveQuery: refetching`);
    queries.bm.refetch();
    queries.embedded.refetch();
  };

  const isLoading =
    queries.bm.isLoading === true || queries.embedded.isLoading === true;

  // return early if we don't have any data for bm, which is fatal

  if (!queries.bm.data) {
    log.info(
      `useFuelTypeLiveQuery: without bm data cannot render anything meaningful`
    );
    return {
      isLoading,
      completeness,
      refetch,
      data: null,
    } as t.FuelTypeLiveHookResultLoading;
  }

  try {
  if (queries.embedded.data) {
    log.debug(
      `useFuelTypeLiveQuery: happy path: all data interpolating embedded wind and solar`
    );
    return {
      completeness,
      isLoading,
      refetch,
      now: queries.bm.now,
      error: undefined,
      data: combineFuelTypesAndEmbedded({
        now: queries.bm.now,
        data: {
          bm: queries.bm.data,
          embedded: queries.embedded.data,
        },
        includeEmbedded: false,
      }),
    } as t.FuelTypeLiveHookResultSuccess;
  } else {
    log.debug(
      `useFuelTypeLiveQuery: no embedded data but returning partial response`
    );
    return {
      refetch,
      completeness,
      isLoading,
      data: groupByFuelTypeAndInterconnectors({
        x: queries.bm.data,
        includeEmbedded: true,
      }),
    } as t.FuelTypeLiveHookResultSuccess;
  }

  } catch (error: any) {
    log.error(error);
    return {
      isLoading,
      completeness,
      refetch,
      error,
      data: null,
    } as t.FuelTypeLiveHookResultError;
  }
};
