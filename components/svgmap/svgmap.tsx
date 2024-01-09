import { Canvas, useSVG, ImageSVG, Group } from "@shopify/react-native-skia";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSharedValue, useDerivedValue } from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { GestureMode } from "../types";
import { useWindowDimensions } from "react-native";
import * as tools from "./tools";
import { Gas } from "./gas";
import { Wind } from "./wind";

const WithMap: React.FC = () => {
  const skSvg = useSVG(tools.GB_MAP_SOURCE);
  if (!skSvg) return null;
  return <WithSvg skSvg={skSvg} />;
};

const WithSvg: React.FC<tools.WithSvgProps> = ({ skSvg }) => {
  const screen = useWindowDimensions();
  const gestureMode = useSharedValue<GestureMode>("none");
  const zoomPan = useSharedValue<tools.ZoomPanSharedValueState>(
    tools.getInitialZoomPanSharedValueState({ screen })
  );

  // gestues

  const pan = Gesture.Pan()
    .onBegin(() => (gestureMode.value = "pan"))
    .onEnd(() => (gestureMode.value = "none"))
    .onChange((event) => tools.onPanChange({ event, zoomPan, screen }));

  const pinch = Gesture.Pinch()
    .onBegin((e) => (gestureMode.value = "pinch"))
    .onEnd((e) => (gestureMode.value = "none"))
    .onChange((event) => tools.onPinchChange({ event, zoomPan, screen }));

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd((e) => {
      tools.onSingleTap({ event: e, zoomPan, screen });
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((e) => {
      tools.onDoubleTap({ event: e, zoomPan, screen });
    });

  const gesture = Gesture.Race(pinch, pan, doubleTap, singleTap);

  const transformD = useDerivedValue(() => [
    { translateX: zoomPan.value.translateX },
    { translateY: zoomPan.value.translateY },
    { scale: zoomPan.value.scale },
  ]);

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ flex: 1, backgroundColor: tools.BACKGROUND_COLOR }}
      >
        <Group transform={transformD}>
          <ImageSVG svg={skSvg} />

          <>
            {/* rockall */}
            <Gas
              point={tools.calculatePoint({ lat: 57.596306, lon: -8.58 })}
              gestureMode={gestureMode}
              height={30}
              cycleSeconds={10}
            />

            <Gas
              point={tools.calculatePoint({ lat: 52.48, lon: 1.76 })}
              gestureMode={gestureMode}
              height={30}
              cycleSeconds={10}
            />

            {/* lands end */}
            <Gas
              point={tools.calculatePoint({ lat: 50.065, lon: -5.715 })}
              gestureMode={gestureMode}
              height={30}
              cycleSeconds={10}
            />

            <Wind
              point={tools.calculatePoint({ lat: 50.065, lon: -5.715 })}
              gestureMode={gestureMode}
              height={30}
              cycleSeconds={10}
            />

            <Wind
              point={tools.calculatePoint({ lat: 53, lon: 4 })}
              gestureMode={gestureMode}
              height={30}
              cycleSeconds={10}
            />
          </>
        </Group>
      </Canvas>
    </GestureDetector>
  );
};

export default () => (
  <SafeAreaProvider>
    <WithMap />
  </SafeAreaProvider>
);
