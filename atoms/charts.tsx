import React from "react";
import {
  CartesianChart,
  Area,
  PointsArray,
} from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import {
  FUEL_LIVE_FREQUENCY_SECS,
  TransformedFuelTypeHistoryQuery,
} from "../common/parsers";
import { getFuelTypeColor } from "../common/types";
import formatters from "../common/formatters";
import { londonTimeHHMM } from "../common/utils";

const sm = require("../assets/fonts/SpaceMono-Regular.ttf");

type Points = {
  wind: PointsArray;
  nuclear: PointsArray;
  gas: PointsArray;
  hydro: PointsArray;
  solar: PointsArray;
  biomass: PointsArray;
  battery: PointsArray;
  coal: PointsArray;
  interconnector: PointsArray;
  now: PointsArray;
  settlementPeriod: PointsArray;
};

const getPoints = (points: Points, fuelType: string) => {
  switch (fuelType) {
    case "wind":
      return points.wind;
    case "nuclear":
      return points.nuclear;
    case "gas":
      return points.gas;
    case "hydro":
      return points.hydro;
    case "solar":
      return points.solar;
    case "biomass":
      return points.biomass;
    case "battery":
      return points.battery;
    case "coal":
      return points.coal;
    case "interconnector":
      return points.interconnector;
    default:
      return [];
  }
};

type UnitGroupUnitsStackedChartProps = {
  data: TransformedFuelTypeHistoryQuery;
};

type CreateChartDataResult = {
  time: Date;
  wind: number;
  nuclear: number;
  gas: number;
  hydro: number;
  solar: number;
  biomass: number;
  battery: number;
  coal: number;
  interconnector: number;
  now: number;
  settlementPeriod: number;
}[];

/* embellish the data for the chart by adding vertical type lines for now and the start and end of a settlement period  */
const createChartData = (
  data: TransformedFuelTypeHistoryQuery
): CreateChartDataResult => {
  if (!data.nowLine) {
    return data.stacked.map((x) => ({
      ...x,
      now: 0,
      settlementPeriod: 0,
    }));
  }
  const now = data.nowLine;

  const withNow = data.stacked.map((d) => {
    const time = d.time;
    const isNow =
      Math.abs(now.getTime() - time.getTime()) * 2 <=
      FUEL_LIVE_FREQUENCY_SECS * 1000;

    const isStartEndSettlementPeriod =
      (time.getMinutes() * 60 + time.getSeconds()) % (30 * 60) <=
      FUEL_LIVE_FREQUENCY_SECS;

    const maxValue = Math.max(
      ...[
        d.wind,
        d.nuclear,
        d.gas,
        d.hydro,
        d.solar,
        d.biomass,
        d.battery,
        d.coal,
        d.interconnector,
      ]
    );

    return {
      ...d,
      settlementPeriod: isStartEndSettlementPeriod ? maxValue : 0,
      now: isNow ? maxValue : 0,
    };
  });
  return withNow;
};

export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data }) => {
  const font = useFont(sm, 12);
  const reversed = [...data.ranked].reverse();
  const chartData = createChartData(data);

  return (
    <CartesianChart
      data={chartData}
      axisOptions={{
        font,
        tickCount: {
          y: 3,
          x: 4,
        },
        formatXLabel: (x) => londonTimeHHMM(new Date(x)),
        formatYLabel: formatters.mwToGW,
      }}
      xKey="time"
      yKeys={[
        "wind",
        "nuclear",
        "gas",
        "hydro",
        "solar",
        "biomass",
        "battery",
        "coal",
        "interconnector",
        "now",
        "settlementPeriod",
      ]}
    >
      {({ points, chartBounds }) => (
        <>
          {reversed.map((unit) => (
            <Area
              key={unit.fuelType}
              y0={chartBounds.bottom}
              points={getPoints(points, unit.fuelType)}
              color={getFuelTypeColor(unit.fuelType)}
            />
          ))}

          <Area
            key={"settlementPeriod"}
            y0={chartBounds.bottom}
            points={points.settlementPeriod}
            color={"grey"}
            curveType="step"
          />

          <Area
            key={"now"}
            y0={chartBounds.bottom}
            points={points.now}
            color={"red"}
            curveType="step"
          />
        </>
      )}
    </CartesianChart>
  );
};
