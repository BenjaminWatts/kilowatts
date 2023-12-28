import React from "react";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRouter } from "expo-router";
import { useFuelTypeLiveQuery } from "../services/state/fuelTypeLive";
import { ApiErrorCard, CallForContributions, FuelTypeCompletenessListHeader } from "../atoms/cards";
import { FuelTypeLive as ListItem } from "../atoms/list-items";
import { Refresh } from "../atoms/controls";
import { ALLOW_LINK_FUELTYPES } from "../common/utils";
import { urls } from "../services/nav";
import { FuelTypeRange } from "./FuelTypeRange";
import { ScaledSize, View, useWindowDimensions } from "react-native";
import { FuelTypeLiveHookResult } from "../common/types";

const calculateChartHeight = (
  query: FuelTypeLiveHookResult,
  dims: ScaledSize
) => {
  const chartHeight = query.data ? dims.height - 300 - query.data.length * 30 : 0;
  return chartHeight;
};

export const FuelTypeLive = () => {
  const router = useRouter();
  const query = useFuelTypeLiveQuery();
  if (query.error) return <ApiErrorCard refetch={query.refetch} />;
  const dims = useWindowDimensions();
  return (
    <FlashList
      testID="fuel-type-live-list"
      ListHeaderComponent={
        <>
          <FuelTypeRange height={calculateChartHeight(query, dims)} />
          <View style={{ height: 5 }}></View>
        </>
      }
      ListFooterComponent={
        <>
          <View style={{ height: 10 }}></View>
          <FuelTypeCompletenessListHeader completeness={query.completeness} />
          <CallForContributions />
        </>
      }
      refreshControl={
        <Refresh refreshing={query.isLoading} onRefresh={query.refetch} />
      }
      data={query.data ? query.data : []}
      estimatedItemSize={250}
      renderItem={({ item }) => {
        if (item.level === 0) {
          return null;
        }
        const canNav = ALLOW_LINK_FUELTYPES.includes(item.name);

        return (
          <ListItem
            name={item.name}
            level={item.level}
            onPress={
              canNav ? () => router.push(urls.fuelType(item.name)) : undefined
            }
          />
        );
      }}
    />
  );
};
