import React from "react";
import * as p from "../../common/parsers";
import log from "../log";
import {
  FUEL_TYPE_COLORS,
  FuelType,
  FuelTypeColor,
  UseCurrentRangeParams,
} from "../../common/types";
import { useUnitHistoryQuery } from "./unitsHistory";
import { useEmbeddedWindAndSolarForecastQuery } from "./api/ng-eso-api";
import { useNowTime } from "../hooks";
import { useFuelTypeLiveQuery } from "./fuelTypeLive";

const UPDATE_INTERVAL_SECS = 5;

const range: UseCurrentRangeParams = {
  hoursInPast: 0.5,
  hoursInAdvance: 2,
  updateIntervalSecs: 15,
};

const orderChartColors = (orderedFuelTypes: FuelType[]) => {
  const colors: FuelTypeColor[] = [];

  const copiedFuelTypes = [...orderedFuelTypes];
  copiedFuelTypes.reverse();

  for (const fuelType of orderedFuelTypes) {
    colors.push(FUEL_TYPE_COLORS.find((c) => c.fuelType === fuelType)!);
  }

  for (const color of FUEL_TYPE_COLORS) {
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }

  return colors;
};

const computeResult = (queries: any, refetch: any) => {
  console.log(`computeResult`)
  const baseParams = {
    isLoading:
      queries.bm.isLoading ||
      queries.embedded.isLoading ||
      queries.live.isLoading,
    error: null,
    refetch
  };
  if (
    !queries.bm.data ||
    !queries.embedded.data ||
    !queries.live.data ||
    !queries.live.orderedFuelTypes
  ) {
    log.info(`computeResult/!queries.bm.data`)
    return {
      ...baseParams,
      data: null,
    };
  } else {
    try {
      const data = {
        values: p.transformFuelTypeHistoryQuery({
          range: queries.bm.range,
          bm: queries.bm.data,
          embedded: queries.embedded.data,
          startAt: queries.now,
        }),
        colors: orderChartColors(queries.live.orderedFuelTypes),
      }
      log.info(`computeResult/queries.bm.data`)
      return {
        ...baseParams,
        data
      };
    } catch (e: any) {
      log.error(e);
      return {
        ...baseParams,
        data: null,
        error: e,
      };
    }
  }
};

/* Get the data for a single unit group over the required interval */
export const useFuelTypeHistoryQuery = (
  updateIntervalSecs = UPDATE_INTERVAL_SECS
) => {
  log.debug(`useFuelTypeHistoryQuery`)
  const [result, setResult] = React.useState<any>({
    data: null,
    isLoading: true,
    refetch: () => {},
    error: null
  });

  const queries = {
    bm: useUnitHistoryQuery({
      range,
    }),
    embedded: useEmbeddedWindAndSolarForecastQuery(
      {},
      { pollingInterval: UPDATE_INTERVAL_SECS * 1000 }
    ),
    now: useNowTime(updateIntervalSecs),
    live: useFuelTypeLiveQuery(updateIntervalSecs),
  };

  const refetch = React.useCallback(() => {
    log.info(`useFuelTypeHistoryQuery/refetch`)
    queries.bm.refetch();
    queries.embedded.refetch();
    queries.live.refetch();
  }, []);

  React.useEffect(() => {
    log.debug(`useFuelTypeHistoryQuery/useEffect`)
    const update = () => {
      const newResult = computeResult(queries, refetch);
      setResult(newResult);
    };
    refetch();
    update();
    const interval = setInterval(update, UPDATE_INTERVAL_SECS * 1000);
    return () => clearInterval(interval);
  }, []);


  return result;
};
