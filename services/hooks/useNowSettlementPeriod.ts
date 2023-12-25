import { getSettlementPeriod } from "../../common/utils";
import {useNowTime} from "./useNowTime";

/*
useNowSettlementPeriod
*/
export const useNowSettlementPeriod = (updateIntervalSecs: number) => {
  const now = useNowTime(updateIntervalSecs);
  return {
    now,
    settlementPeriod: getSettlementPeriod(now.toISOString()),
  };
};