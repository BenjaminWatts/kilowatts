import * as t from "./types";
import log from "../services/log";
import * as Updates from 'expo-updates';


export const londonTime = (date: Date) =>
  date.toLocaleString("en-GB", { timeZone: "Europe/London" });

export const londonTimeHHMMSS = (date: Date) =>
  londonTime(date).split(" ")[1];

export const getSettlementPeriod = (
  dateString?: string
): t.ElexonSettlementPeriodParams => {
  const date = londonTime(dateString ? new Date(dateString) : new Date());
  // in DD/MM/YYYY, HH:MM:SS format
  const [day, month, year, hour, minute] = date.split(/[\/\s,:]+/);
  const settlementDate = `${year}-${month}-${day}`;
  const settlementPeriod =
    parseInt(hour) * 2 + (parseInt(minute) >= 30 ? 1 : 0) + 1;
  log.debug(
    `getSettlementPeriod: ${settlementDate}:${settlementPeriod} for ${dateString}`
  );
  return {
    settlementDate,
    settlementPeriod,
  };
};

export const getSettlementDate = (dateString?: string): string => {
  const date = londonTime(dateString ? new Date(dateString) : new Date());
  // in DD/MM/YYYY, HH:MM:SS format
  const [day, month, year, hour, minute] = date.split(/[\/\s,:]+/);
  const settlementDate = `${year}-${month}-${day}`;
  return settlementDate;
};


/*
getCurrentYear
for rendering copyright noticed
  */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/*
ALLOW_LINK_FUELTYPES
These are fuel types for which it is allowed to filter by
*/
export const ALLOW_LINK_FUELTYPES: t.FuelType[] = [
  "wind",
  "hydro",
  "nuclear",
  "biomass",
  "gas",
  "coal",
  "interconnector"
];


/*
getVersion
using expo updates library to get the native and js version
*/
export const getVersion = () => {
  return {
    createdAt: Updates.createdAt
  }
}