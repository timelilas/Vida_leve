import { useCallback, useEffect, useRef, useState } from "react";

export function useThrottle(throttleTime: number) {
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const callbackRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimeCounting) {
      timerRef.current = setTimeout(() => {
        callbackRef.current?.();
        setIsTimeCounting(false);
      }, throttleTime);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTimeCounting]);

  const throttler = useCallback(
    (callback: () => void) => {
      if (isTimeCounting) {
        callbackRef.current = callback;
      } else {
        callback();
        setIsTimeCounting(true);
        callbackRef.current = null;
      }
    },
    [isTimeCounting, setIsTimeCounting]
  );

  const clearThrottler = useCallback(() => {
    setIsTimeCounting(false);
    callbackRef.current = null;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [setIsTimeCounting]);

  return { throttler, clearThrottler };
}
