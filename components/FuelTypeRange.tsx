import React from "react";
import { useFuelTypeHistoryQuery } from "../services/state/fuelTypeRange";
import {
  ChartErrorBoundary,
  FuelTypeStackedChart,
} from "../atoms/charts";
import { ApiErrorCard } from "../atoms/cards";
import { Loader } from "../atoms/loaders";

type FuelTypeRangeProps = {};

export const FuelTypeRange: React.FC<FuelTypeRangeProps> = ({}) => {
  const { data, error, refetch, isLoading } = useFuelTypeHistoryQuery();

  return (
    <>
      {data ? (
        <ChartErrorBoundary>
          <FuelTypeStackedChart data={data} />
        </ChartErrorBoundary>
      ) : (
        <>
          {isLoading && <Loader />}
          {error && <ApiErrorCard refetch={refetch} />}
        </>
      )}
    </>
  );
};
