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
  error?: string | null;
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
      <View
        style={[styles.boxShadow, props.error ? styles.boxShadowError : null]}
      >
        <View style={styles.inputBox}>
          <TextInput
            autoFocus={props.autoFocus}
            textContentType="password"
            placeholderTextColor={props.error ? "#F95D4D88" : "#B7B7B7"}
            style={[styles.input, props.error ? styles.inputError : null]}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChange}
          />
          {props.error ? (
            <View style={styles.errorIcon}>
              <AlertIcon />
            </View>
          ) : null}
        </View>
      </View>
      {props.error && <Text style={styles.error}>{props.error}</Text>}
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
    height: 48,
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
    width: "100%",
    height: "100%",
    flexShrink: 1,
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
  errorIcon: {
    paddingLeft: 0,
    paddingRight: 15,
  },
});
