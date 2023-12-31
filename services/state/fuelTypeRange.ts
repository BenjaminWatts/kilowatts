import { useState, useEffect, useCallback } from 'react';
import * as p from '../../common/parsers';
import log from '../log';
import { FUEL_TYPE_COLORS, FuelType, UseCurrentRangeParams } from '../../common/types';
import { useUnitHistoryQuery } from './unitsHistory';
import { useEmbeddedWindAndSolarForecastQuery } from './api/ng-eso-api';
import { useNowTime, useRefetchOnAppOrNetworkResume } from '../hooks';
import { useFuelTypeLiveQuery } from './fuelTypeLive';

const POLLING_INTERVAL_SECS = 5;
const EMBEDDED_POLLING_INTERVAL_SECS = 60
const RERENDER_INTERVAL_SECS = 5;

const range: UseCurrentRangeParams = {
  hoursInPast: 0.5,
  hoursInAdvance: 2,
  updateIntervalSecs: 15,
};

const orderChartColors = (orderedFuelTypes: FuelType[]) => 
  FUEL_TYPE_COLORS.filter(color => 
    orderedFuelTypes.includes(color.fuelType)
  );

export const useFuelTypeHistoryQuery = () => {
  const [result, setResult] = useState<any>({
    data: null, isLoading: true, error: null,
  });

  const queries = {
    bm: useUnitHistoryQuery({ range }),
    embedded: useEmbeddedWindAndSolarForecastQuery({}, { pollingInterval: EMBEDDED_POLLING_INTERVAL_SECS * 1000 }),
    now: useNowTime(POLLING_INTERVAL_SECS),
    live: useFuelTypeLiveQuery(POLLING_INTERVAL_SECS),
  };

  const refetch = useCallback(() => {
    log.debug('Refetching fuel type history queries');
    queries.bm.refetch();
    queries.embedded.refetch();
    queries.live.refetch();
  }, []);

  useRefetchOnAppOrNetworkResume({refetch, isLoading: false})

  const update = useCallback(() => {
    {
      log.debug('Updating fuel type history queries');

      if (!queries.bm.data ) {
        log.debug('Waiting for bm data');
        return;
      }

      if (!queries.embedded.data) {
        log.debug('Waiting for embedded data');
        return;
      }

      if (!queries.now) {
        log.debug('Waiting for now time');
        return;
      }

      if (!queries.live.data) {
        log.debug('Waiting for live data');
        return;
      }

      if (!queries.live.orderedFuelTypes) {
        log.debug('Waiting for live ordered fuel types');
        return;
      }
  
      try {
        const data = {
          values: p.transformFuelTypeHistoryQuery({
            range: queries.bm.range,
            bm: queries.bm.data,
            embedded: queries.embedded.data,
            startAt: queries.now,
          }),
          colors: orderChartColors(queries.live.orderedFuelTypes),
        };
        log.info('useFuelTypeHistoryQuery/ setResult');

        setResult({ data, isLoading: false, error: null });
      } catch (e) {
        log.error(e);
        setResult({ data: null, isLoading: false, error: e });
      }
    };
  }, [queries]);

  useEffect(() => {
    log.debug('Starting fuel type history queries');

    refetch();
    update();

    const interval = setInterval(update, RERENDER_INTERVAL_SECS * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    log.debug(`Received new bm data`);
    if(!result.data) update();
  }, [queries.bm.data])

  useEffect(() => {
    log.debug(`Received new embedded data`);
    if(!result.data) update();
  }, [queries.embedded.data])

  useEffect(() => {
    log.debug(`Received new now time`);
    if(!result.data) update();
  }, [queries.now])

  useEffect(() => {
    log.debug(`Received new live data`);
    if(!result.data) update();
  }, [queries.live.data])

  useEffect(() => {
    log.debug(`Received new live ordered fuel types`);
    if(!result.data) update();
  }, [queries.live.orderedFuelTypes])
 
  return result;
};
