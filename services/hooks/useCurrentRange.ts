import { ElexonRangeParams } from "../../common/types";
import { useNearest30Minutes } from "./useNearest30Minutes";

type UseCurrentRangeParams = {
  hoursInAdvance: number;
  hoursInPast: number;
};


export const calculate = {
  hoursInAdvance: (now: Date, hoursInAdvance: number) => {
    const to = new Date(now);
    to.setHours(to.getHours() + hoursInAdvance);
    return to
  },
  hoursInPast: (now: Date, hoursInPast: number) => {
    const from = new Date(now);
    from.setHours(from.getHours() - hoursInPast);
    return from
  },
};

/*
useCurrentRange
given a number of hours in advance and in past, return a from, to range
*/
export const useCurrentRange = ({
  hoursInAdvance,
  hoursInPast,
}: UseCurrentRangeParams): ElexonRangeParams => {
  const now = useNearest30Minutes(1);

  return {
    from: calculate.hoursInPast(now, hoursInPast).toISOString(),
    to: calculate.hoursInAdvance(now, hoursInAdvance).toISOString(),
  };
};
