import React from "react";
import { useFuelTypeHistoryQuery } from "../services/state/fuelTypeRange";
import { UnitGroupUnitsStackedChart } from "../atoms/charts";
import { View, useWindowDimensions } from "react-native";
import { ApiErrorCard } from "../atoms/cards";
import { Loader } from "../atoms/loaders";

type FuelTypeRangeProps = {
  height: number;
};

export const FuelTypeRange: React.FC<FuelTypeRangeProps> = ({ height }) => {
  const { data, error, refetch } = useFuelTypeHistoryQuery();
  const dims = useWindowDimensions();
  const isLoading = true

  return (
    <View style={{ height, width: dims.width - 5 }}>
      {data ? (
        <UnitGroupUnitsStackedChart data={data} />
      ) : (
        <>
            {isLoading && <Loader/>}
            {error && <ApiErrorCard refetch={refetch} />}
        </>
       )} 
    </View>
  );
};
