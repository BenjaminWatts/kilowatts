// Test: ng-eso-api.tR.test.ts
import * as tR from "./ng-eso-api.tR";

describe("ng-eso-api.tR/e", () => {
  test("can validate and successfully parse an extract of a real response", () => {
    const input = {
      help: "https://api.nationalgrideso.com/api/3/action/help_show?name=datastore_search_sql",
      success: true,
      result: {
        records: [
          {
            DATE_GMT: "2023-12-21T00:00:00",
            EMBEDDED_WIND_FORECAST: 5358,
            EMBEDDED_WIND_CAPACITY: 6488,
            TIME_GMT: "07:30",
            _full_text:
              "'-12':2,10 '-21':3,11 '0':18 '00':5,6,13,14 '07':7 '15':15 '15905':19 '2023':1,9 '30':8 '5358':16 '6488':17 't00':4,12",
            SETTLEMENT_PERIOD: 15,
            SETTLEMENT_DATE: "2023-12-21T00:00:00",
            EMBEDDED_SOLAR_FORECAST: 0,
            _id: 1,
            EMBEDDED_SOLAR_CAPACITY: 15905,
          },
          {
            DATE_GMT: "2023-12-21T00:00:00",
            EMBEDDED_WIND_FORECAST: 5361,
            EMBEDDED_WIND_CAPACITY: 6488,
            TIME_GMT: "08:00",
            _full_text:
              "'-12':2,10 '-21':3,11 '0':18 '00':5,6,8,13,14 '08':7 '15905':19 '16':15 '2023':1,9 '5361':16 '6488':17 't00':4,12",
            SETTLEMENT_PERIOD: 16,
            SETTLEMENT_DATE: "2023-12-21T00:00:00",
            EMBEDDED_SOLAR_FORECAST: 0,
            _id: 2,
            EMBEDDED_SOLAR_CAPACITY: 15905,
          },
          {
            DATE_GMT: "2023-12-21T00:00:00",
            EMBEDDED_WIND_FORECAST: 5382,
            EMBEDDED_WIND_CAPACITY: 6488,
            TIME_GMT: "08:30",
            _full_text:
              "'-12':2,10 '-21':3,11 '0':18 '00':5,6,13,14 '08':7 '15905':19 '17':15 '2023':1,9 '30':8 '5382':16 '6488':17 't00':4,12",
            SETTLEMENT_PERIOD: 17,
            SETTLEMENT_DATE: "2023-12-21T00:00:00",
            EMBEDDED_SOLAR_FORECAST: 0,
            _id: 3,
            EMBEDDED_SOLAR_CAPACITY: 15905,
          },
          {
            DATE_GMT: "2023-12-21T00:00:00",
            EMBEDDED_WIND_FORECAST: 5402,
            EMBEDDED_WIND_CAPACITY: 6488,
            TIME_GMT: "09:00",
            _full_text:
              "'-12':2,10 '-21':3,11 '00':5,6,8,13,14 '09':7 '15905':19 '18':15 '2023':1,9 '5402':16 '63':18 '6488':17 't00':4,12",
            SETTLEMENT_PERIOD: 18,
            SETTLEMENT_DATE: "2023-12-21T00:00:00",
            EMBEDDED_SOLAR_FORECAST: 63,
            _id: 4,
            EMBEDDED_SOLAR_CAPACITY: 15905,
          },
          {
            DATE_GMT: "2023-12-21T00:00:00",
            EMBEDDED_WIND_FORECAST: 5434,
            EMBEDDED_WIND_CAPACITY: 6488,
            TIME_GMT: "09:30",
            _full_text:
              "'-12':2,10 '-21':3,11 '00':5,6,13,14 '09':7 '15905':19 '19':15 '2023':1,9 '256':18 '30':8 '5434':16 '6488':17 't00':4,12",
            SETTLEMENT_PERIOD: 19,
            SETTLEMENT_DATE: "2023-12-21T00:00:00",
            EMBEDDED_SOLAR_FORECAST: 256,
            _id: 5,
            EMBEDDED_SOLAR_CAPACITY: 15905,
          },
        ],
      },
    };
    const output = [
      {
        time: "2023-12-21T07:00:00.000Z",
        wind: { level: 5358, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T07:30:00.000Z",
        wind: { level: 5361, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:00:00.000Z",

        wind: { level: 5382, capacity: 6488 },
        solar: { level: 0, capacity: 15905 },
      },
      {
        time: "2023-12-21T08:30:00.000Z",

        wind: { level: 5402, capacity: 6488 },
        solar: { level: 63, capacity: 15905 },
      },
      {
        time: "2023-12-21T09:00:00.000Z",
        wind: { level: 5434, capacity: 6488 },
        solar: { level: 256, capacity: 15905 },
      },
    ];
    expect(tR.queries.embeddedWindAndSolarForecast(input)).toEqual(output);
  });
});
