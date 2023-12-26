import React from "react";
import log from "../log";

export const roundToClosestHalfHour = (date: Date) => {
  const minutes = date.getMinutes();
  if (minutes < 15) {
    date.setMinutes(0);
  } else if (minutes < 45) {
    date.setMinutes(30);
  } else {
    date.setMinutes(0);
    date.setHours(date.getHours() + 1);
  }
  return date;
};

export const getNowRoundedToClosestHalfHour = () => {
  const now = new Date();
  return roundToClosestHalfHour(now);
};

export const useNearest30Minutes = (updateIntervalSecs: number) => {
  const [nowTime, setNowTime] = React.useState(
    getNowRoundedToClosestHalfHour()
  );
  React.useEffect(() => {
    log.debug(`useNearest30Minutes: mounting`);
    const interval = setInterval(() => {
      log.debug(`useNearest30Minutes: updating nowTime`);
      const newValue = getNowRoundedToClosestHalfHour()
      if (newValue.getTime() !== nowTime.getTime()) {
        setNowTime(newValue);
      }
    }, updateIntervalSecs * 1000);
    return () => {
      log.debug(`useNearest30Minutes: dismounting`);
      clearInterval(interval);
    };
  }, []);
    return nowTime;
};
