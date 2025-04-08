import { Text, TouchableOpacity, View } from "react-native";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { styles } from "./styles";
import { getMonthNameFromIndex, toCapitalized } from "../../utils/helpers";
import { useEffect, useMemo, useRef, useState } from "react";

interface TimeRangeNavigatorProps {
  intervalType: "monthly" | "weekly";
  onChange: (date: Date) => void;
}

export function TimeRangeNavigator(props: TimeRangeNavigatorProps) {
  const { intervalType, onChange } = props;
  const firstRender = useRef(true);
  const todayDate = useMemo(() => new Date(), []);

  const [dateData, setDateData] = useState({
    year: todayDate.getUTCFullYear(),
    month: todayDate.getUTCMonth(),
    day: todayDate.getUTCDate()
  });

  useEffect(() => {
    if (!firstRender.current) {
      const { year, month, day } = dateData;
      const currentDate = new Date(todayDate.toISOString());
      currentDate.setUTCFullYear(year);
      currentDate.setUTCMonth(month);
      currentDate.setUTCDate(day);
      onChange(currentDate);
    } else {
      firstRender.current = false;
    }
  }, [todayDate, dateData, onChange]);

  function getMaxDate() {
    const currentDate = new Date(todayDate.toISOString());
    const day = todayDate.getUTCDate();
    const weekDay = todayDate.getUTCDay();

    if (intervalType === "monthly") currentDate.setUTCDate(1);
    if (intervalType === "weekly") currentDate.setUTCDate(day - weekDay);

    return currentDate;
  }

  function getMinDate() {
    const currentDate = new Date(todayDate.toISOString());
    const year = todayDate.getUTCFullYear();

    currentDate.setFullYear(year - 1);
    currentDate.setUTCDate(1);

    return currentDate;
  }

  function decrementDate() {
    setDateData((prev) => {
      const { year, month, day } = prev;
      const minDate = getMinDate();
      const nextDate = new Date(year, month, day);

      nextDate.setUTCFullYear(year);
      if (intervalType === "monthly") {
        nextDate.setUTCMonth(month - 1);
        nextDate.setUTCDate(2);
      }
      if (intervalType === "weekly") {
        nextDate.setUTCMonth(month);
        nextDate.setUTCDate(day - 7);
      }
      return nextDate <= minDate
        ? {
            year: minDate.getUTCFullYear(),
            month: minDate.getUTCMonth(),
            day: minDate.getUTCDate()
          }
        : {
            year: nextDate.getUTCFullYear(),
            month: nextDate.getUTCMonth(),
            day: nextDate.getUTCDate()
          };
    });
  }

  function incrementDate() {
    setDateData((prev) => {
      const { year, month, day } = prev;
      const nextDate = new Date(todayDate.toISOString());
      nextDate.setUTCFullYear(year);
      if (intervalType === "monthly") {
        nextDate.setUTCMonth(month + 1);
        nextDate.setUTCDate(2);
      }
      if (intervalType === "weekly") {
        nextDate.setUTCMonth(month);
        nextDate.setUTCDate(day + 7);
      }

      return nextDate > getMaxDate()
        ? {
            year: todayDate.getUTCFullYear(),
            month: todayDate.getUTCMonth(),
            day: todayDate.getUTCDate()
          }
        : {
            year: nextDate.getUTCFullYear(),
            month: nextDate.getUTCMonth(),
            day: nextDate.getUTCDate()
          };
    });
  }

  function getWeekRangeLocaWeekRange() {
    const { year, month, day } = dateData;

    const currentDate = new Date(todayDate.toISOString());
    currentDate.setUTCFullYear(year);
    currentDate.setUTCMonth(month);
    currentDate.setUTCDate(day);

    const localYear = currentDate.getFullYear();
    const localMonth = currentDate.getMonth();
    const localDay = currentDate.getDate();
    const localWeekDay = currentDate.getDay();

    const startDayOffset = localDay - localWeekDay;
    const endDayOffset = localDay + 6 - localWeekDay;

    const weekRange = {
      start: new Date(localYear, localMonth, startDayOffset),
      end: new Date(localYear, localMonth, endDayOffset)
    };

    return weekRange;
  }

  function createMonthlyLabel() {
    const { year, month, day } = dateData;
    const currentDate = new Date(todayDate.toISOString());
    currentDate.setUTCFullYear(year);
    currentDate.setUTCMonth(month);
    currentDate.setUTCDate(day);

    const localMonthIndex = currentDate.getMonth();
    const localMonthName = getMonthNameFromIndex(localMonthIndex);
    return `${toCapitalized(localMonthName)} - ${dateData.year}`;
  }

  function createWeeklyLabel(range: { start: Date; end: Date }) {
    const { start, end } = range;

    const startMonthName = getMonthNameFromIndex(start.getUTCMonth());
    const startDay = `0${start.getUTCDate()}`.slice(-2);
    const startLabel = `${startDay} de ${toCapitalized(startMonthName)}`;

    const endMonthName = getMonthNameFromIndex(end.getUTCMonth());
    const endDay = `0${end.getUTCDate()}`.slice(-2);
    const endLabel = `${endDay} de ${toCapitalized(endMonthName)}`;

    return `${startLabel} - ${endLabel}`;
  }

  function isIncrementDisabled() {
    const maxDate = getMaxDate();
    const currentDate = new Date(dateData.year, dateData.month, dateData.day);
    const maxDateYear = maxDate.getUTCFullYear();
    const maxDateMonth = maxDate.getUTCMonth();
    const maxDateDay = maxDate.getUTCDate();
    return (
      new Date(
        dateData.year,
        dateData.month,
        intervalType === "monthly" ? 1 : dateData.day + 6 - currentDate.getUTCDay()
      ) >= new Date(maxDateYear, maxDateMonth, maxDateDay)
    );
  }

  function isDecrementDisabled() {
    const minDate = getMinDate();
    const currentDate = new Date(dateData.year, dateData.month, dateData.day);
    const minDateYear = minDate.getUTCFullYear();
    const minDateMonth = minDate.getUTCMonth();
    const minDateDay = minDate.getUTCDate();

    return (
      new Date(
        dateData.year,
        dateData.month,
        intervalType === "monthly" ? 1 : dateData.day - currentDate.getUTCDay()
      ) <= new Date(minDateYear, minDateMonth, minDateDay)
    );
  }

  const offsettedWeekRange = getWeekRangeLocaWeekRange();
  const weeklyLabel = createWeeklyLabel(offsettedWeekRange);
  const monthlyLabel = createMonthlyLabel();

  const incrementDisabled = isIncrementDisabled();
  const decrementDisabled = isDecrementDisabled();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={decrementDisabled && styles.buttonDisabled}
        disabled={decrementDisabled}
        onPress={decrementDate}>
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
        onPress={incrementDate}>
        <ArrowIcon style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
}
