import React from "react";
import { useNavigation, useRouter } from "expo-router";
import { useFuelTypeLiveQuery } from "../services/state/fuelTypeLive";
import { ApiErrorCard, FuelTypeCompletenessListHeader } from "../atoms/cards";
import { FuelTypeLive as ListItem } from "../atoms/list-items";
import { ALLOW_LINK_FUELTYPES, londonTimeHHMMSS } from "../common/utils";
import { urls } from "../services/nav";
import { View, StyleSheet } from "react-native";
import { FuelType } from "../common/types";

export const FuelTypeLive = () => {
  const router = useRouter();
  const nav = useNavigation();
  const query = useFuelTypeLiveQuery();

  React.useEffect(() => {
    if (query.now) {
      nav.setOptions({
        title: `Live Generation Mix: ${londonTimeHHMMSS(query.now)}`,
      });
    }
  }, [query.now]);

  const apiError = React.useMemo(() => {
    return { error: query.error, refetch: query.refetch };
  }, [query.error, query.refetch]);

  const onPress = React.useCallback(
    (name: FuelType) => {
      ALLOW_LINK_FUELTYPES.includes(name)
        ? () => router.push(urls.fuelType(name))
        : undefined;
    },
    [router]
  );

  return (
    <View style={styles.fuelTypeLiveWrapper}>
      <>{apiError.error && <ApiErrorCard refetch={apiError.refetch} />}</>

      {query.data &&
        query.data.map((item) => (
          <ListItem
            key={item.name}
            {...item}
            onPress={() => onPress(item.name)}
          />
        ))}

      <View style={{ flex: 1 }}>
        <FuelTypeCompletenessListHeader completeness={query.completeness} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fuelTypeLiveWrapper: {
    paddingBottom: 5,
  },
});
