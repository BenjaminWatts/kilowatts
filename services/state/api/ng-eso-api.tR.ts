import * as t from "../../../common/types";
import log from "../../log";

export const queries = {
  embeddedWindAndSolarForecast: (
    r: t.NgEsoEmbeddedWindAndSolarForecastRawResponse
  ): t.NgEsoEmbeddedWindAndSolarForecastParsedResponse => {
    log.debug(
      "ngEsoApi.queries.embeddedWindAndSolarForecast: validating response using yup"
    );
    t.ngEsoEmbeddedWindAndSolarForecastRawResponse.validateSync(r, {
      strict: true,
    });
    log.debug(
      `ngEsoApi.queries.embeddedWindAndSolarForecast: ${r.result.records.length} records found.. transformResponse`
    );
    const output: t.NgEsoEmbeddedWindAndSolarForecastParsedResponse = [];
    for (const record of r.result.records) {
      const { DATE_GMT, TIME_GMT } = record;
      // truncate 2023-12-21T00:00:00 to 2023-12-21
      const date = new Date(DATE_GMT).toISOString().split("T")[0];
      // looking at the api responses it is clear that TIME_GMT is the end of the settlement period
      const settlementPeriodEnding = new Date(Date.parse(`${date}T${TIME_GMT}Z`))
      const settlementPeriodStarting = new Date(settlementPeriodEnding.getTime() - 30 * 60 * 1000)
      const time = settlementPeriodStarting.toISOString()
      output.push({
        time,
        wind: {
          level: record.EMBEDDED_WIND_FORECAST,
          capacity: record.EMBEDDED_WIND_CAPACITY,
        },
        solar: {
          level: record.EMBEDDED_SOLAR_FORECAST,
          capacity: record.EMBEDDED_SOLAR_CAPACITY,
        },
      });
    }
    return output
  },
};
