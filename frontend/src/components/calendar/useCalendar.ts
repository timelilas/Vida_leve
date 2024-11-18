import { useCallback, useState } from "react";

export function useCalendar() {
  const [current, setCurrent] = useState({
    month: new Date().getUTCMonth() + 1,
    year: new Date().getUTCFullYear(),
  });

  const incrementYear = useCallback(() => {
    setCurrent((prev) => {
      return {
        ...prev,
        year:
          prev.year === new Date().getUTCFullYear() ? prev.year : prev.year + 1,
      };
    });
  }, []);

  const decrementYear = useCallback(() => {
    setCurrent((prev) => {
      return {
        ...prev,
        year:
          prev.year === new Date().getUTCFullYear() - 99
            ? prev.year
            : prev.year - 1,
      };
    });
  }, []);

  const incrementMonth = useCallback(() => {
    setCurrent((prev) => {
      if (prev.month === 12) {
        if (prev.year < new Date().getUTCFullYear()) {
          return { month: 1, year: prev.year + 1 };
        }
        return prev;
      } else {
        return { ...prev, month: prev.month + 1 };
      }
    });
  }, []);

  const decrementMonth = useCallback(() => {
    setCurrent((prev) => {
      if (prev.month === 1) {
        if (prev.year > new Date().getUTCFullYear() - 99) {
          return { month: 12, year: prev.year - 1 };
        }
        return prev;
      } else {
        return { ...prev, month: prev.month - 1 };
      }
    });
  }, []);

  const setMonth = useCallback((month: number) => {
    setCurrent((prev) => ({ ...prev, month }));
  }, []);

  const setYear = useCallback((year: number) => {
    setCurrent((prev) => ({ ...prev, year }));
  }, []);

  return {
    year: current.year,
    month: current.month,
    incrementYear,
    decrementYear,
    incrementMonth,
    decrementMonth,
    setMonth,
    setYear,
  };
}
