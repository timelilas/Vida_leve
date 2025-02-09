import { PressableProps, Text, View } from "react-native";
import { ToggleButton } from "../buttons/ToggleButton";
import { StyleSheet } from "react-native";
import {
  getMonthNameFromIndex,
  getWeekdayFromIndex,
} from "../../utils/helpers";
import { DateData } from "./types";
import { memo } from "react";

interface DayItemProps extends PressableProps {
  selected: boolean;
  dateData: DateData;
}

export const DayItemButton = memo(
  (props: DayItemProps) => {
    const { dateData, selected, ...propsRest } = props;

    const monthName = getMonthNameFromIndex(dateData.month);
    const weekdayName = getWeekdayFromIndex(dateData.weekDay);

    const parsedDay = `0${dateData.day}`.slice(-2);
    const parsedMonthName = monthName.toUpperCase().slice(0, 3);
    const parsedWeekday = weekdayName.toUpperCase().slice(0, 3);

    return (
      <ToggleButton
        selected={selected}
        backgroundColor="#EFF0F6"
        {...propsRest}
      >
        <View
          style={[styles.container, props.disabled && styles.containerDisabled]}
        >
          <Text style={[styles.text, props.disabled && styles.textDisabled]}>
            {parsedWeekday}, {parsedDay} {parsedMonthName}.
          </Text>
        </View>
      </ToggleButton>
    );
  },
  (prev, current) => prev.selected === current.selected
);

const styles = StyleSheet.create({
  container: {
    paddingBlock: 8,
    width: 96,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-300",
    color: "#242424",
  },
  textDisabled: {
    color: "#868686",
  },
  containerDisabled: {
    opacity: 0.5,
  },
});
