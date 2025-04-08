import { useCallback, useEffect, useRef, useState } from "react";

export function useDebounce(debounceTime: number) {
  const [debounceState, setDebounceState] = useState({
    isTimeCounting: false,
    isToggling: false
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!debounceState.isTimeCounting) return;

    timerRef.current = setTimeout(() => {
      setDebounceState((prev) => ({ ...prev, isTimeCounting: false }));
    }, debounceTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debounceTime, debounceState]);

  const startDebounce = useCallback(() => {
    setDebounceState((prev) => ({ isTimeCounting: true, isToggling: !prev.isToggling }));
  }, []);

  return { isDebouncing: debounceState.isTimeCounting, startDebounce };
}
