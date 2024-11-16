import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { EyeOffIcon } from "../icons/EyeOffIcon";
import { EyeOpenIcon } from "../icons/EyeOpenIcon";
import { AlertIcon } from "../icons/AlertIcon";
import { defaultInputStyles } from "./styles";
import { PasswordValidationBoard } from "../validationBoard/PasswordValidationBoard";

interface PasswordInputProps {
  name: string;
  value: string;
  withBoard?: boolean;
  enableBoard?: boolean;
  disabled?: boolean;
  label?: string;
  autoFocus?: boolean;
  placeholder?: string;
  error?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (text: string) => void;
}

export function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={defaultInputStyles.inputField}>
      <Text style={defaultInputStyles.label}>{props.label}</Text>
      <View style={defaultInputStyles.wrapper}>
        <View
          style={[
            defaultInputStyles.boxShadow,
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
              textContentType="password"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={"#B7B7B7"}
              style={[
                defaultInputStyles.input,
                styles.input,
                props.disabled ? defaultInputStyles.inputDisabled : null,
              ]}
              placeholder={props.placeholder}
              value={props.value}
              editable={!props.disabled}
              onBlur={props.onBlur}
              onFocus={props.onFocus}
              onChangeText={props.onChange}
            />
            <Pressable
              disabled={props.disabled}
              hitSlop={{ top: 14, bottom: 14 }}
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              style={[
                styles.visibilityButton,
                props.disabled ? styles.visibilityButtonDisabled : null,
              ]}
            >
              {isPasswordVisible ? <EyeOpenIcon /> : <EyeOffIcon />}
            </Pressable>
          </View>
        </View>
        {props.error ? (
          <AlertIcon style={defaultInputStyles.errorIcon} />
        ) : null}
      </View>
      {props.withBoard && (
        <PasswordValidationBoard
          enabled={!!props.enableBoard}
          password={props.value}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingRight: 0,
  },
  visibilityButton: {
    marginLeft: "auto",
    paddingLeft: 16,
    paddingRight: 15,
    justifyContent: "center",
  },
  visibilityButtonDisabled: {
    opacity: 0.5,
  },
});
