import { useCallback, useEffect, useRef, useState } from "react";

export function useThrottle(throttleTime: number) {
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isTimeCounting) return;

    timerRef.current = setTimeout(() => {
      setIsTimeCounting(false);
    }, throttleTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimeCounting]);

  const startThrottler = useCallback(() => {
    if (!isTimeCounting) {
      setIsTimeCounting(true);
    }
  }, [isTimeCounting]);

  return { isThrottling: isTimeCounting, startThrottler };
}
