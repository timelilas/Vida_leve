import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { AlertIcon } from "./icons/AlertIcon";
import { CalendarIcon } from "./icons/CalendarIcon";
import { useState } from "react";
import { Calendar } from "./calendar/Calendar";
import { CalendarSection } from "./calendar/types";
import { DateData } from "react-native-calendars";
import { useCalendar } from "./calendar/useCalendar";
import { dateToPTBR } from "../utils/helpers";

interface PasswordInputProps {
  name: string;
  onChange?: (text: string) => void;
  value?: string;
  label?: string;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  textContentType?: TextInputProps["textContentType"];
  error?: string;
}

export function DateInput(props: PasswordInputProps) {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [section, setSection] = useState<CalendarSection>("calendar");
  const [selectedDate, setSelectedDate] = useState<DateData>();

  const {
    month,
    year,
    incrementYear,
    decrementYear,
    incrementMonth,
    decrementMonth,
    setMonth,
    setYear,
  } = useCalendar();

  function clearCalendar() {
    setSelectedDate(undefined);
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
    if (props.onChange) {
      props.onChange("");
    }
  }

  function confirmDate() {
    if (selectedDate && props.onChange) {
      props.onChange(dateToPTBR(new Date(selectedDate.timestamp)));
      setIsCalendarVisible(false);
    }
  }

  function toggleCalendar() {
    setIsCalendarVisible((prev) => !prev);
  }

  return (
    <View style={styles.inputField}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
      <View
        style={[styles.boxShadow, props.error ? styles.boxShadowError : null]}
      >
        <View style={styles.inputBox}>
          <TextInput
            autoFocus={props.autoFocus}
            textContentType={props.textContentType}
            placeholderTextColor={props.error ? "#F95D4D88" : "#B7B7B7"}
            style={[styles.input, props.error ? styles.inputError : null]}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChange}
          />
          {props.error && (
            <View style={styles.errorIcon}>
              <AlertIcon />
            </View>
          )}
          <TouchableOpacity
            onPress={toggleCalendar}
            activeOpacity={0.7}
            style={styles.button}
          >
            <CalendarIcon />
          </TouchableOpacity>
        </View>
      </View>
      {props.error && <Text style={styles.error}>{props.error}</Text>}
      {isCalendarVisible && (
        <Calendar
          month={month}
          year={year}
          section={section}
          currentDate={selectedDate}
          setMonth={setMonth}
          setYear={setYear}
          setSection={setSection}
          setCurrentDate={setSelectedDate}
          incrementYear={incrementYear}
          incrementMonth={incrementMonth}
          decrementYear={decrementYear}
          decrementMonth={decrementMonth}
          clear={clearCalendar}
          close={() => setIsCalendarVisible(false)}
          confirm={confirmDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    gap: 8,
  },
  boxShadow: {
    borderColor: "#4E4B66",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F7F7FC",
    padding: 1,
    height: 56,
  },
  boxShadowError: {
    borderColor: "#F95D4D",
    borderRadius: 10,
    backgroundColor: "#F95D4D",
  },
  inputBox: {
    backgroundColor: "#F7F7FC",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    borderRadius: 8,
    paddingRight: 4,
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
    color: "#4E4B66",
  },
  input: {
    fontFamily: "Roboto-400",
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#242424",
    borderRadius: 8,
    width: "100%",
    flexShrink: 1,
  },
  inputError: {
    color: "#F95D4D",
  },
  button: {
    borderRadius: 24,
    backgroundColor: "#B7B7B7",
    padding: 8,
  },
  error: {
    fontFamily: "Roboto-400",
    fontSize: 14,
    lineHeight: 14,
    color: "#F95D4D",
  },
  errorIcon: {
    paddingRight: 16,
  },
});
