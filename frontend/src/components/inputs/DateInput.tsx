import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  Pressable,
} from "react-native";
import { CalendarIcon } from "../icons/CalendarIcon";
import { useRef, useState } from "react";
import { Calendar } from "../calendar/Calendar";
import { CalendarSection } from "../calendar/types";
import { DateData } from "react-native-calendars";
import { useCalendar } from "../calendar/useCalendar";
import { dateToPTBR } from "../../utils/helpers";
import { defaultInputStyles } from "./styles";
import { ErrorMessage } from "../ErrorMessage";
import { RawInput } from "./RawInput";

interface PasswordInputProps {
  disabled?: boolean;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export function DateInput(props: PasswordInputProps & TextInputProps) {
  const { disabled, label, error, errorMessage, ...propsRest } = props;
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateData>();
  const [section, setSection] = useState<CalendarSection>("calendar");
  const inputRef = useRef<TextInput | null>(null);
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
    if (props.onChangeText) {
      props.onChangeText("");
    }
  }

  function confirmDate() {
    if (selectedDate && props.onChangeText) {
      props.onChangeText(dateToPTBR(new Date(selectedDate.timestamp)));
      setIsCalendarVisible(false);
      inputRef.current?.focus();
    }
  }

  function toggleCalendarVisibility() {
    setIsCalendarVisible((prev) => !prev);
  }

  return (
    <View style={defaultInputStyles.inputField}>
      {label ? <Text style={defaultInputStyles.label}>{label}</Text> : null}
      <RawInput
        placeholderTextColor={"#B7B7B7"}
        value={props.value}
        disabled={disabled}
        error={error}
        rightAdornment={
          <Pressable
            disabled={disabled}
            onPress={toggleCalendarVisibility}
            style={[
              styles.calendarButton,
              disabled ? styles.calendarButtonDisabled : null,
            ]}
          >
            <CalendarIcon />
          </Pressable>
        }
        {...propsRest}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
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
  calendarButton: {
    borderRadius: 24,
    backgroundColor: "#B7B7B7",
    padding: 6,
    marginRight: 3,
  },
  calendarButtonDisabled: {
    opacity: 0.5,
  },
});
