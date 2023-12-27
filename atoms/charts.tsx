import React from "react";
import { CartesianChart, Area } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { londonTimeHHMM } from "../common/utils";
import { View, useWindowDimensions } from "react-native";

type UnitGroupUnitsStackedChartProps = {
  height: number;
  data: any[];
};
export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data, height }) => {
  const sm = require("../assets/fonts/SpaceMono-Regular.ttf");
  const font = useFont(sm, 12);
  const dims = useWindowDimensions();
  return (
    <View style={{ height, width: dims.width - 5 }}>
      <CartesianChart
        data={data}
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
            {/* <Line
              color={"black"}
              points={[
                {
                  x: now,
                  y: 0,
                },
                {
                  x: now,
                  y: 30000,
                },
              ]}
            /> */}
            <Area
              y0={chartBounds.bottom}
              points={points.interconnector}
              color="lilac"
            />
            <Area
              y0={chartBounds.bottom}
              points={points.battery}
              color="pink"
            />
            <Area y0={chartBounds.bottom} points={points.coal} color="black" />
            <Area y0={chartBounds.bottom} points={points.gas} color="blue" />

            <Area
              y0={chartBounds.bottom}
              points={points.biomass}
              color="brown"
            />
            <Area
              y0={chartBounds.bottom}
              points={points.hydro}
              color="lightblue"
            />

            <Area
              y0={chartBounds.bottom}
              points={points.solar}
              color="yellow"
            />
            <Area y0={chartBounds.bottom} points={points.wind} color="grey" />

            <Area
              y0={chartBounds.bottom}
              points={points.nuclear}
              color="orange"
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
};
