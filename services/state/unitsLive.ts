import { useAccSpQuery, usePnSpQuery } from "./api/elexon-insights-api";

import log from "../log";
import {
  useNowSettlementPeriod,
  useRefetchOnAppOrNetworkResume,
} from "../hooks";

export const UPDATE_INTERVAL_SECS = 60;
export const POLLING_ACCEPTANCE_INTERVAL_ACCS_SECS = 15;

type UseUnitsLiveQueryParams = {
  bmUnits?: string[];
};

/* track PN and BOALF (acceptance) data for either all units (or a defined subset of units) */
export const useUnitsLiveQuery = ({ bmUnits }: UseUnitsLiveQueryParams) => {
  const { settlementPeriod, now } = useNowSettlementPeriod(
    UPDATE_INTERVAL_SECS
  );
  const queryParams = {
    ...settlementPeriod,
    bmUnits,
  };
  const pns = usePnSpQuery(queryParams);
  const accs = useAccSpQuery(queryParams, {
    pollingInterval: POLLING_ACCEPTANCE_INTERVAL_ACCS_SECS * 1000,
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
