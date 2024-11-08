import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import { AlertIcon } from "./icons/AlertIcon";

interface InputProps {
  name: string;
  error?: boolean;
  value?: string;
  label?: string;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  textContentType?: TextInputProps["textContentType"];
  onChange?: (text: string) => void;
}

export function Input(props: InputProps) {
  return (
    <View style={styles.inputField}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
      <View style={styles.wrapper}>
        <View
          style={[styles.boxShadow, props.error ? styles.boxShadowError : null]}
        >
          <View style={styles.inputBox}>
            <TextInput
              autoFocus={props.autoFocus}
              textContentType={props.textContentType}
              keyboardType={props.keyboardType}
              placeholderTextColor={props.error ? "#F95D4D99" : "#B7B7B7"}
              style={[styles.input, props.error ? styles.inputError : null]}
              placeholder={props.placeholder}
              value={props.value}
              onChangeText={props.onChange}
            />
          </View>
        </View>
        {props.error ? <AlertIcon /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    gap: 8,
  },
  wrapper: {
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  boxShadow: {
    borderColor: "#4E4B66",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F7F7FC",
    padding: 1,
    height: 48,
    flexGrow: 1,
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
    borderRadius: 8,
    height: "100%",
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
    color: "#4E4B66",
  },
  input: {
    fontFamily: "Roboto-400",
    lineHeight: 16,
    fontSize: 16,
    color: "#242424",
    paddingHorizontal: 16,
    borderRadius: 8,
    flexGrow: 1,
    height: "100%",
  },
  inputError: {
    color: "#F95D4D",
  },
  error: {
    fontFamily: "Roboto-400",
    fontSize: 14,
    lineHeight: 14,
    color: "#F95D4D",
  },
});
