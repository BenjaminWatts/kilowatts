import React from "react";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRouter } from "expo-router";
import { useFuelTypeLiveQuery } from "../services/state/fuelTypeLive";
import { ApiErrorCard, CallForContributions, FuelTypeCompletenessListHeader } from "../atoms/cards";
import { FuelTypeLive as ListItem } from "../atoms/list-items";
import { Refresh } from "../atoms/controls";
import { ALLOW_LINK_FUELTYPES, londonTimeHHMMSS } from "../common/utils";
import { urls } from "../services/nav";

export const FuelTypeLive = () => {
  const nav = useNavigation();
  const router = useRouter();
  const query = useFuelTypeLiveQuery();
  React.useEffect(() => {
    nav.setOptions({
      title: query.now
        ? `National Grid at: ${londonTimeHHMMSS(query.now)}`
        : "Loading...",
    });
  }, [query.now]);
  if (query.error) return <ApiErrorCard refetch={query.refetch} />;
  return (
    <FlashList
      testID="fuel-type-live-list"
      ListHeaderComponent={<FuelTypeCompletenessListHeader completeness={query.completeness}/>}
      ListFooterComponent={CallForContributions}
      refreshControl={
        <Refresh refreshing={query.isLoading} onRefresh={query.refetch} />
      }
      data={query.data}
      estimatedItemSize={250}
      renderItem={({ item }) => {
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
