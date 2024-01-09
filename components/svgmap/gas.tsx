import {
  Circle,
  Group,
  Rect,
  RoundedRect,
  useClock,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import {
  ChimneyProps,
  FlameProps,
  GeneratorIconProps,
  MainBuildingProps,
  PixelPoint,
  SmokeAnimationProps,
  SmokeParticleProps,
  TurbineSpokeProps,
  TurbineWheelProps,
} from "../types";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";
import { TouchableHighlight } from "react-native-gesture-handler";

const CHIMNEY_ROUNDEDNESS = 5;

const POWER_STATION_COLOR = "slategray";
const CHIMNEY_COLOR = "darkgray";

const TURBINE_COLOR = "darkgray";

const LIGHT_SMOKE_COLOR = "lightgray";

// note these need to be in reverse order
const SMOKE_COLOURS = [LIGHT_SMOKE_COLOR, POWER_STATION_COLOR];

//turbine

const TurbineSpoke: React.FC<TurbineSpokeProps> = ({
  centerPoint,
  length,
  width,
  cycleSeconds,
  offsetAngleDegrees,
  gestureMode,
}) => {
  const t = useClock();

  const x = centerPoint.x - width / 2;
  const y = centerPoint.y - length;

  const transform = useDerivedValue(() => {
    if (gestureMode.value != 'none')
      return [{ rotate: offsetAngleDegrees * (Math.PI / 180) }];
    const timeInSeconds = t.value / 1000;
    const timePerRotation = cycleSeconds;
    const rotationFraction = timeInSeconds / timePerRotation;
    const anglePreOffsetRadians = rotationFraction * Math.PI * 2;
    const offsetAngleRadians = offsetAngleDegrees * (Math.PI / 180);
    const rotateRadians = anglePreOffsetRadians + offsetAngleRadians;
    return [{ rotate: rotateRadians }];
  });

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={length}
      color={"black"}
      origin={centerPoint}
      transform={transform}
    />
  );
};

const TURBINE_WHEEL_OFFSET_ANGLE_DEGREES = [0, 45, 90, 135, 180, 225, 270, 315];

const TurbineWheel: React.FC<TurbineWheelProps> = ({
  point,
  height,
  cycleSeconds,
  gestureMode,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: cycleSeconds * 1000 }),
      -1,
      false
    );
  }, [cycleSeconds, gestureMode]);

  const r = height / 2;
  const turbineLength = r * 0.8;
  const turbineWidth = r / 10;

  return (
    <>
      <Circle cx={point.x} cy={point.y} r={r} color={TURBINE_COLOR} />
      {TURBINE_WHEEL_OFFSET_ANGLE_DEGREES.map((offsetAngleDegrees) => (
        <TurbineSpoke
          key={offsetAngleDegrees}
          centerPoint={point}
          length={turbineLength}
          width={turbineWidth}
          cycleSeconds={cycleSeconds}
          offsetAngleDegrees={offsetAngleDegrees}
          gestureMode={gestureMode}
        />
      ))}
    </>
  );
};

// smoke

/* Smoke particle that travels upward and gets bigger */
const SmokeParticle: React.FC<SmokeParticleProps> = ({
  startX,
  startY,
  startRadius,
  gestureMode,
}) => {
  const y = useSharedValue(startY);
  const opacity = useSharedValue(1);
  const radius = useSharedValue(startRadius);

  useEffect(() => {
    y.value = withRepeat(
      withTiming(startY - 100, { duration: 2000 }),
      -1,
      false
    );
    opacity.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
    radius.value = withRepeat(
      withTiming(startRadius * 1.5, { duration: 2000 }),
      -1,
      false
    );
  }, [startY, startRadius]);

  const cy = useDerivedValue(() => {
    if (gestureMode.value != 'none') return startY;
    return y.value;
  });

  const r = useDerivedValue(() => {
    if (gestureMode.value != 'none') return startRadius;
    return radius.value;
  });

  const op = useDerivedValue(() => {
    if (gestureMode.value != 'none') return 1;
    return opacity.value;
  });

  const color = useDerivedValue(() => {
    if (gestureMode.value != 'none') return SMOKE_COLOURS[1];
    // Assuming startY is the initial position and startY - 100 is the final position
    const progress = (y.value - (startY - 100)) / 100;
    return interpolateColor(progress, [0, 1], SMOKE_COLOURS);
  });

  return <Circle cx={startX} cy={cy} r={r} color={color} opacity={op} />;
};

