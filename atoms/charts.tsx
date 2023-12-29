import React from "react";
import { StackedAreaChart, XAxis, YAxis } from "react-native-svg-charts";
import { TransformedFuelTypeHistoryQuery } from "../common/parsers";
import { FUEL_TYPE_COLORS } from "../common/types";
import * as shape from "d3-shape";
import formatters from "../common/formatters";
import { londonTimeHHMM } from "../common/utils";
import { View } from "react-native";

type UnitGroupUnitsStackedChartProps = {
  orderedFuelTypes: string[] | null;
  data: TransformedFuelTypeHistoryQuery[];
};

const contentInset = { top: 5, bottom: 20 };

const getFuelTypeColors = (orderedFuelTypes: null | string[]) => {
  if (!orderedFuelTypes) {
    return FUEL_TYPE_COLORS;
  } else {
    let output = [];
    for (let i = 0; i < orderedFuelTypes.length; i++) {
      const fuelType = orderedFuelTypes[i];
      const color = FUEL_TYPE_COLORS.find(
        (c) => c.fuelType === fuelType
      )?.color;
      if (color) {
        output.push({ fuelType, color });
      }
    }
    // add others
    const otherFuelTypes = FUEL_TYPE_COLORS.filter(
      (c) => !orderedFuelTypes.includes(c.fuelType)
    );
    output.push(...otherFuelTypes);

    output.reverse();
    return output;
  }
};

/* formats a number as a londontime HH:MM. returns blank unless MM:SS are 00:00 or 30:00*/
const formatYLabel = (value: number, index: number) => {
  const londonTime = londonTimeHHMM(new Date(value));
  const minutes = londonTime.split(":")[1];
  if (minutes === "00" || minutes === "30" || minutes === "15" || minutes === "45") {
    return londonTime;
  } else {
    return ""
  }
}

export const UnitGroupUnitsStackedChart: React.FC<
  UnitGroupUnitsStackedChartProps
> = ({ data, orderedFuelTypes }) => {
  const fuelTypeColors = getFuelTypeColors(orderedFuelTypes);
  return (
    <View style={{ height: "100%" }}>
      {data && (
        <View style={{ flexDirection: "row", flex: 1 }}>
          <YAxis
            data={data}
            contentInset={contentInset}
            min={0}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            numberOfTicks={2}
            yAccessor={({ item }) => item.total}
            formatLabel={formatters.mwToGW}
          />
          <View style={{display: 'flex', direction: 'column', flex: 1}}>
            <StackedAreaChart
              style={{  flex: 1, marginLeft: 5 }}
              data={data}
              xKey="time"
              contentInset={contentInset}
              axisSvg={{ fill: "grey", fontSize: 10 }}
              curve={shape.curveNatural}
              keys={fuelTypeColors.map((c) => c.fuelType)}
              colors={fuelTypeColors.map((c) => c.color)}
              svgs={fuelTypeColors.map((c) => ({
                onPress: () => console.log("press", c),
              }))}
              gridMin={0}
            />
            <XAxis
              style={{ height: 30, marginTop: 0, paddingTop: 0}}
              data={data}
              // numberOfTicks={2}
              contentInset={{ left: 10, right: 10 }}
              xAccessor={({ item }) => item.time}
              formatLabel={formatYLabel}
              svg={{ fontSize: 10, fill: "grey" }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
