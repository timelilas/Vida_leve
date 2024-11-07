import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { EyeOffIcon } from "./icons/EyeOffIcon";
import { EyeOpenIcon } from "./icons/EyeOpenIcon";
import { AlertIcon } from "./icons/AlertIcon";

interface PasswordInputProps {
  name: string;
  value?: string;
  label?: string;
  autoFocus?: boolean;
  placeholder?: string;
  error?: string | null;
  onChange?: (text: string) => void;
}

export function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            secureTextEntry={!isPasswordVisible}
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
          <Pressable
            hitSlop={{ top: 14, bottom: 14 }}
            style={styles.visibilityButton}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <EyeOpenIcon /> : <EyeOffIcon />}
          </Pressable>
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
    fontSize: 16,
    color: "#242424",
    paddingHorizontal: 16,
    paddingRight: 0,
    borderRadius: 8,
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },
  inputError: {
    color: "#F95D4D",
  },
  visibilityButton: {
    marginLeft: "auto",
    paddingLeft: 16,
    paddingRight: 15,
    justifyContent: "center",
  },
  error: {
    fontFamily: "Roboto-400",
    fontSize: 14,
    lineHeight: 14,
    color: "#F95D4D",
  },
  errorIcon: {
    paddingLeft: 16,
    paddingRight: 4,
  },
});
