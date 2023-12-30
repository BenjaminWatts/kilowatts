import log from "../log";
import React from "react";

/* get the starting time, rounded to the nearest second */
const getStartingTime = () => {
  const now = new Date();
  now.setMilliseconds(0);
  return now;
};

/* Returns the current time, updated with frequency updateIntervalSecs. round to the nearest second*/
export const useNowTime = (updateIntervalSecs: number) => {
  const [nowTime, setNowTime] = React.useState(getStartingTime());
  React.useEffect(() => {
    log.debug(`useNowTime: mounting`);
    const interval = setInterval(() => {
      log.debug(`useNowTime: updating nowTime`);
      setNowTime(getStartingTime());
    }, updateIntervalSecs * 1000);
    return () => {
      log.debug(`useNowTime: dismounting`);
      clearInterval(interval);
    };
  }, []);
  return nowTime;
};
