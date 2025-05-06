import { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  Easing,
  interpolate,
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";

interface UseWeightItemAnimationParams {
  itemHeight: number;
  itemMarginBottom: number;
}

export function useWeightItemAnimation(params: UseWeightItemAnimationParams) {
  const { itemHeight, itemMarginBottom } = params;
  const { width: screenWidth } = useWindowDimensions();
  const [isDeleteAnimationFinished, setIsDeleteAnimationFinished] = useState(false);

  const heightInterpolation = [itemHeight, itemHeight, 0];
  const marginBottomInterpolation = [itemMarginBottom, itemMarginBottom, 0];

  const sharedValue = useSharedValue(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(sharedValue.value, [0, 0.5], [0, -screenWidth]) }],
    opacity: interpolate(sharedValue.value, [0, 0.5], [1, 0]),
    height: interpolate(sharedValue.value, [0, 0.5, 1], heightInterpolation),
    marginBottom: interpolate(sharedValue.value, [0, 0.5, 1], marginBottomInterpolation)
  }));

  useEffect(() => {
    if (isAnimationStarted) {
      sharedValue.set(
        withSequence(
          withTiming(0.5, {
            easing: Easing.out(Easing.ease),
            duration: 550,
            reduceMotion: ReduceMotion.System
          }),
          withTiming(
            1,
            {
              easing: Easing.out(Easing.ease),
              duration: 200,
              reduceMotion: ReduceMotion.System
            },
            () => {
              runOnJS(setIsDeleteAnimationFinished)(true);
            }
          )
        )
      );
    }
  }, [sharedValue, isAnimationStarted]);

  const startDeleteAnimation = useCallback(() => {
    setIsAnimationStarted(true);
  }, []);

  return {
    animatedStyles,
    isDeleteAnimationFinished,
    startDeleteAnimation
  };
}
