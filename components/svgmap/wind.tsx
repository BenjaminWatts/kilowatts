import {
  Circle,
  RoundedRect,
  Rect,
  useClock,
} from "@shopify/react-native-skia";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { GeneratorIconProps, PixelPoint } from "../types";

// Dimensions of the wind turbine in pixels as originally drawn.

const HEIGHT = 80;
const WIDTH = 5;
const R = 10;
const HUBWIDTH = 20;

// other constants

const BLADE_OFFSET_ANGLE_DEGREES = [0, 120, 240];
const BLADE_COLOR = "grey";
const HUB_COLOR = "grey";
const HUB_CIRCLE_COLOR = "darkgrey";
const TOWER_COLOR = "grey";

/* calculates the dimensions of the turbines given the height in pixels provided, where the outputs are measured relative to the dimensions above  */
const calculateDimensions = (height: number) => {
  const ratio = height / HEIGHT;

  return {
    width: WIDTH * ratio,
    r: R * ratio,
    hubwidth: HUBWIDTH * ratio,
  };
};

/* the circular jub at the top of the wind turbine */
const HubCircle: React.FC<{ turbineCentre: PixelPoint; r: number }> = ({
  turbineCentre,
  r,
}) => {
  return (
    <Circle
      cx={turbineCentre.x}
      cy={turbineCentre.y}
      r={r}
      color={HUB_CIRCLE_COLOR}
    />
  );
};

type TurbineBladeProps = {
  point: PixelPoint;
  r: number;
  width: number;
  height: number;
  hubAttachmentPoint: PixelPoint;
  transform: Readonly<
    SharedValue<
      {
        rotate: number;
      }[]
    >
  >;
};

/* A wind turbine blade which attaches to the hub*/
const TurbineBlade: React.FC<TurbineBladeProps> = ({
  point,
  r,
  width,
  height,
  hubAttachmentPoint,
  transform,
}) => {
  return (
    <RoundedRect
      x={point.x}
      y={point.y}
      r={r}
      width={width}
      height={height}
      origin={hubAttachmentPoint}
      transform={transform}
      color={BLADE_COLOR}
    />
  );
};

type TurbineTowerProps = {
  height: number;
  width: number;
  topTowerPoint: PixelPoint;
};
const TurbineTower: React.FC<TurbineTowerProps> = ({
  height,
  width,
  topTowerPoint,
}) => {
  return (
    <Rect
      x={topTowerPoint.x}
      y={topTowerPoint.y}
      width={width}
      height={height}
      color={TOWER_COLOR}
    />
  );
};

type HubSquareProps = { turbineCentre: PixelPoint; r: number; width: number };

/* the square at the top of the turbine */
const HubSquare: React.FC<HubSquareProps> = ({ turbineCentre, r, width }) => {
  return (
    <Rect
      x={turbineCentre.x - width / 2}
      y={turbineCentre.y}
      width={width}
      height={r}
      color={HUB_COLOR}
    />
  );
};


export const Wind: React.FC<GeneratorIconProps> = ({ point, height, cycleSeconds, gestureMode }) => {
  const t = useClock();
  const { width, r, hubwidth } = calculateDimensions(height);
  const turbineCentre = { x: point.x + width / 2, y: point.y + height };

  /* generate a blade transform. the offset angle is measured clockwise from 12 o'clock and is used to generate 3 turbines equally distanced by 120 degrees */
  const getBladeTransform = (offsetAngleDegrees: number) => {
    return useDerivedValue(() => {
      if(gestureMode.value !== 'none') return [{ rotate: offsetAngleDegrees * (Math.PI / 180) }];
      const timeInSeconds = t.value / 1000;
      const timePerRotation = cycleSeconds;
      const rotationFraction = timeInSeconds / timePerRotation;
      const anglePreOffsetRadians = rotationFraction * Math.PI * 2;
      const offsetAngleRadians = offsetAngleDegrees * (Math.PI / 180);
      const rotateRadians = anglePreOffsetRadians + offsetAngleRadians;
      return [{ rotate: rotateRadians }];
    });
  };

  const bladeTransforms = BLADE_OFFSET_ANGLE_DEGREES.map((offsetAngleDegrees) =>
    getBladeTransform(offsetAngleDegrees)
  );

  return (
    <>
      <TurbineTower
        height={height}
        width={width}
        topTowerPoint={turbineCentre}
      />
      <HubSquare turbineCentre={turbineCentre} r={r} width={hubwidth} />
      <HubCircle turbineCentre={turbineCentre} r={r} />

      {bladeTransforms.map((transform, index) => (
        <TurbineBlade
          key={index}
          point={point}
          r={r}
          width={width}
          height={height}
          hubAttachmentPoint={turbineCentre}
          transform={transform}
        />
      ))}
    </>
  );
};
