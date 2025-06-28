import { useEffect } from "react";
import { ViewProps } from "react-native";
import Reanimated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export function ModalContainer(props: ViewProps) {
  const { style, ...propsRest } = props;
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(sv.value, [0, 1], [0.3, 1])
  }));

  useEffect(() => {
    sv.set(
      withTiming(1, {
        easing: Easing.out(Easing.ease),
        duration: 200,
        reduceMotion: ReduceMotion.System
      })
    );
  }, [sv]);

  return <Reanimated.View style={[style, animatedStyle]} {...propsRest} />;
}
