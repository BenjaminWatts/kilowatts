import { object, string, number, date, InferType, array, boolean } from "yup";

// Elexon Insights API

// reusable params

export type ElexonSettlementPeriodParams = {
  settlementDate: string;
  settlementPeriod: number;
};

export type ElexonRangeParams = {
  from: string; // a Date iso string in format YYYY-MM-DD
  to: string; // a Date iso string in format YYYY-MM-DD
  settlementPeriodFrom?: number;
  settlementPeriodTo?: number;
};

export const elexonInsightsPNDataRecordSchema = object({
  dataset: string().required().equals(["PN"]),
  settlementDate: string().required(),
  settlementPeriod: number().required(),
  timeFrom: string().required(),
  timeTo: string().required(),
  levelFrom: number().required(),
  levelTo: number().required(),
  nationalGridBmUnit: string().required(),
  bmUnit: string().nullable(),
});

export type ElexonInsightsPNDataRecord = InferType<
  typeof elexonInsightsPNDataRecordSchema
>;

type OptionalBmUnitParams = {
  bmUnits?: string[];
};

export type ElexonInsightsPnSpParams = ElexonSettlementPeriodParams &
  OptionalBmUnitParams;

export type ElexonInsightsPnRangeParams = ElexonRangeParams &
  OptionalBmUnitParams;

export type ElexonInsightsPnResponseRaw = {
  data: ElexonInsightsPNDataRecord[];
};

export const elexonInsightsPnResponseRawSchema = object({
  data: array(elexonInsightsPNDataRecordSchema).required(),
});

export type ElexonInsightsPnResponseRange = ElexonInsightsPNDataRecord[];

export type BmUnitId = string;
export type DateString = string;
export type LevelDelta = {level: number, delta: number};
export type LevelDict = Record<DateString, number>;
export type LevelPair = { time: string; level: number };
export type LevelPairDelta = LevelPair & {  delta: number };
export type BmUnitValues = Record<BmUnitId, LevelDelta>;
export type BmUnitLevelPairs = Record<BmUnitId, LevelPairDelta[]>;

export type ElexonInsightsPnResponseParsed = BmUnitLevelPairs;

// export type ElexonInsightsAcceptancesDataRecord = {
//     settlementDate: string;
//     setttlementPeriodFrom: number;
//     setttlementPeriodTo: number;
//     timeFrom: string;
//     timeTo: string;
//     levelFrom: number;
//     levelTo: number;
//     nationalGridBmUnit: string;
//     bmUnit: string;
//     acceptanceNumber: number;
//     acceptanceTime: string;
//     deemedBoFlag: boolean;
//     soFlag: boolean;
//     storFlag: boolean;
//     rrFlag: boolean;
// }

const elexonInsightsAcceptancesDataRecordSchema = object({
  settlementDate: string().required(),
  settlementPeriodFrom: number().required(),
  settlementPeriodTo: number().required(),
  timeFrom: string().required(),
  timeTo: string().required(),
  levelFrom: number().required(),
  levelTo: number().required(),
  nationalGridBmUnit: string().required(),
  bmUnit: string().nullable(),
  acceptanceNumber: number().required(),
  acceptanceTime: string().required(),
  deemedBoFlag: boolean().required(),
  soFlag: boolean().required(),
  storFlag: boolean().required(),
  rrFlag: boolean().required(),
});
export type ElexonInsightsAcceptancesDataRecord = InferType<
  typeof elexonInsightsAcceptancesDataRecordSchema
>;

export type ElexonInsightsAcceptancesSpParams = ElexonInsightsPnSpParams;
export type ElexonInsightsAcceptancesRangeParams = ElexonRangeParams &
  OptionalBmUnitParams;

export const elexonInsightsAcceptancesResponseRawSchema = object({
  data: array(elexonInsightsAcceptancesDataRecordSchema).required(),
});

export type ElexonInsightsAcceptancesResponse = InferType<
  typeof elexonInsightsAcceptancesResponseRawSchema
>;

export type ElexonInsightsAcceptancesRangeResponse =
  ElexonInsightsAcceptancesDataRecord[];

export type ElexonInsightsAcceptancesParsedNoLevels = {
  bmUnit: string;
  acceptanceNumber: number;
  acceptanceTime: string;
  deemedBoFlag: boolean;
  soFlag: boolean;
  storFlag: boolean;
  rrFlag: boolean;
};

export type ElexonInsightsAcceptancesParsed =
  ElexonInsightsAcceptancesParsedNoLevels & {
    levels: LevelPairDelta[];
  };

export type ElexonInsightsAcceptancesResponseParsed = Record<
  BmUnitId,
  ElexonInsightsAcceptancesParsed[]
>;

export type FuelType =
  | "gas"
  | "coal"
  | "nuclear"
  | "wind"
  | "hydro"
  | "biomass"
  | "solar"
  | "oil"
  | "interconnector"
  | "unknown"
  | "battery";

export const FUEL_TYPE_NAMES: FuelType[] = [
  "gas",
  "coal",
  "nuclear",
  "wind",
  "solar",
  "hydro",
  "biomass",
  "oil",
  "interconnector",
  "unknown",
  "battery",
]

