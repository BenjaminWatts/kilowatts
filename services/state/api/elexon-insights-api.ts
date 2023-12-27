import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import * as t from "../../../common/types";
import * as tr from "./elexon-insights-api.tR";
import { queryParams } from "./elexon-insights-api.queryParams";
import { extractRehydrationInfo, isHydrateAction } from "./persist";

const extraOptions = {
  maxRetries: 9999999,
};

export const elexonInsightsApi = createApi({
  reducerPath: "elexonInsightsApi",
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: `https://data.elexon.co.uk/bmrs/api/v1`,
    }),
    extraOptions
  ),
  endpoints: (builder) => ({
    pnSp: builder.query<
      t.ElexonInsightsPnResponseParsed,
      t.ElexonInsightsPnSpParams
    >({
      query: (p) =>
        `/datasets/pn${queryParams.settlementPeriodToQuery(
          p
        )}${queryParams.bmUnitsToQuery(p.bmUnits)}`,
      transformResponse: tr.queries.pnAll,
    }),
    pnRange: builder.query<
      t.ElexonInsightsPnResponseParsed,
      t.ElexonInsightsPnRangeParams
    >({
      query: (p) =>
        `/datasets/pn/stream${queryParams.rangeToQuery(
          p
        )}${queryParams.bmUnitsToQuery(p.bmUnits)}`,
      transformResponse: tr.queries.pnRange,
    }),
    accSp: builder.query<
      t.ElexonInsightsAcceptancesResponseParsed,
      t.ElexonInsightsAcceptancesSpParams
    >({
      query: (p) =>
        `/balancing/acceptances/all${queryParams.settlementPeriodToQuery(
          p
        )}${queryParams.bmUnitsToQuery(p.bmUnits)}`,
      transformResponse: tr.queries.accAll,
    }),
    accRange: builder.query<
      t.ElexonInsightsAcceptancesResponseParsed,
      t.ElexonInsightsAcceptancesRangeParams
    >({
      query: (p) =>
        `/datasets/boalf/stream${queryParams.rangeToQuery(
          p
        )}${queryParams.bmUnitsToQuery(p.bmUnits)}`,
      transformResponse: tr.queries.accRange,
    }),
  }), 
  extractRehydrationInfo: (action) => extractRehydrationInfo(action, "elexonInsightsApi"),
});

export const {
  usePnSpQuery,
  useAccSpQuery,
  usePnRangeQuery,
  useAccRangeQuery,
} = elexonInsightsApi;
