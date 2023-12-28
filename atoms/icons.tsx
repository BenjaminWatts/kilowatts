import React from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { Icon, IconProps } from "@rneui/themed";
import { FuelType, getFuelTypeColor } from "../common/types";
import log from "../services/log";

type FuelTypeIconProps = {
  fuelType: FuelType;
  size: number;
};

export const FuelTypeIcon: React.FC<FuelTypeIconProps> = ({
  fuelType,
  size,
}) => {
  log.debug(`FuelTypeIcon: ${fuelType}`);
  const props = { size, color: getFuelTypeColor(fuelType) };
  switch (fuelType) {
    case "gas":
      return <Ionicons testID='fuel-type-gas-icon' name="flame" {...props} />;
    case "oil":
      return <MaterialCommunityIcons name="oil" {...props} />;
    case "coal":
      return <MaterialCommunityIcons name="factory" {...props} />;
    case "biomass":
      return <MaterialCommunityIcons name="leaf" {...props} />;
    case "nuclear":
      return <Ionicons name="nuclear" {...props} />;
    case "wind":
      return <Feather name="wind" {...props} />;
    case "hydro":
      return <FontAwesome5 name="water" {...props} />;
    case "solar":
      return <FontAwesome5 name="solar-panel" {...props} />;
    case "interconnector":
      return <FontAwesome5 name="globe-europe" {...props} />;
    case "battery":
      return <FontAwesome5 name="battery-full" {...props} />;
    default:
      return <FontAwesome5 name="question" {...props} />;
  }
};

export const TabBarIcon = (props: {
  testID: string;
  name: IconProps["name"];
  color: string;
}) => {
  log.debug(`TabBarIcon: ${props.name} ${props.color}`);
  return <Icon {...props} size={28} name={props.name} />;
};

type HeaderInfoIconProps = {
  onPress: () => void;
};

export const HeaderInfoIcon: React.FC<HeaderInfoIconProps> = ({ onPress }) => {
  return (
    <Icon
      testID='header-info-icon'
      name="info-outline"
      size={20}
      style={{ marginRight: 15 }}
      onPress={onPress}
    />
  );
};
