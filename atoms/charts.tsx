import React from "react";
import { StackedAreaChart, XAxis, YAxis } from "react-native-svg-charts";
import { TransformedFuelTypeHistoryQuery } from "../common/parsers";
import { COUNT_FUEL_TYPES, FUEL_TYPE_COLORS, FuelTypeColor, getChartColors } from "../common/types";
import * as shape from "d3-shape";
import log from "../services/log";
import formatters from "../common/formatters";
import { londonTimeHHMM } from "../common/utils";
import { StyleSheet, View, useWindowDimensions, Text } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { ChartRenderErrorCard } from "./cards";

type UnitGroupUnitsStackedChartProps = {
  data?: {
    colors: FuelTypeColor[];
    values: TransformedFuelTypeHistoryQuery[];
  };
};

const contentInset = { top: 5, bottom: 20 };

/* formats a number as a londontime HH:MM. returns blank unless MM:SS are 00:00 or 30:00*/
const formatYLabel = (value: number, index: number) => {
  const londonTime = londonTimeHHMM(new Date(value));
  const minutes = londonTime.split(":")[1];
  if (
    minutes === "00" ||
    minutes === "30"
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
  const headerHeight = 75;
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

type UnitGroupStackedChartProps = {
  data: { time: Date; total: number }[];
  bmUnits: string[];
};

const generateColors = (count: number): string[] => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(FUEL_TYPE_COLORS[i % FUEL_TYPE_COLORS.length].color);
  }
  return colors;
};

export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupStackedChartProps
> = ({ data, bmUnits }) => {
  log.debug(`UnitGroupUnitsStackedChart`);
  const dims = useWindowDimensions();

  if (!bmUnits) {
    return <Text>Error</Text>;
  }

  return (
    <View
      style={{
        ...styles.chartView,
        height: calculateChartHeight(bmUnits.length + 1, dims.height),
        width: dims.width - 5,
      }}
    >
      {data && (
        <>
          <YAxis
            data={data}
            contentInset={contentInset}
            min={0}
            svg={axisSvg}
            numberOfTicks={3}
            yAccessor={({ item }) => item.total}
            formatLabel={formatters.mwRounded}
          />
          <View style={styles.right}>
            <StackedAreaChart
              style={{ flex: 1, marginLeft: 5 }}
              data={data}
              key={"time"}
              contentInset={contentInset}
              keys={bmUnits as any}
              colors={generateColors(bmUnits.length)}
              // axisSvg={{ fill: "grey", fontSize: 10 }}
              // svgs={fuelTypeColors.map((c) => ({
              //   onPress: () => console.log("press", c),
              // }))}
              gridMin={0}
            />
            <XAxis
              style={styles.x}
              data={data}
              // numberOfTicks={3}
              contentInset={{ left: 25, right: 25 }}
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

export const FuelTypeStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data }) => {
  log.debug(`UnitGroupUnitsStackedChart`);
  const dims = useWindowDimensions();
  const height = calculateChartHeight(COUNT_FUEL_TYPES, dims.height);
  return (
    <View style={{ ...styles.chartView, height }}>
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
              {...getChartColors()}
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

type ChartErrorBoundaryProps = { children: JSX.Element };
export const ChartErrorBoundary: React.FC<ChartErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary FallbackComponent={ChartRenderErrorCard}>
      {children}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  chartView: { flexDirection: "row" },
  right: { display: "flex", flexDirection: "column", flex: 1 },
  x: { height: 30, marginTop: 0, paddingTop: 0 },
});
