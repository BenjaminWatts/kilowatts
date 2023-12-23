import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "@rneui/themed";
import formatters from "../common/formatters";
import { FuelTypeIcon } from "./icons";
import { londonTime, londonTimeHHMMSS } from "../common/utils";
import { FuelType, LevelPair, UnitGroupUnit } from "../common/types";

type GeneratorLiveProps = {
  index: number;
  fuelType: FuelType;
  name: string;
  level: number;
  onPress?: () => void;
};

export const GeneratorLive: React.FC<GeneratorLiveProps> = ({
  index,
  fuelType,
  name,
  level,
  onPress,
}) => (
  <ListItem style={styles.listItemWrapper} onPress={onPress}>
    <ListItem.Content
      style={styles.liveContainer}
      testID={`generator-live-${index}`}
    >
      <View style={styles.titleSubtitleWrapper}>
        <FuelTypeIcon fuelType={fuelType} size={20} />
        <ListItem.Title>{name}</ListItem.Title>
      </View>

      <ListItem.Subtitle>{formatters.mw(level)}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

type FuelTypeLiveProps = {
  name: FuelType;
  level: number;
  onPress?: () => void;
};

export const FuelTypeLive: React.FC<FuelTypeLiveProps> = ({
  name,
  level,
  onPress,
}) => (
  <ListItem testID={`fuel-type-live-list-item-${name}`} onPress={onPress}>
    <ListItem.Content style={styles.liveContainer}>
      <View style={styles.titleSubtitleWrapper}>
        <FuelTypeIcon fuelType={name} size={20} />

        <ListItem.Title>{formatters.fuelType(name)}</ListItem.Title>
      </View>

      <ListItem.Subtitle>{formatters.mw(level)}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

type UnitLiveProps = {
  index: number;
  details: UnitGroupUnit;
  level: number;
};

export const UnitLive: React.FC<UnitLiveProps> = ({
  details,
  level,
  index,
}) => (
  <ListItem key={index} testID={`unit-type-live-list-item-${index}`}>
    <ListItem.Content style={styles.liveContainer}>
      <ListItem.Title>{details.bmUnit}</ListItem.Title>
      <ListItem.Subtitle>{formatters.mw(level)}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
);

type UnitLevelProps = LevelPair;

export const UnitLevelListItem: React.FC<UnitLevelProps> = ({
  level,
  time,
}) => {
  return (
    <ListItem>
      <ListItem.Content style={styles.liveContainer}>
        <ListItem.Title>
          {londonTimeHHMMSS(new Date(Date.parse(time)))}
        </ListItem.Title>
        <ListItem.Subtitle>{formatters.mw(level)}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  liveContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  hSpacer: {
    width: 10,
  },
  listItemWrapper: {
    width: "100%",
  },
  titleSubtitleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
});
