import React from "react";
import { ActivityIndicator } from "react-native";
import { useUnitGroupsLiveQuery } from "../services/state/elexon-insights-api.hooks";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "expo-router";
import * as at from "../atoms";
import { RefreshControl } from "react-native-gesture-handler";
import { IncompleteUnknownCategories } from "../atoms/cards";

export const UnitGroupLive = () => {
  const nav = useNavigation();
  const { data, isLoading, updated, refetch } = useUnitGroupsLiveQuery();
  React.useEffect(() => {
    nav.setOptions({
      title: updated
        ? `Major Generators Live Output: ${updated.toLocaleTimeString()}`
        : "Loading...",
    });
  }, [updated]);
  return (
    <FlashList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ListFooterComponent={IncompleteUnknownCategories}
      data={data}
      estimatedItemSize={1000}
      renderItem={({ item, index }) => (
        <at.listItems.GeneratorLive 
        index={index}
          fuelType={item.details.fuelType}
        name={item.details.name} level={item.level} />
      )}
    />
  );
};
