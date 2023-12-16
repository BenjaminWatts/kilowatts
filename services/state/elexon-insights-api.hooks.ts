import { getSettlementPeriod } from "../../common/utils";
import React from "react";
import { useAccAllQuery, usePnAllQuery } from "./elexon-insights-api";
import * as p from "../../common/parsers";
import log from "../log";
import { AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { UnitGroup } from "../../common/types";

export const UPDATE_INTERVAL_LIVE_GENERATION_SECS = 1;
export const POLLING_INTERVAL_ACCS_SECS = 15;
export const MAX_RETRIES = 99999999;

export const useUnitGroupsLiveQuery = () => {
  const [nowTime, setNowTime] = React.useState(new Date());

  const pns = usePnAllQuery(getSettlementPeriod(nowTime.toISOString()));
  const accs = useAccAllQuery(getSettlementPeriod(nowTime.toISOString()), {
    pollingInterval: POLLING_INTERVAL_ACCS_SECS * 1000,
  });

  const refetch = () => {
    pns.refetch();
    accs.refetch();
  };

  React.useEffect(() => {
    log.debug(`useGenerationLiveQuery: mounting`);

    const interval = setInterval(() => {
      log.debug(`useGenerationLiveQuery: updating nowTime`);
      setNowTime(new Date());
    }, UPDATE_INTERVAL_LIVE_GENERATION_SECS * 1000);
    return () => {
      log.debug(`useGenerationLiveQuery: dismounting`);
      clearInterval(interval);
    };
  }, []);

  // retry on app resume
  React.useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          log.debug(
            `useGenerationLiveQuery: appStateListener: active -- refetching`
          );
          refetch();
        }
      }
    );
    return () => {
      appStateListener.remove();
    };
  }, []);
  // retry if intermet restored

  React.useEffect(() => {
    const netInfoListener = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        log.debug(`useGenerationLiveQuery: netInfoListener: connected`);
        refetch();
      }
    });
    return () => {
      netInfoListener();
    };
  });

  if (!pns.data || !accs.data) {
    return {
      isLoading: pns.isLoading || accs.isLoading,
      refetch,
    };
  }

  try {
    log.debug(`useGenerationLiveQuery: combining pns and accs`);
    const combined = p.combinePnsAndAccs({
      pns: pns.data,
      accs: accs.data,
    });

    log.debug(`useGenerationLiveQuery: interpolating bmUnitLevelPairs `);

    const units = p.interpolateBmUnitLevelPairs({
      bmUnitLevelPairs: combined,
      time: nowTime.toISOString(),
      omitZero: true,
    });

    const unitGroups = p.groupByUnitGroup(units);

    return {
      updated: (pns.data && accs.data) && nowTime,
      isLoading: pns.isLoading,
      refetch,
      data: unitGroups.sort((a, b) => b.level - a.level),
    };
  } catch (e) {
    log.debug(`useGenerationLiveQuery: caught error: ${e}`);
    return {
      isLoading: pns.isLoading,
      refetch,
    };
  }
};

export const useFuelTypesLiveQuery = () => {
  log.debug(`useFuelTypeLiveQuery: mounting`);
  const unitGroups = useUnitGroupsLiveQuery();
  if (!unitGroups.data) {
    log.debug(`useFuelTypeLiveQuery: no data`);
    return unitGroups;
  } else {
    log.debug(`useFuelTypeLiveQuery: transforming to group by fuel type`);
    return {
      ...unitGroups,
      data: p.groupByFuelTypeAndInterconnectors(unitGroups.data),
    };
  }
};

type UseUnitGroupLiveQueryParams = {
  unitGroup: UnitGroup;
};

export const useUnitGroupLiveQuery = ({
  unitGroup,
}: UseUnitGroupLiveQueryParams) => {
  log.debug(`useUnitGroupLiveQuery: mounting`);

  const [nowTime, setNowTime] = React.useState(new Date());

  const params = {
    ...getSettlementPeriod(nowTime.toISOString()),
    bmUnitIds: unitGroup.units.map((u) => u.bmUnit),
  };

  const pns = usePnAllQuery(params);
  const accs = useAccAllQuery(params, {
    pollingInterval: POLLING_INTERVAL_ACCS_SECS * 1000,
  });

  const refetch = () => {
    pns.refetch();
    accs.refetch();
  };

  React.useEffect(() => {
    log.debug(`useUnitGroupLiveQuery: mounting`);

    const interval = setInterval(() => {
      log.debug(`useGenerationLiveQuery: updating nowTime`);
      setNowTime(new Date());
    }, UPDATE_INTERVAL_LIVE_GENERATION_SECS * 1000);
    return () => {
      log.debug(`useUnitGroupLiveQuery: dismounting`);
      clearInterval(interval);
    };
  }, []);

  // retry on app resume
  React.useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          log.debug(
            `useUnitGroupLiveQuery: appStateListener: active -- refetching`
          );
          refetch();
        }
      }
    );
    return () => {
      appStateListener.remove();
    };
  }, []);
  // retry if intermet restored

  React.useEffect(() => {
    const netInfoListener = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        log.debug(`useUnitGroupLiveQuery: netInfoListener: connected`);
        refetch();
      }
    });
    return () => {
      netInfoListener();
    };
  });

  if (!pns.data || !accs.data) {
    return {
      isLoading: pns.isLoading || accs.isLoading,
      refetch,
    };
  }

  try {
    log.debug(`useUnitGroupLiveQuery: combining pns and accs`);
    const combined = p.combinePnsAndAccs({
      pns: pns.data,
      accs: accs.data,
    });

    log.debug(`useUnitGroupLiveQuery: interpolating bmUnitLevelPairs `);

    const units = p.interpolateBmUnitLevelPairs({
      bmUnitLevelPairs: combined,
      time: nowTime.toISOString(),
      omitZero: true,
    });

    const unitGroups = p.groupByUnitGroup(units);
    const unitGroup = unitGroups[0];

    return {
      updated: ( pns.data && accs.data) && nowTime,
      isLoading: pns.isLoading,
      refetch,
      data: unitGroup
    };
  } catch (e) {
    log.debug(`useUnitGroupLiveQuery: caught error: ${e}`);
    return {
      isLoading: pns.isLoading,
      refetch,
    };
  }
};
