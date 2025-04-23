import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { DateFilterContext } from "./DateFilterContext";
import { convertDateToLocalDateData } from "../../utils/helpers";
import { DateIntervalType, PlainDate } from "../../@types";

export function DateFilterProvider({ children }: PropsWithChildren) {
  const localDateData = useMemo(() => convertDateToLocalDateData(new Date()), []);

  const [intervalType, setIntervalType] = useState<DateIntervalType>("monthly");
  const [dateData, setDateData] = useState<PlainDate>({
    year: localDateData.year,
    month: localDateData.month,
    day: localDateData.day,
    weekDay: localDateData.weekDay
  });

  const updateDateDate = useCallback((date: Date) => {
    setDateData({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      weekDay: date.getDay()
    });
  }, []);

  const updateIntervalType = useCallback((type: DateIntervalType) => {
    setIntervalType(type);
  }, []);

  return (
    <DateFilterContext.Provider
      value={{ dateData, intervalType, updateDateDate, updateIntervalType }}>
      {children}
    </DateFilterContext.Provider>
  );
}
