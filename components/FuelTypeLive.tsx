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

/* calculate the height available on the screen dynamically for the chart so it takes up the remaining space */
const calculateChartHeight = (
  query: FuelTypeLiveHookResult,
  dims: ScaledSize
) => {
  const headerHeight = 100
  const subHeaderHeight = 50
  const tabIconHeight = 80
  const listItemsHeight = 30 * (query.data ? query.data.length : 0)
  const windowHeight = dims.height
  const availableHeight = windowHeight - headerHeight - subHeaderHeight - tabIconHeight  - listItemsHeight
  return availableHeight
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
        <View style={{flex: 1, height}}>
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
