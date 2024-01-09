// tools for svgmap canvas, such as zoom, pan, etc.
import { SkSVG } from "@shopify/react-native-skia";
import { ScaledSize } from "react-native";
import {
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PinchGestureHandlerEventPayload,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
// gb map

export type GestureModeSharedValueState = "pan" | "zoom" | "none";

export type ZoomPanSharedValueState = {
  translateX: number;
  translateY: number;
  scale: number;
};

export const GB_MAP_SOURCE = require("./gb.svg");

type Bounds = {
  west: number;
  east: number;
  south: number;
  north: number;
};

export const GB_SVG_DIMS = {
  width: 1000,
  height: 1870,
  bounds: {
    land: { west: -8.58, east: 1.76, south: 49.85, north: 60.4 } as Bounds,
    offshore: { west: -8.58, east: 3, south: 49.85, north: 60.4 } as Bounds, // includes offshore wind
  },
};

export type GetInitialZoomPanSharedValueStateParams = {
  screen: ScaledSize;
};

export const BACKGROUND_COLOR = "lightblue";
export const MAX_SCALE = 2.0;
export const SCREEN_MARGIN_PIXELS = 50;

const getUsableScreenSize = (screen: ScaledSize) => {
  "worklet";
  return {
    width: screen.width - SCREEN_MARGIN_PIXELS,
    height: screen.height - SCREEN_MARGIN_PIXELS,
  };
};

export type Coords = { lat: number; lon: number };
export type Point = { x: number; y: number };
export type WithSvgProps = { skSvg: SkSVG };

/* given a set of coords, use the Mercator projection to calculate the corresponding point on the map*/
export const calculatePoint = (coords: Coords): Point => {
  "worklet";
  const { lat, lon } = coords;
  var latRad = (lat * Math.PI) / 180;
  var lonRad = (lon * Math.PI) / 180;
  const bounds = GB_SVG_DIMS.bounds.land;

  // Normalize longitude based on GB_SVG_DIMS
  var normalizedLon =
    (lonRad - (bounds.west * Math.PI) / 180) /
    ((bounds.east * Math.PI) / 180 - (bounds.west * Math.PI) / 180);

  // Mercator projection for y
  var mercatorY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));

  // Normalizing Y based on GB_SVG_DIMS
  var northRad = (bounds.north * Math.PI) / 180;
  var southRad = (bounds.south * Math.PI) / 180;
  var normalizedNorthY = Math.log(Math.tan(Math.PI / 4 + northRad / 2));
  var normalizedSouthY = Math.log(Math.tan(Math.PI / 4 + southRad / 2));

  // Normalize and scale y coordinate
  var normalizedY =
    (mercatorY - normalizedSouthY) / (normalizedNorthY - normalizedSouthY);
  normalizedY = 1 - normalizedY; // Invert Y to match SVG coordinates

  // Scale coordinates to fit SVG dimensions
  var x = normalizedLon * GB_SVG_DIMS.width;
  var y = normalizedY * GB_SVG_DIMS.height;

  const point = { x: x, y: y };

  return point;
};

/* given a point on the map, use the Mercator projection to calculate the corresponding coords */
export const calculateCoords = (point: Point) => {
  "worklet";
  const { x, y } = point;

  // Scale pixel coordinates back to normalized coordinates
  var normalizedLon = x / GB_SVG_DIMS.width;
  var normalizedY = y / GB_SVG_DIMS.height;
  normalizedY = 1 - normalizedY; // Invert Y back
  const bounds = GB_SVG_DIMS.bounds.land;

  // Convert normalized longitude back to radians
  var lonRad =
    normalizedLon *
      ((bounds.east * Math.PI) / 180 - (bounds.west * Math.PI) / 180) +
    (bounds.west * Math.PI) / 180;

  // Invert Mercator projection for latitude
  var normalizedSouthY = Math.log(
    Math.tan(Math.PI / 4 + (bounds.south * Math.PI) / 180 / 2)
  );
  var normalizedNorthY = Math.log(
    Math.tan(Math.PI / 4 + (bounds.north * Math.PI) / 180 / 2)
  );
  var mercatorY =
    normalizedY * (normalizedNorthY - normalizedSouthY) + normalizedSouthY;
  var latRad = 2 * (Math.atan(Math.exp(mercatorY)) - Math.PI / 4);

  // Convert radians back to degrees
  var lat = (latRad * 180) / Math.PI;
  var lon = (lonRad * 180) / Math.PI;

  const coords = { lat, lon };
  return coords;
};

const calculateSvgDims = (scale: number) => {
  "worklet";
  return {
    width: GB_SVG_DIMS.width * scale,
    height: GB_SVG_DIMS.height * scale,
  };
};

const calculateMinScale = (screen: ScaledSize) => {
  "worklet";
  const usableScreen = getUsableScreenSize(screen);
  const scale = Math.min(
    usableScreen.height / GB_SVG_DIMS.height,
    usableScreen.width / GB_SVG_DIMS.width
  );
  return scale;
};

