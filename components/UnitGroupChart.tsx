import React from "react";
import { UnitGroup } from "../common/types";
import { StyleSheet, View } from "react-native";
import { useUnitGroupHistoryQuery } from "../services/state/unitGroupHistory";

type UnitGroupChartProps = {
  ug: UnitGroup;
};

export const UnitGroupChart: React.FC<UnitGroupChartProps> = ({ ug }) => {
  const query = useUnitGroupHistoryQuery({
    ug,
    range: {
      hoursInAdvance: 2,
      hoursInPast: 24,
      updateIntervalSecs: 60,
    },
  });
  console.log(query.data);
  return (
    <View style={styles.half}>
      </View>
  )
};


const styles = StyleSheet.create({
  half: {
    height: "50%",
  },
});