import React from "react";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRouter } from "expo-router";
import { useFuelTypeLiveQuery } from "../services/state/fuelTypeLive";
import {
  ApiErrorCard,
  FuelTypeCompletenessListHeader,
  MixScheduleCard,
} from "../atoms/cards";
import { FuelTypeLive as ListItem } from "../atoms/list-items";
import { Refresh } from "../atoms/controls";
import {
  ALLOW_LINK_FUELTYPES,
  londonTimeHHMMSS,
} from "../common/utils";
import { urls } from "../services/nav";
import { FuelTypeRange } from "./FuelTypeRange";
import { ScaledSize, View, useWindowDimensions } from "react-native";
import { FuelTypeLiveHookResult } from "../common/types";

const calculateChartHeight = (
  query: FuelTypeLiveHookResult,
  dims: ScaledSize
) => {
  const chartHeight = query.data
    ? dims.height - 180 - query.data.length * 30
    : 0;
  return chartHeight;
};

export const FuelTypeLive = () => {
  const router = useRouter();
  const nav = useNavigation();
  const query = useFuelTypeLiveQuery();
  const dims = useWindowDimensions();

  React.useEffect(() => {
    if (query.data && query.now) {
      nav.setOptions({
        title: `Live Generation Mix: ${londonTimeHHMMSS(query.now)}`,
      });
    }
  }, [query.data]);

  const orderedFuelTypes = React.useMemo(() => {
    return query.data ? query.data.map((d) => d.name) : [];
  }, [query.data]);

  const height = calculateChartHeight(query, dims)

  return (
    <FlashList
      testID="fuel-type-live-list"
      ListEmptyComponent={
        <>{query.error && <ApiErrorCard refetch={query.refetch} />}</>
      }
      ListFooterComponent={
        <View style={{height}}>
          <MixScheduleCard />
          <FuelTypeRange
            height={height}
            orderedFuelTypes={orderedFuelTypes}
          />
          <FuelTypeCompletenessListHeader completeness={query.completeness} /> 
        </View>
      }
      refreshControl={
        <Refresh refreshing={query.isLoading} onRefresh={query.refetch} />
      }
      data={query.data ? query.data : []}
      estimatedItemSize={250}
      renderItem={({ item }) => (
        <ListItem
          name={item.name}
          level={item.level}
          onPress={
            ALLOW_LINK_FUELTYPES.includes(item.name)
              ? () => router.push(urls.fuelType(item.name))
              : undefined
          }
        />
      )}
    />
  );
};
