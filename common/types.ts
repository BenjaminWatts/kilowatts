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
export type LevelDict = Record<DateString, number>;
export type LevelPair = { time: string; level: number };
export type BmUnitValues = Record<BmUnitId, number>;
export type BmUnitLevelPairs = Record<BmUnitId, LevelPair[]>;

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
    levels: LevelPair[];
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

export type UnitGroupUnit = {
  bmUnit: string;
  name?: string;
};

export type UnitGroupDetails = {
  code?: string;
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
};

export type UnitGroupLevel = {
  details: UnitGroupDetails;
  units: UnitGroupUnitLevel[];
  level: number;
};

export type FuelTypeLevel = {
  name: FuelType;
  level: number;
  unitGroupLevels: UnitGroupLevel[];
};

export type UnitGroupsDict = Record<string, UnitGroup>;

export type BmUnitLevelValue = {
  id: string;
  level: number;
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