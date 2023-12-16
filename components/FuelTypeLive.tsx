import React from "react";
import { ActivityIndicator } from "react-native";
import { useFuelTypesLiveQuery } from "../services/state/elexon-insights-api.hooks";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "expo-router";
import * as at from "../atoms";
import { RefreshControl } from "react-native-gesture-handler";
import { IncompleteUnknownCategories } from "../atoms/cards";

export const FuelTypeLive = () => {
  const nav = useNavigation();
  const { data, isLoading, updated, refetch } = useFuelTypesLiveQuery();
  React.useEffect(() => {
    nav.setOptions({
      title: updated
        ? `National Grid at: ${updated.toLocaleTimeString()}`
        : "Loading...",
    });
  }, [updated]);
  return (
    <FlashList
      ListFooterComponent={IncompleteUnknownCategories}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      data={data}
      estimatedItemSize={1000}
      renderItem={({ item }) => (
        <at.listItems.FuelTypeLive name={item.name} level={item.level} />
      )}
    />
  );
};
