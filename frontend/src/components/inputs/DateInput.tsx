import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  Pressable,
} from "react-native";
import { AlertIcon } from "../icons/AlertIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
import { useState } from "react";
import { Calendar } from "../calendar/Calendar";
import { CalendarSection } from "../calendar/types";
import { DateData } from "react-native-calendars";
import { useCalendar } from "../calendar/useCalendar";
import { dateToPTBR } from "../../utils/helpers";
import { defaultInputStyles } from "./styles";

interface PasswordInputProps {
  name: string;
  value: string;
  disabled?: boolean;
  onChange?: (text: string) => void;
  label?: string;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  textContentType?: TextInputProps["textContentType"];
  error?: boolean;
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
    <View style={defaultInputStyles.inputField}>
      {props.label ? (
        <Text style={defaultInputStyles.label}>{props.label}</Text>
      ) : null}
      <View style={defaultInputStyles.wrapper}>
        <View
          style={[
            defaultInputStyles.boxShadow,
            styles.boxShadow,
            props.value.length ? defaultInputStyles.boxShadowFilled : null,
            props.value.length && props.disabled
              ? defaultInputStyles.boxShadowDisabled
              : null,
            !props.value.length && props.disabled
              ? defaultInputStyles.boxShadowEmpty
              : null,
            props.error ? defaultInputStyles.boxShadowError : null,
          ]}
        >
          <View
            style={[
              defaultInputStyles.inputBox,
              props.disabled ? defaultInputStyles.inputBoxDisabled : null,
            ]}
          >
            <TextInput
              autoFocus={props.autoFocus}
              textContentType={props.textContentType}
              placeholderTextColor={"#B7B7B7"}
              style={[
                defaultInputStyles.input,
                props.disabled ? defaultInputStyles.inputDisabled : null,
              ]}
              placeholder={props.placeholder}
              value={props.value}
              onChangeText={props.onChange}
              editable={!props.disabled}
            />
            <Pressable
              disabled={props.disabled}
              onPress={toggleCalendar}
              style={[
                styles.button,
                props.disabled ? styles.buttonDisabled : null,
              ]}
            >
              <CalendarIcon />
            </Pressable>
          </View>
        </View>
        {props.error && (
          <View style={defaultInputStyles.errorIcon}>
            <AlertIcon />
          </View>
        )}
      </View>
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
  button: {
    borderRadius: 24,
    backgroundColor: "#B7B7B7",
    padding: 8,
    marginRight: 3,
  },
  boxShadow: {
    height: 54,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
