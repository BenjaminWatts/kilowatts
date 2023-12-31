import React from "react";
// import { UnitGroup } from "../common/types";
import { StyleSheet, View } from "react-native";
import { useUnitGroupHistoryQuery } from "../services/state/unitGroupHistory";
import {
  ChartErrorBoundary,
  UnitGroupUnitsStackedChart,
} from "../atoms/charts";

type UnitGroupChartProps = {
  bmUnits: string[];
};

export const UnitGroupChart: React.FC<UnitGroupChartProps> = ({ bmUnits }) => {
  const query = useUnitGroupHistoryQuery({
    bmUnits,
    range: {
      hoursInAdvance: 2,
      hoursInPast: 0.5,
      updateIntervalSecs: 60,
    },
  });
  return (
    <View style={styles.half}>
      {query.data && (
        <ChartErrorBoundary>
          <UnitGroupUnitsStackedChart data={query.data} bmUnits={bmUnits} />
        </ChartErrorBoundary>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  half: {
    height: "50%",
  },
});
