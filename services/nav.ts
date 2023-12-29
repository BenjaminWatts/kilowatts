import { unitGroupsDict } from "../assets/data/units";
import { FuelType, UnitGroup, UnitGroupLevel } from "../common/types";
import { interconnectors } from "../assets/data/interconnectors";
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
    if(ug) return ug
    log.debug(`try interconnectors`)
    const interconnector = interconnectors.find(i => i.details.code === code.toUpperCase())
    if(interconnector) return interconnector
    log.debug(`no unit group found`)
    return undefined
  },
};


/* from a unit group, get the url for its details page, if navigation should not be permitted return null */
export const getUnitGroupUrl = ({ code, fuelType }: {code?: string, fuelType: FuelType}): string | null => {
  if (code && fuelType !== "interconnector") {
    return urls.unitGroup(code);
  }
  return null;
};