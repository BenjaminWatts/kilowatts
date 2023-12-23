import * as a from "./elexon-insights-api.queryParams";

describe("services/state/elexon-insights-api.queryParams", () => {

    test('settlementPeriodToQuery', () => {
        const query = a.queryParams.settlementPeriodToQuery({
            settlementDate: '2021-08-01',
            settlementPeriod: 1,
        });
        expect(query).toBe('?settlementDate=2021-08-01&settlementPeriod=1');
    })

    test('bmUnitsToQuery', () => {
        const bmUnits = ['a', 'b', 'c']
        const query = a.queryParams.bmUnitsToQuery(bmUnits);
        expect(query).toBe('&bmUnit=a&bmUnit=b&bmUnit=c');
    })
    
    test('rangeToQuery', () => {
        const query = a.queryParams.rangeToQuery({
            from: '2021-08-01',
            to: '2021-08-02',
        });
        expect(query).toBe('?from=2021-08-01&to=2021-08-02');
    })
})