import {
  DateData,
  Calendar as ReactNativeCalendar,
  LocaleConfig,
  CalendarProps,
} from "react-native-calendars";
import { ptBR } from "./localeConfig";
import { StyleSheet, View } from "react-native";

interface CustomCalendarBodyProps {
  onDayPress?: (date: DateData) => void;
  targetDate?: DateData;
  current?: string;
}

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export function CustomCalendarBody(props: CustomCalendarBodyProps) {
  const today = new Date().toLocaleDateString("pt-br").split("/");

  return (
    <ReactNativeCalendar
      current={props.current}
      hideArrows
      style={baseStyles.container}
      date={props.current}
      customHeaderTitle={<View style={{ display: "none" }} />}
      markingType="custom"
      maxDate={`${today[2]}-${today[1]}-${today[0]}`}
      markedDates={
        props.targetDate && {
          [props.targetDate.dateString]: { customStyles: markedStyles },
        }
      }
      onDayPress={props.onDayPress}
      theme={theme}
    />
  );
}

const baseStyles = StyleSheet.create({
  container: {
    padding: 0,
  },
  textDay: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    color: "#1D1B20",
  },
});

const markedStyles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
  },
  container: {
    backgroundColor: "#3AA1A8",
    borderRadius: 20,
  },
});

const theme: CalendarProps["theme"] = {
  todayTextColor: "#e45f5f",
  calendarBackground: "#EFF0F6",
  textDisabledColor: "#827e8a",
  textDayHeaderFontSize: 16,
  textDayHeaderFontFamily: "Roboto-400",
  textSectionTitleColor: "#1D1B20",
  textDayStyle: baseStyles.textDay,
};
