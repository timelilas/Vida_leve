import { Text, TouchableOpacity, View } from "react-native";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { styles } from "./styles";
import { getMonthNameFromIndex, toCapitalized } from "../../utils/helpers";
import { useEffect, useRef, useState } from "react";

interface TimeRangeNavigatorProps {
  intervalType: "monthly" | "weekly";
  onChange: (date: Date) => void;
}

function generateMidnightDate(date: Date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function TimeRangeNavigator(props: TimeRangeNavigatorProps) {
  const { intervalType } = props;
  const firstRender = useRef(true);
  const todayDate = generateMidnightDate(new Date());

  const [dateData, setDateData] = useState({
    year: todayDate.getUTCFullYear(),
    month: todayDate.getUTCMonth(),
    day: todayDate.getUTCDate(),
  });

  useEffect(() => {
    if (!firstRender.current) {
      const { year, month, day } = dateData;
      props.onChange(new Date(year, month, day));
    } else {
      firstRender.current = false;
    }
  }, [dateData, props.onChange]);

  function getMaxDate() {
    const day = todayDate.getUTCDate();
    const month = todayDate.getUTCMonth();
    const year = todayDate.getUTCFullYear();
    const weekDay = todayDate.getUTCDay();
    return intervalType === "monthly"
      ? new Date(year, month, 1)
      : new Date(year, month, day + 6 - weekDay);
  }

  function getMinDate() {
    const month = todayDate.getUTCMonth();
    const year = todayDate.getUTCFullYear();
    return intervalType === "monthly"
      ? new Date(year - 1, month + 1, 1)
      : new Date(year - 1, month + 1, 1);
  }

  function decrementDate() {
    setDateData((prev) => {
      const { year, month, day } = prev;
      const nextDate = new Date(
        year,
        intervalType === "monthly" ? month - 1 : month,
        intervalType === "monthly" ? 1 : day - 7
      );
      return nextDate < getMinDate()
        ? prev
        : {
            year: nextDate.getUTCFullYear(),
            month: nextDate.getUTCMonth(),
            day: nextDate.getUTCDate(),
          };
    });
  }

  function incrementDate() {
    setDateData((prev) => {
      const { year, month, day } = prev;
      const nextDate = new Date(
        year,
        intervalType === "monthly" ? month + 1 : month,
        intervalType === "monthly" ? 1 : day + 7
      );
      return nextDate > getMaxDate()
        ? prev
        : {
            year: nextDate.getUTCFullYear(),
            month: nextDate.getUTCMonth(),
            day: nextDate.getUTCDate(),
          };
    });
  }

  function getWeekRangeFromWeekOffset() {
    const { year, month, day } = dateData;
    const date = new Date(year, month, day);
    const weekDay = date.getUTCDay();

    const startDayOffset = day - weekDay;
    const endDayOffset = day + 6 - weekDay;

    return {
      start: new Date(year, month, startDayOffset),
      end: new Date(year, month, endDayOffset),
    };
  }

  function createMonthlyLabel() {
    const { year, month, day } = dateData;
    const localMonthIndex = new Date(year, month, day).getMonth();
    const localMonthName = getMonthNameFromIndex(localMonthIndex);
    return `${toCapitalized(localMonthName)} - ${dateData.year}`;
  }

  function createWeeklyLabel(range: { start: Date; end: Date }) {
    const { start, end } = range;

    const startMonthName = getMonthNameFromIndex(start.getMonth());
    const startDay = `0${start.getDate()}`.slice(-2);
    const startLabel = `${startDay} de ${toCapitalized(startMonthName)}`;

    const endMonthName = getMonthNameFromIndex(end.getMonth());
    const endDay = `0${end.getDate()}`.slice(-2);
    const endLabel = `${endDay} de ${toCapitalized(endMonthName)}`;

    return `${startLabel} - ${endLabel}`;
  }

  const offsettedWeekRange = getWeekRangeFromWeekOffset();
  const weeklyLabel = createWeeklyLabel(offsettedWeekRange);
  const monthlyLabel = createMonthlyLabel();

  const maxDate = getMaxDate();
  const minDate = getMinDate();

  const currentDate = new Date(dateData.year, dateData.month, dateData.day);

  const incrementDisabled =
    new Date(
      dateData.year,
      dateData.month,
      intervalType === "monthly"
        ? 1
        : dateData.day + 6 - currentDate.getUTCDay()
    ) >= maxDate;

  const decrementDisabled =
    new Date(
      dateData.year,
      dateData.month,
      intervalType === "monthly" ? 1 : dateData.day - currentDate.getUTCDay()
    ) <= minDate;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={decrementDisabled && styles.buttonDisabled}
        disabled={decrementDisabled}
        onPress={decrementDate}
      >
        <ArrowIcon />
      </TouchableOpacity>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {intervalType === "monthly" ? monthlyLabel : weeklyLabel}
        </Text>
      </View>
      <TouchableOpacity
        style={incrementDisabled && styles.buttonDisabled}
        disabled={incrementDisabled}
        onPress={incrementDate}
      >
        <ArrowIcon style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
}
