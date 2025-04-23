import { createContext } from "react";
import { DateIntervalType, PlainDate } from "../../@types";

interface DateFilterContextType {
  intervalType: DateIntervalType;
  dateData: PlainDate;
  updateDateDate: (date: Date) => void;
  updateIntervalType: (type: DateIntervalType) => void;
}

export const DateFilterContext = createContext({} as DateFilterContextType);
