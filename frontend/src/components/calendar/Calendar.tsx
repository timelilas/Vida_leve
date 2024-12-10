import { DateData } from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import { CalendarMenu } from "./CalendarMenu";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarSection } from "./types";
import { CustomCalendarBody } from "../../libs/react-native-calendars/CustomCalendarBody";
import { CalendarFooterButton } from "./CalendarFooterButton";
import { memo } from "react";

interface CalendarProps {
  month: number;
  year: number;
  currentDate?: DateData;
  section: CalendarSection;
  incrementMonth: () => void;
  decrementMonth: () => void;
  incrementYear: () => void;
  decrementYear: () => void;
  setSection: (section: CalendarSection) => void;
  setCurrentDate: (date: DateData) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  clear: () => void;
  close: () => void;
  confirm: () => void;
}

export const Calendar = memo(
  (props: CalendarProps) => {
    if (props.section !== "calendar") {
      return (
        <CalendarMenu
          section={props.section}
          month={props.month}
          year={props.year}
          selectMonth={props.setMonth}
          selectYear={props.setYear}
          selectSection={props.setSection}
        />
      );
    }

    return (
      <View style={styles.container}>
        <CalendarHeader
          incrementMonth={props.incrementMonth}
          decrementMonth={props.decrementMonth}
          incrementYear={props.incrementYear}
          decrementYear={props.decrementYear}
          selectMenu={props.setSection}
          month={props.month}
          year={props.year}
        />
        <CustomCalendarBody
          key={`${props.year}-${props.month}`}
          targetDate={props.currentDate}
          onDayPress={(date) => {
            props.setCurrentDate(date);
            props.setMonth(date.month);
            props.setYear(date.year);
          }}
          current={`${props.year}-${props.month}`}
        />
        <View style={styles.footer}>
          <CalendarFooterButton
            onPress={props.clear}
            label="Limpar"
            style={styles.leftFooterButton}
          />
          <CalendarFooterButton onPress={props.close} label="Cancelar" />
          <CalendarFooterButton onPress={props.confirm} label="Ok" />
        </View>
      </View>
    );
  },
  (prev, next) => {
    const equalYears = prev.year === next.year;
    const equalMonths = prev.month === next.month;
    const equalDates = prev.currentDate === next.currentDate;
    const equalSections = prev.section === next.section;

    return equalYears && equalMonths && equalDates && equalSections;
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#EFF0F6",
    borderRadius: 16,
    borderColor: "#CAC4D0",
    borderWidth: 1,
    padding: 8,
  },
  footer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  leftFooterButton: {
    marginRight: "auto",
  },
});
