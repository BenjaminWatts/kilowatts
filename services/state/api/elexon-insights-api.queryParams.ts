import * as t from "../../../common/types";
import * as p from "../../../common/parsers";

export const queryParams = {
  settlementPeriodToQuery: (p: t.ElexonSettlementPeriodParams) => {
    return `?settlementDate=${p.settlementDate}${
      p.settlementPeriod ? `&settlementPeriod=${p.settlementPeriod}` : ""
    }`;
  },
  bmUnitsToQuery: (bmUnits?: string[]) => {
    if (!bmUnits) return "";
    return bmUnits.map((bmUnit) => `&bmUnit=${bmUnit}`).join("");
  },
  rangeToQuery: (p: t.ElexonRangeParams) => {
    let query = `?from=${p.from}&to=${p.to}`;
    if (p.settlementPeriodFrom)
      query += `&settlementPeriodFrom=${p.settlementPeriodFrom}`;
    if (p.settlementPeriodTo)
      query += `&settlementPeriodTo=${p.settlementPeriodTo}`;
    return query;
  },
};