const SmokeAnimation: React.FC<SmokeAnimationProps> = ({
  buildingTopMiddle,
  radius,
  gestureMode,
}) => {
  const [particles, setParticles] = React.useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gestureMode.value != 'none') return;

      setParticles((prevParticles) => [
        ...prevParticles,
        { id: Math.random(), radius, ...buildingTopMiddle },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <SmokeParticle
          key={particle.id}
          startX={particle.x}
          startY={particle.y}
          startRadius={particle.radius}
          gestureMode={gestureMode}
        />
      ))}
    </>
  );
};

const Flame: React.FC<FlameProps> = ({ centrePoint, radius, gestureMode }) => {
  const sv = useSharedValue(radius.unexpanded);

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(radius.expanded, { duration: 500 }),
      -1,
      true
    );
  }, [radius.unexpanded]);

  const r = useDerivedValue(() => {
    if (gestureMode.value != 'none') return radius.expanded;
    return sv.value;
  });

  return <Circle cx={centrePoint.x} cy={centrePoint.y} r={r} color="orange" />;
};

const MainBuilding: React.FC<MainBuildingProps> = ({
  width,
  height,
  topLeftPoint,
}) => {
  return (
    <Rect
      {...topLeftPoint}
      width={width}
      height={height}
      color={POWER_STATION_COLOR}
    />
  );
};

const Chimney: React.FC<ChimneyProps> = ({ width, height, point }) => {
  return (
    <RoundedRect
      x={point.x}
      y={point.y}
      r={CHIMNEY_ROUNDEDNESS}
      width={width}
      height={height}
      color={CHIMNEY_COLOR}
    />
  );
};

const BUILDING_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT = 0.7;
const BUILDING_WIDTH_AS_FRACTION_OF_ICON_HEIGHT = 0.4;

// the flame is located in the bottom half of the building, with the turbine in the upper half
const FLAME_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT = 0.3;
const TURBINE_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT = 0.3;

const SMOKE_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT = 0.3;

const calculateDimensions = (height: number) => {
  const building = {
    width: height * BUILDING_WIDTH_AS_FRACTION_OF_ICON_HEIGHT,
    height: height * BUILDING_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT,
  };
  return {
    building,
    flame: {
      radius: {
        unexpanded: 0,
        expanded: building.width / 4,
      },
    },
  };
};

export const Gas: React.FC<GeneratorIconProps> = ({
  point,
  height,
  cycleSeconds,
  gestureMode,
}) => {
  // Adjust these values based on your design requirements
  const dims = calculateDimensions(height);
  const { building } = dims;

  const buildingWidth = building.width;
  const buildingHeight = building.height;

  const buildingTopLeft = {
    x: point.x,
    y: point.y + (height - buildingHeight),
  };

  const buildingTopMiddle = {
    ...buildingTopLeft,
    x: buildingTopLeft.x + buildingWidth / 2,
  };

  const flameCenterPoint = {
    x: buildingTopMiddle.x,
    y:
      buildingTopMiddle.y +
      buildingHeight * (1 - FLAME_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT),
  };

  const turbineCentrePoint = {
    x: buildingTopMiddle.x,
    y:
      buildingTopMiddle.y +
      buildingHeight * TURBINE_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT,
  };

  const flameWidth = buildingWidth / 4;

  return (

      <>
        <MainBuilding {...building} topLeftPoint={buildingTopLeft} />
        <Flame
          centrePoint={flameCenterPoint}
          {...dims.flame}
          gestureMode={gestureMode}
        />
        <TurbineWheel
          point={turbineCentrePoint}
          height={buildingHeight * TURBINE_HEIGHT_AS_FRACTION_OF_ICON_HEIGHT}
          cycleSeconds={cycleSeconds}
          gestureMode={gestureMode}
        />
        <SmokeAnimation
          buildingTopMiddle={buildingTopMiddle}
          radius={flameWidth}
          gestureMode={gestureMode}
        />
      </>
  );
};
