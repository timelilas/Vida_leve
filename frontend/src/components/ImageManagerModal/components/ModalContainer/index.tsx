import { useEffect } from "react";
import { Platform, useWindowDimensions, ViewProps } from "react-native";
import Reanimated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { WEB_SCREEN_WIDTH_BREAKPOINT } from "../../../../constants/webConstants";
import { styles as commonStyles } from "../../styles";

export function ModalContainer(props: ViewProps) {
  const { style, ...propsRest } = props;
  const sv = useSharedValue(0);
  const dimensions = useWindowDimensions();
  const isWebDesktop =
    Platform.OS === "web" && dimensions.width >= WEB_SCREEN_WIDTH_BREAKPOINT;

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

  return (
    <Reanimated.View
      style={[
        commonStyles.container,
        isWebDesktop && commonStyles.modalWebDesktop,
        animatedStyle
      ]}
      {...propsRest}
    />
  );
}
