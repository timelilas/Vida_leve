import { useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

export function useExpansionAnimation(props: { isItemExpanded: boolean }) {
  const { isItemExpanded } = props;
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    sharedValue.set(
      withTiming(isItemExpanded ? 1 : 0, {
        easing: Easing.out(Easing.ease),
        duration: 300,
        reduceMotion: ReduceMotion.System,
      })
    );
  }, [isItemExpanded]);

  return {
    value: sharedValue,
  };
}
