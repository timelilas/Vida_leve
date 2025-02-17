import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface UseProgressBarAnimationParams {
  duration: number;
  barWidthFraction: number;
}

export function useProgressBarAnimation(params: UseProgressBarAnimationParams) {
  const animatedValue = useRef(new Animated.Value(0));
  const progressPercentage = animatedValue.current.interpolate({
    inputRange: [0.0, 1.0],
    outputRange: ["0%", "100%"],
  });

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      toValue: params.barWidthFraction,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
      duration: params.duration,
    }).start();
  }, [params.barWidthFraction]);

  return {
    progressPercentage,
  };
}
