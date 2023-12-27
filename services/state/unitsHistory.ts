import { usePnRangeQuery, useAccRangeQuery } from "./api/elexon-insights-api";
import log from "../log";
import {
  UseCurrentRangeParams,
} from "../../common/types";
import * as p from "../../common/parsers";
import { useCurrentRange } from "../hooks";

type UnitHistoryQueryParams = {
  range: UseCurrentRangeParams;
  bmUnits?: string[];
};

export const useUnitHistoryQuery = ({range, bmUnits}: UnitHistoryQueryParams) => {
    const params = {
        ...useCurrentRange(range),
        bmUnits
    };
    
    log.debug(
        `useUnitHistoryQuery: establishing queries with params ${JSON.stringify(
        params
        )}`
    );
    
    const queries = {
        pn: usePnRangeQuery(params),
        acc: useAccRangeQuery(params),
    };
    
    const baseParams = {
        isLoading: queries.pn.isLoading || queries.acc.isLoading,
        refetch: () => {
        log.debug(`useUnitHistoryQuery: refetching`);
            queries.pn.refetch();
            queries.acc.refetch();
        },
        data: null,
        isError: false,
        range: {
            from: new Date(params.from),
            to: new Date(params.to)
        }
    };
    
    if (baseParams.isLoading || !queries.pn.data || !queries.acc.data) {
        return baseParams;
    } else {
        return {
            ...baseParams,
            data: p.combinePnsAndAccs({
                pns: queries.pn.data,
                accs: queries.acc.data
            })
        }
    }
}