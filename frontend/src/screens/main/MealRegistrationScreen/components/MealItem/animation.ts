import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function useAnimation(props: { isItemExpanded: boolean }) {
  const { isItemExpanded } = props;
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      toValue: isItemExpanded ? 1 : 0,
      useNativeDriver: false,
      duration: 250,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [isItemExpanded]);

  return {
    animatedValue: animatedValue.current,
  };
}
