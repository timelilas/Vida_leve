import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { DateFilterContext } from "./DateFilterContext";
import { convertDateToLocalDateData } from "../../utils/helpers";
import { DateIntervalType, PlainDate } from "../../@types";
import { useDebounce } from "../../hooks/common/useDebounce";

export function DateFilterProvider({ children }: PropsWithChildren) {
  const localDateData = useMemo(() => convertDateToLocalDateData(new Date()), []);
  const { isDebouncing, startDebounce } = useDebounce(300);
  const [intervalType, setIntervalType] = useState<DateIntervalType>("monthly");
  const [dateData, setDateData] = useState<PlainDate>({
    year: localDateData.year,
    month: localDateData.month,
    day: localDateData.day,
    weekDay: localDateData.weekDay
  });

  const updateDateDate = useCallback(
    (date: Date, withDebounce?: boolean) => {
      if (withDebounce) startDebounce();
      setDateData({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        weekDay: date.getDay()
      });
    },
    [startDebounce]
  );

  const updateIntervalType = useCallback((type: DateIntervalType) => {
    setIntervalType(type);
  }, []);

  return (
    <DateFilterContext.Provider
      value={{ dateData, intervalType, isDebouncing, updateDateDate, updateIntervalType }}>
      {children}
    </DateFilterContext.Provider>
  );
}