type FuelTypeColor = {
  fuelType: FuelType;
  color: string;
}

export const FUEL_TYPE_COLORS: FuelTypeColor[] = [
  { fuelType: "gas", color: "brown" },     // Natural Gas (Bad Orange)
  { fuelType: "coal", color: "black" },      // Coal (Least Friendly)
  { fuelType: "nuclear", color: "#3399CC" },   // Nuclear (Clean)
  { fuelType: "wind", color: "#8CD19D" },      // Wind (Clean)
  { fuelType: "solar", color: "#FFD700" },     // Solar (Cleanest Yellow)
  { fuelType: "hydro", color: "#009688" },     // Hydro (Clean)
  { fuelType: "biomass", color: "#A2D872" },   // Biomass (Moderate Green)
  { fuelType: "oil", color: "#CC0000" },       // Oil (Least Friendly)
  { fuelType: "interconnector", color: "#993333" },  // Interconnector (Moderate)
  { fuelType: "unknown", color: "#A9A9A9" },   // Unknown (Gray)
  { fuelType: "battery", color: "#800080" },   // Battery (Orange)
]

export const getFuelTypeColor = (fuelType: FuelType) => {
  const color = FUEL_TYPE_COLORS.find(ftc => ftc.fuelType === fuelType)?.color;
  if (color) {
    return color;
  } else {
    return "#000000";
  }
}

export type UnitGroupUnit = {
  bmUnit: string;
  name?: string;
};

export type UnitGroupDetails = {
  code: string;
  name: string; // Pembroke
  coords?: {
    lat: number;
    lng: number;
  };
  fuelType: FuelType;
};

export type UnitGroup = {
  details: UnitGroupDetails;
  units: UnitGroupUnit[];
};

export type UnitGroupUnitLevel = {
  unit: UnitGroupUnit;
  level: number;
  delta: number;
};

export type UnitGroupLevel = {
  details: UnitGroupDetails;
  units: UnitGroupUnitLevel[];
  delta: number;
  level: number;
};

export type FuelTypeLevel = {
  name: FuelType;
  level: number;
  delta: number;
  unitGroupLevels: UnitGroupLevel[];
};

export type UnitGroupsDict = Record<string, UnitGroup>;

export type BmUnitLevelValue = {
  id: string;
  level: number;
  delta: number;
};

/// NG ESO API

export const ngEsoEmbeddedWindAndSolarForecastRawResponse = object({
  success: boolean().required().equals([true]),
  result: object({
    records: array(
      object({
        DATE_GMT: string().required(), // gives the date at midnight
        EMBEDDED_WIND_FORECAST: number().required(),
        EMBEDDED_WIND_CAPACITY: number().required(),
        TIME_GMT: string().required(),
        // _full_text: string().required(),
        SETTLEMENT_PERIOD: number().required(),
        SETTLEMENT_DATE: string().required(),
        EMBEDDED_SOLAR_FORECAST: number().required(),
        _id: number().required(),
        EMBEDDED_SOLAR_CAPACITY: number().required(),
      })
    ).required(),
  }).required(),
});

export type NgEsoEmbeddedWindAndSolarForecastRawResponse = InferType<
  typeof ngEsoEmbeddedWindAndSolarForecastRawResponse
>;

type EmbeddedForecastValue = {
    level: number;
    capacity: number;
}

export type NgEsoEmbeddedWindAndSolarForecastParsedResponse = {
    time: string;
    wind:EmbeddedForecastValue
    solar:EmbeddedForecastValue
}[]


// hooks
export type FuelTypeLiveCompleteness = {
  bm: boolean;
  embedded: boolean;
}

export type FuelTypeLiveHookResultLoading = {
  now: null
  isLoading: true;
  error: undefined;
  refetch: () => void;
  data: null;
  completeness: FuelTypeLiveCompleteness
}

export type FuelTypeLiveHookResultError = {
  now: null;
  isLoading: boolean;
  error: Error
  refetch: () => void;
  data: null;
  completeness: FuelTypeLiveCompleteness
}

export type FuelTypeLiveHookResultSuccess = {
  now: Date;
  isLoading: boolean;
  error: undefined;
  refetch: () => void;
  completeness: FuelTypeLiveCompleteness
  data: FuelTypeLevel[]
}

export type FuelTypeLiveHookResult = FuelTypeLiveHookResultSuccess | FuelTypeLiveHookResultError | FuelTypeLiveHookResultLoading;
// maps

export type UnitGroupMapProps = {
  ug: UnitGroup;
};

export type UnitGroupMarker = {
  code: string;
  title: string;
  coordinate: {latitude: number; longitude: number};
  fuelType: FuelType;
}

export type UnitsGroupMapProps = {
  markers: UnitGroupMarker[]
  highlighted: UnitGroupMarker | null;
};


export type UseCurrentRangeParams = {
  hoursInAdvance: number;
  hoursInPast: number;
  updateIntervalSecs: number;
};