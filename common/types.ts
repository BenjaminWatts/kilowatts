

// Elexon Insights API 

export type ElexonSettlementDateParams = {
    settlementDate: string;
    settlementPeriod: number;
}

export type ElexonSettlementPeriodParams = {
    settlementDate: string;
    settlementPeriod: number;
}

export type ElexonSettlementDateOrPeriodParams = ElexonSettlementDateParams | ElexonSettlementPeriodParams

export type ElexonInsightsPNDataRecord = {
    dataset: 'PN';
    settlementDate: string;
    settlementPeriod: number;
    timeFrom: string;
    timeTo: string;
    levelFrom: number;
    levelTo: number;
    nationalGridBmUnit: string;
    bmUnit: string;
}

export type ElexonInsightsPNParams = ElexonSettlementDateOrPeriodParams & {
    bmUnits?: string[];
} 

export type ElexonSightsPNUnitsParams = ElexonInsightsPNParams & {
    bmUnits: string[];
}

export type ElexonInsightsPnResponseRaw = {
    data: ElexonInsightsPNDataRecord[];
}

export type BmUnitId = string
export type DateString = string
export type LevelDict = Record<DateString, number>
export type LevelPair = {time: string, level: number}
export type BmUnitValues = Record<BmUnitId, number>
export type BmUnitLevelPairs = Record<BmUnitId, LevelPair[]>

export type ElexonInsightsAcceptancesParams = ElexonSightsPNUnitsParams

export type ElexonInsightsPnResponseParsed = BmUnitLevelPairs

export type ElexonInsightsAcceptancesDataRecord = {
    settlementDate: string;
    setttlementPeriodFrom: number;
    setttlementPeriodTo: number;
    timeFrom: string;
    timeTo: string;
    levelFrom: number;
    levelTo: number;
    nationalGridBmUnit: string;
    bmUnit: string;
    acceptanceNumber: number;
    acceptanceTime: string;
    deemedBoFlag: boolean;
    soFlag: boolean;
    storFlag: boolean;
    rrFlag: boolean;
}

export type ElexonInsightsAcceptancesResponse = {
    data: ElexonInsightsAcceptancesDataRecord[];
}

export type ElexonInsightsAcceptancesParsedNoLevels = {
    bmUnit: string;
    acceptanceNumber: number;
    acceptanceTime: string;
    deemedBoFlag: boolean;
    soFlag: boolean;
    storFlag: boolean;
    rrFlag: boolean;
}

export type ElexonInsightsAcceptancesParsed = ElexonInsightsAcceptancesParsedNoLevels & {
    levels: LevelPair[];
}

export type ElexonInsightsAcceptancesResponseParsed = Record<BmUnitId, ElexonInsightsAcceptancesParsed[]>

export type FuelType = 'gas' | 'coal' | 'nuclear' | 'wind' | 'hydro' | 'biomass' | 'solar' | 'oil' | 'interconnector' | 'unknown' | 'battery'

export type UnitGroupUnit = {
    bmUnit: string;
    name?: string;
}

export type UnitGroupDetails = {
    code?: string;
    name: string; // Pembroke
    coords: {
        lat: number;
        lng: number;
    }
    fuelType: FuelType
}

export type UnitGroup = {
    details: UnitGroupDetails;
    units: UnitGroupUnit[]
}

export type UnitGroupUnitLevel = {
    unit: UnitGroupUnit;
    level: number;
}

export type UnitGroupLevel = {
    details: UnitGroupDetails;
    units: UnitGroupUnitLevel[]
    level: number;
}


export type FuelTypeLevel = {
    name: FuelType
    level: number;
    unitGroupLevels: UnitGroupLevel[]
}

