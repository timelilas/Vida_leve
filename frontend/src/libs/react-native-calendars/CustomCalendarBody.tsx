import {
  DateData,
  Calendar as ReactNativeCalendar,
  LocaleConfig,
  CalendarProps
} from "react-native-calendars";
import { ptBR } from "./localeConfig";
import { View } from "react-native";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { baseStyles, markedStyles } from "./styles";

interface CustomCalendarBodyProps {
  onDayPress?: (date: DateData) => void;
  targetDate?: DateData;
  current?: string;
}

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export function CustomCalendarBody(props: CustomCalendarBodyProps) {
  const today = new Date().toLocaleDateString("pt-br").split("/");
  const headerTitlte = <View style={{ display: "none" }} />;

  return (
    <ReactNativeCalendar
      hideArrows
      onDayPress={props.onDayPress}
      date={props.current}
      current={props.current}
      maxDate={`${today[2]}-${today[1]}-${today[0]}`}
      theme={theme}
      markingType="custom"
      style={baseStyles.container}
      customHeaderTitle={headerTitlte}
      markedDates={
        props.targetDate && {
          [props.targetDate.dateString]: { customStyles: markedStyles }
        }
      }
    />
  );
}

const theme: CalendarProps["theme"] = {
  todayTextColor: "#e45f5f",
  calendarBackground: colors.background.primary,
  textDisabledColor: "#827e8a",
  textDayHeaderFontSize: 16,
  textDayHeaderFontFamily: fonts.robotoRegular,
  textSectionTitleColor: "#1D1B20",
  textDayStyle: baseStyles.textDay
};
