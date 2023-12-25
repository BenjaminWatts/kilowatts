import log from "../log";
import React from "react";

/*
useNowTime
updateIntervalSecs: number
*/
export const useNowTime = (updateIntervalSecs: number) => {
  const [nowTime, setNowTime] = React.useState(new Date());
  React.useEffect(() => {
    log.debug(`useUnitGroupLiveQuery: mounting`);
    const interval = setInterval(() => {
      log.debug(`useUnitGroupLiveQuery: updating nowTime`);
      setNowTime(new Date());
    }, updateIntervalSecs * 1000);
    return () => {
      log.debug(`useUnitGroupLiveQuery: dismounting`);
      clearInterval(interval);
    };
  }, []);
  return nowTime;
};
