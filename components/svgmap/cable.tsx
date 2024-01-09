import { CableProps } from "../types";
import React from "react";
import {
  Line,
  Circle,
  useClock,
  Canvas,
  Rect,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

const CABLE_COLOR = "black";
const ELECTRON_COLOR = "yellow";

const Cable: React.FC<CableProps> = ({ points, width, cycleSeconds }) => {
  const t = useClock();
  const progress = useDerivedValue(() => {
    const timeInSeconds = t.value / 1000; // Convert milliseconds to seconds
    return (timeInSeconds % cycleSeconds) / cycleSeconds;
  }, [cycleSeconds]);

  const dims = {
    x: points.to.x - points.from.x,
    y: points.to.y - points.from.y,
  };

  // cx and cy - the centre of the cable
  const cx = useDerivedValue(() => points.from.x + dims.x * progress.value);
  const cy = useDerivedValue(() => points.from.y + dims.y * progress.value);

  return (
    <>
      <Line
        p1={points.from}
        p2={points.to}
        color={CABLE_COLOR}
        strokeWidth={width}
      />
      <Circle r={width / 2} color={ELECTRON_COLOR} cx={cx} cy={cy} />
      <Norway width={200} height={100} center={points.to} />
    </>
  );
};

export default Cable;

// icons for difference countries

type FlagProps = {
  center: { x: number; y: number };
  width: number;
  height: number;
};

const FLAG_COLORS = {
  red: "#CE1126",
  white: "#FFFFFF",
  blue: "#002654",
  orange: "#fdda25",
  black: "#000000",
  green: "#169b62",
};

const triColourDimensions = ({ center, height, width }: FlagProps) => {
  return {
    topY: center.y - height / 2,
    leftX: center.x - width * (1 / 3),
    rightX: center.x + width * (1 / 3),
    stripeWidth: width / 3,
  };
};

type TricolorFlagProps = FlagProps & {
  color1: string;
  color2: string;
  color3: string;
};

const TricolorFlag: React.FC<TricolorFlagProps> = ({
  width,
  height,
  center,
  color1,
  color2,
  color3,
}) => {
  const d = triColourDimensions({ center, width, height });
  const props = { width: d.stripeWidth, height: height, y: d.topY };

  return (
    <>
      <Rect {...props} x={d.leftX} color={color1} />
      <Rect {...props} x={center.x} color={color2} />
      <Rect {...props} x={d.rightX} color={color3} />
    </>
  );
};

const France: React.FC<FlagProps> = (p) => (
  <TricolorFlag
    {...p}
    color1={FLAG_COLORS.red}
    color2={FLAG_COLORS.white}
    color3={FLAG_COLORS.blue}
  />
);

const Belgium: React.FC<FlagProps> = (p) => (
  <TricolorFlag
    {...p}
    color1={FLAG_COLORS.red}
    color2={FLAG_COLORS.orange}
    color3={FLAG_COLORS.black}
  />
);

const Ireland: React.FC<FlagProps> = (p) => (
  <TricolorFlag
    {...p}
    color1={FLAG_COLORS.green}
    color2={FLAG_COLORS.white}
    color3={FLAG_COLORS.orange}
  />
);

const Netherlands: React.FC<FlagProps> = ({ width, height, center }) => {
  const leftX = center.x - width / 2;

  const props = {
    x: leftX,
    height: height / 3,
  };

  const topY = center.y - height / 2;
  const y2 = topY + height / 3;
  const y3 = topY + (height * 2) / 3;

  return (
    <>
      <Rect y={topY} width={width} {...props} color={FLAG_COLORS.red} />
      <Rect y={y2} width={width} {...props} color={FLAG_COLORS.white} />
      <Rect y={y3} width={width} {...props} color={FLAG_COLORS.blue} />
    </>
  );
};

const Denmark: React.FC<FlagProps> = ({ width, height, center }) => {
  const topY = center.y - height / 2;
  const topLeft = { x: center.x - width / 2, y: topY };
  const leftX = topLeft.x;
  const stripeWidth = height / 4;
  return (
    <>
      <Rect
        {...topLeft}
        width={width}
        height={height}
        color={FLAG_COLORS.red}
      />
      <Rect
        x={leftX}
        y={topLeft.y + height / 3}
        width={width}
        height={stripeWidth}
        color={FLAG_COLORS.white}
      />
      <Rect
        y={topY}
        x={leftX + width / 3}
        width={stripeWidth}
        height={height}
        color={FLAG_COLORS.white}
      />
    </>
  );
};

const Norway: React.FC<FlagProps> = (p) => {
  const { width, height, center } = p;
  const topY = center.y - height / 2;
  const topLeft = { x: center.x - width / 2, y: topY };
  const leftX = topLeft.x;
  const whiteStripeWidth = height / 4;
  const blueStripeWidth = height / 8;
  const stripeWidthDiff = whiteStripeWidth - blueStripeWidth ;
  return (
    <>
     <Denmark {...p}/>
      <Rect
        x={leftX}
        y={topLeft.y + height / 3 + stripeWidthDiff / 2}
        width={width}
        height={blueStripeWidth}
        color={FLAG_COLORS.blue}
      />
      
      <Rect
        x={leftX + width / 3 + stripeWidthDiff / 2}
        y={topY}
        width={blueStripeWidth}
        height={height}
        color={FLAG_COLORS.blue}
      />

    </>
  );
};
