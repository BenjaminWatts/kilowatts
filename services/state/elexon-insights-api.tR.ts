import * as t from "../../common/types";
import * as p from "../../common/parsers";
import log from "../log";

export const queries = {
  pnAll: (
    r: t.ElexonInsightsPnResponseRaw
  ): t.ElexonInsightsPnResponseParsed => {
    log.debug(`pnAll: ${r.data.length} records found.. transformResponse`);
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
      `pnAll: transformResponse complete for ${
        Object.keys(output).length
      } units`
    );
    return output;
  },
  accAll: (
    r: t.ElexonInsightsAcceptancesResponse
  ): t.ElexonInsightsAcceptancesResponseParsed => {
    log.info(`accAll: ${r.data.length} acceptance interval records found.. transformResponse`);
    const withLevels = p.parseAcceptancesWithLevels(r.data);
    log.debug(`accAll: ${withLevels.length} individual acceptances found`);
    let output: t.ElexonInsightsAcceptancesResponseParsed = {};
    for (const bmUnit of p.getBmUnits(withLevels)) {
      output[bmUnit] = withLevels
        .filter((x) => x.bmUnit === bmUnit)
        .sort((a, b) => a.acceptanceTime.localeCompare(b.acceptanceTime));
    }
    return output;
  },
};
