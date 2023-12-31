import log from "../log";
import {
  UnitGroup,
  UseCurrentRangeParams,
} from "../../common/types";
import { useUnitHistoryQuery } from "./unitsHistory";
import { interpolateLevelPair } from "../../common/parsers";

type UnitGroupHistoryQueryParams = {
  range: UseCurrentRangeParams;
  bmUnits: string[];
};

/* Get the data for a single unit group over the required interval */
export const useUnitGroupHistoryQuery = ({
  bmUnits,
  range,
}: UnitGroupHistoryQueryParams) => {
  const query = useUnitHistoryQuery({
    range,
    bmUnits
  });

  if (!query.data) {
    return query;
  }

  try {
    const units = query.data;
    const times = new Set<string>();

    // get all times
    Object.values(units).forEach((us) => {
      for (const u of us) {
        times.add(u.time);
      }
    });

    const firstTime = new Date(Array.from(times).sort()[0])
    const lastTime = new Date(Array.from(times).sort().reverse()[0])

    const bmUnits = Object.keys(units);

    let output: any[] = [];

    // iterate through each minute from firstTime to lastTime
    let time = firstTime;
    while (time <= lastTime) {
      const iso = time.toISOString();

      let timeDict: any = { time: Number(time), total: 0 };

      for (const bmUnit of bmUnits) {
        const match = units[bmUnit].find((u) => u.time === iso);
        if (match) {
          timeDict[bmUnit] = match.level;
          timeDict.total += match.level;
        } else {
          const {level} = interpolateLevelPair(iso, units[bmUnit]);
          timeDict[bmUnit] = level;
          timeDict.total += level;
        }
      }

      output.push(timeDict);
      time = new Date(time.getTime() + 60000);
    }

    

    return {
      ...query,
      data: output,
    };
  } catch (e: any) {
    log.error(e);
    return {
      ...query,
      data: null,
      isError: true,
    };
  }
};
