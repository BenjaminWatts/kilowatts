import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import * as t from "../../common/types";
import * as p from "../../common/parsers";
import * as tr from "./elexon-insights-api.tR";

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
    pnAll: builder.query<
      t.ElexonInsightsPnResponseParsed,
      t.ElexonInsightsPNParams
    >({
      query: (p) =>
        `/datasets/pn?settlementDate=${p.settlementDate}${
          p.settlementPeriod ? `&settlementPeriod=${p.settlementPeriod}` : ""
        }${p.bmUnits ? `&bmUnit=${p.bmUnits.join(",")}` : ""}`,
      transformResponse: tr.queries.pnAll,
    }),

    accAll: builder.query<
      t.ElexonInsightsAcceptancesResponseParsed,
      t.ElexonInsightsPNParams
    >({
      query: (p) =>
        `/balancing/acceptances/all?settlementDate=${p.settlementDate}${
          p.settlementPeriod ? `&settlementPeriod=${p.settlementPeriod}` : ""
        }${p.bmUnits ? `&bmUnit=${p.bmUnits.join(",")}` : ""}`,
      transformResponse: tr.queries.accAll,
    }),
  }),
});

export const { usePnAllQuery, useAccAllQuery } = elexonInsightsApi;
