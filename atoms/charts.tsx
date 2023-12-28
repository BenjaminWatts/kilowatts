import React from "react";
import { CartesianChart, Area } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { londonTimeHHMM } from "../common/utils";
import { View, useWindowDimensions } from "react-native";
import { TransformedFuelTypeHistoryQuery } from "../common/parsers";
import { getFuelTypeColor } from "../common/types";
import { area } from "d3-shape";

type UnitGroupUnitsStackedChartProps = {
  height: number;
  data: TransformedFuelTypeHistoryQuery;
};
export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data, height }) => {
  const sm = require("../assets/fonts/SpaceMono-Regular.ttf");
  const font = useFont(sm, 12);
  const dims = useWindowDimensions();
  const reversed = [...data.ranked].reverse()
  return (
    <View style={{ height, width: dims.width - 5 }}>
      <CartesianChart
        data={data.stacked}
        axisOptions={{
          font,
          tickCount: 4,
          formatYLabel: (y) => `${y / 1000}GW`,
          formatXLabel: (x) => {
            const d = new Date(x);
            return londonTimeHHMM(d);
          },
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
        ]}
      >
        {({ points, chartBounds }) => (
          <>
          {reversed.map((unit) => {
            const getPoints = (fuelType: string) => {
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
                  return []
              }
            }
            return (
              <Area
                key={unit.fuelType}
                y0={chartBounds.bottom}
                points={getPoints(unit.fuelType)}
                color={getFuelTypeColor(unit.fuelType)}
              />
            )
          })}
                       
          </>
        )}
      </CartesianChart>
    </View>
  );
};
