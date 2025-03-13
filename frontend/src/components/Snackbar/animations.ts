import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  MutableRefObject,
  useMemo,
} from "react";
import { Animated, View } from "react-native";

interface SnackbarAnimationParams {
  snackbarRef: MutableRefObject<View | null>;
  duration: number;
}

export function useSnackbarAnimation(params: SnackbarAnimationParams) {
  const { duration, snackbarRef } = params;
  const [isVisible, setIsVisible] = useState(true);
  const translateAnimatedValue = useRef(new Animated.Value(0));
  const opacityAnimatedValue = useRef(new Animated.Value(0));
  const snackbarHeight = useRef(0);

  const translateAnimationProps = useMemo(
    () => ({
      useNativeDriver: true,
      bounciness: 2,
      speed: 14,
    }),
    []
  );

  const opacityAnimationProps = useMemo(
    () => ({
      duration: 0,
      useNativeDriver: true,
    }),
    []
  );

  useLayoutEffect(() => {
    snackbarRef.current?.measure((...rects) => {
      snackbarHeight.current = rects[3];
      translateAnimatedValue.current.setValue(rects[3]);
    });
  }, []);

  useEffect(() => {
    const timerRef = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timerRef);
  }, [setIsVisible]);

  useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.timing(opacityAnimatedValue.current, {
          ...opacityAnimationProps,
          toValue: 1,
        }),
        Animated.spring(translateAnimatedValue.current, {
          ...translateAnimationProps,
          toValue: 0,
        }),
      ]).start();
      Animated.spring(translateAnimatedValue.current, {
        ...translateAnimationProps,
        toValue: 0,
      }).start();
    } else {
      Animated.sequence([
        Animated.spring(translateAnimatedValue.current, {
          ...translateAnimationProps,
          toValue: snackbarHeight.current,
        }),
        Animated.timing(opacityAnimatedValue.current, {
          ...opacityAnimationProps,
          toValue: 0,
        }),
      ]).start();
    }
  }, [isVisible, opacityAnimationProps, translateAnimationProps]);

  return {
    translateAnimatedValue: translateAnimatedValue.current,
    opacityAnimatedValue: opacityAnimatedValue.current,
  };
}
