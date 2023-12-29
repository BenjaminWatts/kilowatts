import React from "react";
import { useFuelTypeHistoryQuery } from "../services/state/fuelTypeRange";
import { UnitGroupUnitsStackedChart } from "../atoms/charts";
import { View, useWindowDimensions } from "react-native";
import { ApiErrorCard } from "../atoms/cards";
import { Loader } from "../atoms/loaders";

type FuelTypeRangeProps = {
  height: number;
  orderedFuelTypes: string[] | null;
};

export const FuelTypeRange: React.FC<FuelTypeRangeProps> = ({
  height,
  orderedFuelTypes,
}) => {
  const { data, error, refetch, isLoading } = useFuelTypeHistoryQuery();
  const dims = useWindowDimensions();
  return (
    <View
      style={{
        height,
        width: dims.width - 5,
      }}
    >
      {data ? (
        <UnitGroupUnitsStackedChart
          data={data}
          orderedFuelTypes={orderedFuelTypes}
        />
      ) : (
        <>
          {isLoading && <Loader />}
          {error && <ApiErrorCard refetch={refetch} />}
        </>
      )}
    </View>
  );
};
