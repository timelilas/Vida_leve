import { View } from "react-native";
import { CalendarSwipeButton } from "../CalendarSwipeButton";
import { CalendarControlButton } from "../CalendarControlButton";
import { useCalendarHeaderStyles } from "./useCalendarHeaderStyles";
import { numberToMonth, toCapitalized } from "../../../utils/helpers";
import { memo } from "react";
import { CalendarSection } from "../types";

interface CalendarHeaderProps {
  year: number;
  month: number;
  incrementMonth: () => void;
  decrementMonth: () => void;
  incrementYear: () => void;
  decrementYear: () => void;
  selectMenu: (section: CalendarSection) => void;
}

export const CalendarHeader = memo(
  (props: CalendarHeaderProps) => {
    const styles = useCalendarHeaderStyles();
    const monthShortName = numberToMonth(props.month).slice(0, 3);

    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <CalendarSwipeButton
            direction="left"
            onPress={props.decrementMonth}
          />
          <CalendarControlButton
            label={toCapitalized(monthShortName)}
            onPress={() => props.selectMenu("month")}
          />
          <CalendarSwipeButton
            direction="right"
            onPress={props.incrementMonth}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <CalendarSwipeButton direction="left" onPress={props.decrementYear} />
          <CalendarControlButton
            label={`${props.year}`}
            onPress={() => props.selectMenu("year")}
          />
          <CalendarSwipeButton
            direction="right"
            onPress={props.incrementYear}
          />
        </View>
      </View>
    );
  },
  (prev, next) => prev.month === next.month && prev.year === next.year
);
