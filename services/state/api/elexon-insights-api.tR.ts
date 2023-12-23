import * as t from "../../../common/types";
import * as p from "../../../common/parsers";
import log from "../../log";

export const queries = {
  pnAll: (
    r: t.ElexonInsightsPnResponseRaw
  ): t.ElexonInsightsPnResponseParsed => {
    log.debug(`tr/queries/pnAll: validate response using yup schema`);
    t.elexonInsightsPnResponseRawSchema.validateSync(r, { strict: true });

    log.debug(
      `tr/queries/pnAll: : ${r.data.length} records found.. transformResponse`
    );
    if (r.data.length === 0) {
      throw new Error(`pnAll: not available`);
    }
    let output: t.ElexonInsightsPnResponseParsed = {};
    for (const bmUnit of p.getBmUnits(r.data)) {
      output[bmUnit] = p.intervalRecordToLevelPairs(
        r.data.filter((x) => x.bmUnit === bmUnit)
      );
    }
    log.debug(
      `tr/queries/pnAll: : transformResponse complete for ${
        Object.keys(output).length
      } units`
    );
    return output;
  },
  pnRange: (data: t.ElexonInsightsPnResponseRange) => queries.pnAll({ data }),
  accAll: (
    r: t.ElexonInsightsAcceptancesResponse
  ): t.ElexonInsightsAcceptancesResponseParsed => {
    log.debug(`tr/queries/accAll: validate response using yup schema`);
    
    t.elexonInsightsAcceptancesResponseRawSchema.validateSync(r, { strict: true });

    log.debug(
      `tr/queries/accAll: ${r.data.length} acceptance interval records found.. transformResponse`
    );
    const withLevels = p.parseAcceptancesWithLevels(r.data);
    log.debug(
      `tr/queries/accAll:  ${withLevels.length} individual acceptances found`
    );
    let output: t.ElexonInsightsAcceptancesResponseParsed = {};
    for (const bmUnit of p.getBmUnits(withLevels)) {
      output[bmUnit] = withLevels
        .filter((x) => x.bmUnit === bmUnit)
        .sort((a, b) => a.acceptanceTime.localeCompare(b.acceptanceTime));
    }
    return output;
  },
  accRange: (data: t.ElexonInsightsAcceptancesRangeResponse) =>
    queries.accAll({ data }),
};