/* 
determine the correct initial zoom/pan state for the screen
1. scale the map to center the screen, after applying a bias to the initial translation in both x and y
2. set the initial zoom level as ratio of the screen size to the map size
*/
export const getInitialZoomPanSharedValueState = ({
  screen,
}: GetInitialZoomPanSharedValueStateParams): ZoomPanSharedValueState => {
  const scale = calculateMinScale(screen);

  const svgDims = calculateSvgDims(scale);

  // calculate any difference between the screen size and the scaled map size
  const widthDiff = screen.width - svgDims.width;
  const heightDiff = screen.height - svgDims.height;

  // halve the difference to center the map
  const translateX = widthDiff / 2;
  const translateY = heightDiff / 2;

  return { translateX, translateY, scale };
};

type ZoomPanValue = {
  value: ZoomPanSharedValueState;
};

type OnPanChangeEvent = {
  screen: ScaledSize;
  event: GestureUpdateEvent<PanGestureChangeEventPayload>;
  zoomPan: ZoomPanValue;
};


/* 
Given a pan event, update the zoom/pan map state
Prevent the map from being panned off the screen according to the current zoom level, screen size and GB_LATLON_BOUNDS_MARGIN constant
*/
export const onPanChange = ({ event, zoomPan, screen }: OnPanChangeEvent) => {
  "worklet";
  const { changeX, changeY } = event;

  const scale = zoomPan.value.scale;
  if (scale === calculateMinScale(screen)) {
    // if we're at the minimum zoom level, don't allow the map to be panned
    return;
  }

  const proposed = {
    translateX: zoomPan.value.translateX + changeX,
    translateY: zoomPan.value.translateY + changeY,
  };

  zoomPan.value = {
    ...proposed,
    scale: zoomPan.value.scale,
  };
};

type OnPinchChangeEvent = {
  event: PinchGestureHandlerEventPayload;
  zoomPan: ZoomPanValue;
  screen: ScaledSize;
};

/* 
Given a pinch event, update the zoom/pan map state 
the main tricky task is to make sure the point where the user's fingers are pinching should remain in the same place on the screen, even as the image scales.
*/
export const onPinchChange = ({
  event,
  zoomPan,
  screen,
}: OnPinchChangeEvent) => {
  "worklet";

  const { focalX, focalY, scale } = event;
  const newScale = scale * zoomPan.value.scale;
  // stop if we're going to zoom too far in or out
  if (newScale > MAX_SCALE || newScale < calculateMinScale(screen)) {
    return;
  }
  // Calculate the scale change factor
  const scaleChangeFactor = newScale / zoomPan.value.scale;

  // Adjust translation to keep the focal point stationary
  const newTranslateX =
    focalX - (focalX - zoomPan.value.translateX) * scaleChangeFactor;
  const newTranslateY =
    focalY - (focalY - zoomPan.value.translateY) * scaleChangeFactor;

  zoomPan.value = {
    scale: newScale,
    translateX: newTranslateX,
    translateY: newTranslateY,
  };
};

type OnDoubleTapEvent = {
  event: GestureUpdateEvent<TapGestureHandlerEventPayload>;
  zoomPan: ZoomPanValue;
  screen: ScaledSize;
};

/* 
if double zapped:
1. If the zoom level is closer to the min zoom level, zoom in
2. If the zoom level is closer to the max zoom level, zoom out
*/
export const onDoubleTap = ({ event, zoomPan, screen }: OnDoubleTapEvent) => {
  "worklet";
  const currentScale = zoomPan.value.scale;
  const minScale = calculateMinScale(screen);
  const zoomIn = currentScale < (MAX_SCALE + minScale) / 2;
  const newScale = zoomIn ? MAX_SCALE : minScale;

  if (zoomIn) {
    // Calculate the scale change factor
    const scaleChangeFactor = newScale / zoomPan.value.scale;
    // Adjust translation to keep the focal point stationary
    const { absoluteX, absoluteY } = event;
    const newTranslateX =
      absoluteX - (absoluteX - zoomPan.value.translateX) * scaleChangeFactor;
    const newTranslateY =
      absoluteY - (absoluteY - zoomPan.value.translateY) * scaleChangeFactor;
    zoomPan.value = {
      scale: newScale,
      translateX: newTranslateX,
      translateY: newTranslateY,
    };
  } else {
    const svgDims = calculateSvgDims(newScale);
    // calculate any difference between the screen size and the scaled map size
    const widthDiff = screen.width - svgDims.width;
    const heightDiff = screen.height - svgDims.height;
    // halve the difference to center the map
    zoomPan.value = {
      scale: newScale,
      translateX: widthDiff / 2,
      translateY: heightDiff / 2,
    };
  }
};



type OnSingleTapEvent = {
  event: GestureUpdateEvent<TapGestureHandlerEventPayload>;
  zoomPan: ZoomPanValue;
  screen: ScaledSize;
};

/* 
if single tapped:
1. 
2. If the zoom level is closer to the max zoom level, zoom out
*/
export const onSingleTap = ({ event, zoomPan, screen }: OnSingleTapEvent) => {
  'worklet'
  const coord = calculateCoords({ x: event.absoluteX, y: event.absoluteY });
  console.log("single tap", coord);
}