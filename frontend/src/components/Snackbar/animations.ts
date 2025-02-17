import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { Animated, View } from "react-native";

interface SnackbarAnimationParams {
  snackbarRef: MutableRefObject<View | null>;
  duration: number;
}

export function useSnackbarAnimation(params: SnackbarAnimationParams) {
  const { duration, snackbarRef } = params;
  const [isVisible, setIsVisible] = useState(true);
  const animtedValue = useRef(new Animated.Value(0));
  const snackbarHeight = useRef(0);
  const baseAnimatedProps = { useNativeDriver: true, bounciness: 3, speed: 14 };

  useLayoutEffect(() => {
    snackbarRef.current?.measure((...rects) => {
      snackbarHeight.current = rects[3];
      animtedValue.current = new Animated.Value(rects[3]);
    });
  }, []);

  useEffect(() => {
    const timerRef = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timerRef);
  }, [setIsVisible]);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(animtedValue.current, {
        ...baseAnimatedProps,
        toValue: 0,
      }).start();
    } else {
      Animated.spring(animtedValue.current, {
        ...baseAnimatedProps,
        toValue: snackbarHeight.current,
      }).start();
    }
  }, [isVisible]);

  return {
    animtedValue: animtedValue.current,
  };
}
