import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import * as t from "../../../common/types";
import * as tr from "./ng-eso-api.tR";
import { extractRehydrationInfo } from "./persist";

const extraOptions = {
  maxRetries: 9999999,
};

export const ngEsoApi = createApi({
  reducerPath: "ngEsoApi",
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: `https://api.nationalgrideso.com/api/3`,
    }),
    extraOptions
  ),
  endpoints: (builder) => ({
    embeddedWindAndSolarForecast: builder.query<
      t.NgEsoEmbeddedWindAndSolarForecastParsedResponse, {}>({
      query: () =>
        `action/datastore_search_sql?sql=SELECT * FROM  "db6c038f-98af-4570-ab60-24d71ebd0ae5" `,
      transformResponse: tr.queries.embeddedWindAndSolarForecast,
    }),
  }),
  extractRehydrationInfo: (action) => extractRehydrationInfo(action, "ngEsoApi"),

});

export const {
  useEmbeddedWindAndSolarForecastQuery,
} = ngEsoApi;
