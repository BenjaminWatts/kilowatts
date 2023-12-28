import React from "react";
import {
  CartesianChart,
  Area,
  PointsArray,
  Line,
  ChartBounds,
} from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { View, useWindowDimensions } from "react-native";
import {
  FUEL_LIVE_FREQUENCY_SECS,
  TransformedFuelTypeHistoryQuery,
} from "../common/parsers";
import { getFuelTypeColor } from "../common/types";
import formatters from "../common/formatters";
import { londonTimeHHMM } from "../common/utils";

const sm = require("../assets/fonts/SpaceMono-Regular.ttf");

type Points = {
  now: PointsArray;
  wind: PointsArray;
  nuclear: PointsArray;
  gas: PointsArray;
  hydro: PointsArray;
  solar: PointsArray;
  biomass: PointsArray;
  battery: PointsArray;
  coal: PointsArray;
  interconnector: PointsArray;
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
  height: number;
  data: TransformedFuelTypeHistoryQuery;
};

const addNowLine = (data: TransformedFuelTypeHistoryQuery) => {
  const now = new Date();
  const withNow = data.stacked.map((d) => {
    if (
      Math.abs(now.getTime() - d.time.getTime()) * 2 <=
      FUEL_LIVE_FREQUENCY_SECS * 1000
    ) {
      console.log(d)
      return {
        ...d,
        now: Math.max(
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
        ),
      };
    } else {
      return { ...d, now: 0 };
    }
  });
  return withNow;
};

export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data, height }) => {
  const font = useFont(sm, 12);
  const dims = useWindowDimensions();
  const reversed = [...data.ranked].reverse();
  // Calculate the x-coordinate for the current time

  return (
    <View style={{ height, width: dims.width - 5 }}>
      <CartesianChart
        data={addNowLine(data)}
        axisOptions={{
          font,
          tickCount: 4,
          formatXLabel: londonTimeHHMM,
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
              key={"now"}
              y0={chartBounds.bottom}
              points={points.now}
              color={"black"}
              curveType="step"
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
};
