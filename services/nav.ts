import { unitGroupsDict } from "../assets/data/units";
import { FuelType, UnitGroup } from "../common/types";
import log from "../services/log";

type Urls = Record<string, (code: string) => any> | any;

export const urls: Urls = {
  home: "/",
  unitGroups: '/unit-group',
  privacy: '/privacy',
  fuelType: (fuelType: FuelType) => `/fuel-type/${String(fuelType).toLowerCase()}`,
  unitGroup: (code: string) => `/unit-group/${code.toLowerCase()}`,
  unitGroupSchedule: (code: string) => `/unit-group/${code.toLowerCase()}/schedule`,
  elexonLicense: "https://www.elexon.co.uk/data/balancing-mechanism-reporting-agent/copyright-licence-bmrs-data/",
  githubRepo: 'https://github.com/benjaminWatts/kilowatts'
};

export const lookups = {
  unitGroup: (code: string): UnitGroup | undefined => {
    log.debug(`Looking up unit group for code: ${code}`)
    const ug = unitGroupsDict[code.toUpperCase()];
    log.debug(`Found unit group: ${ug}`)
    return ug ? ug : undefined;
  },
};
