import { PressableProps, Text, View } from "react-native";
import { ToggleButton } from "../../ToggleButton";
import { styles } from "./styles";
import { getMonthNameFromIndex, getWeekdayFromIndex } from "../../../utils/helpers";
import { DateData } from "../types";
import { memo } from "react";
import { colors } from "../../../styles/colors";

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
        backgroundColor={colors.background.primary}
        {...propsRest}>
        <View style={[styles.container, props.disabled && styles.containerDisabled]}>
          <Text style={[styles.text, props.disabled && styles.textDisabled]}>
            {parsedWeekday}, {parsedDay} {parsedMonthName}.
          </Text>
        </View>
      </ToggleButton>
    );
  },
  (prev, next) => prev.selected === next.selected
);
