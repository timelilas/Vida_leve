import { createContext } from "react";
import { DateIntervalType, PlainDate } from "../../@types";

interface DateFilterContextType {
  intervalType: DateIntervalType;
  dateData: PlainDate;
  isDebouncing: boolean;
  updateDateDate: (date: Date, withDebounce?: boolean) => void;
  updateIntervalType: (type: DateIntervalType) => void;
}

export const DateFilterContext = createContext({} as DateFilterContextType);
