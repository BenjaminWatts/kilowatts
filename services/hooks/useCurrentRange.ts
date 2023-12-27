import { ElexonRangeParams, UseCurrentRangeParams } from "../../common/types";
import { useNearest30Minutes } from "./useNearest30Minutes";




export const calculate = {
  hoursInAdvance: (now: Date, hoursInAdvance: number) => {
    const to = new Date(now);
    const minutesToAdd = hoursInAdvance * 60;
    return new Date(Number(to) + minutesToAdd * 60 * 1000)
  },
  hoursInPast: (now: Date, hoursInPast: number) => {
    const from = new Date(now);
    const minutestoSubtract = hoursInPast * 60;
    return new Date(Number(from) - minutestoSubtract * 60 * 1000)
  },
};

/*
useCurrentRange
given a number of hours in advance and in past, return a from, to range
*/
export const useCurrentRange = ({
  hoursInAdvance,
  hoursInPast,
  updateIntervalSecs
}: UseCurrentRangeParams): ElexonRangeParams => {
  const now = useNearest30Minutes(updateIntervalSecs);
  return {
    from: calculate.hoursInPast(now, hoursInPast).toISOString(),
    to: calculate.hoursInAdvance(now, hoursInAdvance).toISOString(),
  };
};
