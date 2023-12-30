import React from "react";
import { useFuelTypeHistoryQuery } from "../services/state/fuelTypeRange";
import { UnitGroupUnitsStackedChart } from "../atoms/charts";
import { ApiErrorCard } from "../atoms/cards";
import { Loader } from "../atoms/loaders";

type FuelTypeRangeProps = {};

export const FuelTypeRange: React.FC<FuelTypeRangeProps> = ({}) => {
  const { data, error, refetch, isLoading } = useFuelTypeHistoryQuery();

  return (
    <>
      {data ? (
        <UnitGroupUnitsStackedChart data={data} />
      ) : (
        <>
          {isLoading && <Loader />}
          {error && <ApiErrorCard refetch={refetch} />}
        </>
      )}
    </>
  );
};
