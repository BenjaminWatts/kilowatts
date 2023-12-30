import React from "react";
import { StackedAreaChart, XAxis, YAxis } from "react-native-svg-charts";
import { TransformedFuelTypeHistoryQuery } from "../common/parsers";
import { FUEL_TYPE_COLORS, FuelType, FuelTypeColor } from "../common/types";
import * as shape from "d3-shape";
import formatters from "../common/formatters";
import { londonTimeHHMM } from "../common/utils";
import { StyleSheet, View, useWindowDimensions } from "react-native";

type UnitGroupUnitsStackedChartProps = {
  data?: {
    colors: FuelTypeColor[];
    values: TransformedFuelTypeHistoryQuery[];
  }
};

const contentInset = { top: 5, bottom: 20 };

/* formats a number as a londontime HH:MM. returns blank unless MM:SS are 00:00 or 30:00*/
const formatYLabel = (value: number, index: number) => {
  const londonTime = londonTimeHHMM(new Date(value));
  const minutes = londonTime.split(":")[1];
  if (
    minutes === "00" ||
    minutes === "30" ||
    minutes === "15" ||
    minutes === "45"
  ) {
    return londonTime;
  } else {
    return "";
  }
};

/* calculate the height available on the screen dynamically for the chart so it takes up the remaining space */
const calculateChartHeight = (
  liveFuelTypeCount: number,
  windowHeight: number
) => {
  const headerHeight = 25;
  const subHeaderHeight = 50;
  const tabIconHeight = 80;
  const listItemsHeight = 30 * liveFuelTypeCount;
  const availableHeight =
    windowHeight -
    headerHeight -
    subHeaderHeight -
    tabIconHeight -
    listItemsHeight;
  return availableHeight;
};

const axisSvg = { fontSize: 15, fill: "grey" };

export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data }) => {
  console.log(`UnitGroupUnitsStackedChart ${new Date()}`);
  const dims = useWindowDimensions();
  const height = calculateChartHeight(data?.colors.length || 0, dims.height)
  
  const keysColors = {
    keys: data?.colors.map((c) => c.fuelType) || [],
    colors: data?.colors.map((c) => c.color) || []
  };
  return (
    <View style={{...styles.chartView, height}}>
      {data?.values && (
        <>
          <YAxis
            data={data.values}
            contentInset={contentInset}
            min={0}
            svg={axisSvg}
            numberOfTicks={3}
            yAccessor={({ item }) => item.total}
            formatLabel={formatters.mwToGW}
          />
          <View style={styles.right}>
            <StackedAreaChart
              style={{ flex: 1, marginLeft: 5 }}
              data={data.values}
              key={"time"}
              contentInset={contentInset}
              curve={shape.curveNatural}
              colors={keysColors.colors}
              keys={keysColors.keys}
              // axisSvg={{ fill: "grey", fontSize: 10 }}
              // svgs={fuelTypeColors.map((c) => ({
              //   onPress: () => console.log("press", c),
              // }))}
              gridMin={0}
            />
            <XAxis
              style={styles.x}
              data={data.values}
              contentInset={{ left: 15, right: 0 }}
              xAccessor={({ item }) => item.time}
              formatLabel={formatYLabel}
              svg={axisSvg}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartView: { flexDirection: "row" },
  right: { display: "flex", flexDirection: "column", flex: 1 },
  x: { height: 30, marginTop: 0, paddingTop: 0 }
});