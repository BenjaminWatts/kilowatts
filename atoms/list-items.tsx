import React from "react";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import { ListItem } from "@rneui/themed";
import formatters from "../common/formatters";
import { FuelTypeIcon, UpOrDownIcon } from "./icons";
import { londonTimeHHMMSS } from "../common/utils";
import { FuelType, LevelPairDelta, UnitGroupUnit } from "../common/types";
import log from "../services/log";

const LevelListItemSubtitle: React.FC<{ level: number; delta: number }> = ({
  level,
  delta,
}) => {
  log.debug("LevelListItemSubtitle", level, delta);
  return (
    <View style={styles.levelListItemSubtitle}>
      <ListItem.Subtitle>{formatters.mw(level)}</ListItem.Subtitle>
      <UpOrDownIcon delta={delta} />
    </View>
  );
};

type UnitGroupLive = {
  onHoverIn: () => void;
  onHoverOut: () => void;
  index: number;
  fuelType: FuelType;
  name: string;
  level: number;
  delta: number;
  onPress?: () => void;
};

export const UnitGroupLive: React.FC<UnitGroupLive> = ({
  index,
  fuelType,
  name,
  level,
  delta,
  onPress,
  onHoverIn,
  onHoverOut,
}) => (
  <Pressable
    style={styles.listItemContainer}
    onPress={onPress}
    onHoverIn={onHoverIn}
    onHoverOut={onHoverOut}
  >
    <ListItem.Content
      style={styles.liveContainer}
      testID={`generator-live-${index}`}
    >
      <View style={styles.titleSubtitleWrapper}>
        <FuelTypeIcon fuelType={fuelType} size={20} />
        <ListItem.Title>{name}</ListItem.Title>
      </View>

      <LevelListItemSubtitle level={level} delta={delta} />
    </ListItem.Content>
  </Pressable>
);

type FuelTypeLiveProps = {
  name: FuelType;
  level: number;
  delta: number;
  onPress?: () => void;
};

export const FuelTypeLive: React.FC<FuelTypeLiveProps> = ({
  name,
  level,
  delta,
  onPress,
}) => (
  <Pressable
    style={styles.listItemContainer}
    testID={`fuel-type-live-list-item-${name}`}
    onPress={onPress}
  >
    <ListItem.Content style={styles.liveContainer}>
      <View style={styles.titleSubtitleWrapper}>
        <FuelTypeIcon fuelType={name} size={20} />
        <ListItem.Subtitle>{formatters.fuelType(name)}</ListItem.Subtitle>
      </View>

      <LevelListItemSubtitle level={level} delta={delta} />
    </ListItem.Content>
  </Pressable>
);

type UnitLiveProps = {
  index: number;
  details: UnitGroupUnit;
  level: number;
  delta: number;
};

export const UnitLive: React.FC<UnitLiveProps> = ({
  details,
  level,
  delta,
  index,
}) => (
  <Pressable
    style={styles.listItemContainer}
    key={index}
    testID={`unit-type-live-list-item-${index}`}
    onPress={() => {
      Alert.alert('Coming soon', 'Further in-depth information on this unit will be available soon.')
    }}
  >
    <ListItem.Content style={styles.liveContainer}>
      <ListItem.Title>{details.bmUnit}</ListItem.Title>
      <LevelListItemSubtitle level={level} delta={delta} />
    </ListItem.Content>
  </Pressable>
);

type UnitLevelProps = LevelPairDelta;

export const UnitLevelListItem: React.FC<UnitLevelProps> = ({
  level,
  delta,
  time,
}) => {
  return (
    <ListItem style={styles.listItemContainer}>
      <ListItem.Content style={styles.liveContainer}>
        <ListItem.Title>
          {londonTimeHHMMSS(new Date(Date.parse(time)))}
        </ListItem.Title>
        <LevelListItemSubtitle level={level} delta={delta} />
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    height: 30,
    width: "100%",
    backgroundColor: "white",
    padding: 3,
  },
  liveContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  hSpacer: {
    width: 10,
  },

  titleSubtitleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  levelListItemSubtitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
});
