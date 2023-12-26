import log from "../log";
import React from "react";

/* Returns the current time, updated with frequency updateIntervalSecs*/
export const useNowTime = (updateIntervalSecs: number) => {
  const [nowTime, setNowTime] = React.useState(new Date());
  React.useEffect(() => {
    log.debug(`useNowTime: mounting`);
    const interval = setInterval(() => {
      log.debug(`useNowTime: updating nowTime`);
      setNowTime(new Date());
    }, updateIntervalSecs * 1000);
    return () => {
      log.debug(`useNowTime: dismounting`);
      clearInterval(interval);
    };
  }, []);
  return nowTime;
};
