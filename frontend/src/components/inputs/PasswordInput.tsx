import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInputProps,
} from "react-native";
import { EyeOffIcon } from "../icons/EyeOffIcon";
import { EyeOpenIcon } from "../icons/EyeOpenIcon";
import { defaultInputStyles } from "./styles";
import { PasswordValidationBoard } from "../validationBoard/PasswordValidationBoard";
import { ErrorMessage } from "../ErrorMessage";
import { RawInput } from "./RawInput";
import { InputProps } from "./Input";

interface PasswordInputProps extends InputProps {
  withBoard?: boolean;
  enableBoard?: boolean;
}

export function PasswordInput(props: PasswordInputProps & TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    withBoard,
    disabled,
    enableBoard,
    label,
    error,
    errorMessage,
    ...propsRest
  } = props;

  const passwordVisibilityButtonStyles = [
    styles.visibilityButton,
    disabled ? styles.visibilityButtonDisabled : null,
  ];

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  return (
    <View style={defaultInputStyles.inputField}>
      <Text style={defaultInputStyles.label}>{label}</Text>
      <RawInput
        textContentType="password"
        secureTextEntry={!isPasswordVisible}
        placeholderTextColor={"#B7B7B7"}
        disabled={disabled}
        error={error}
        rightAdornment={
          <Pressable
            disabled={disabled}
            hitSlop={8}
            onPress={togglePasswordVisibility}
            style={passwordVisibilityButtonStyles}
          >
            {isPasswordVisible ? <EyeOpenIcon /> : <EyeOffIcon />}
          </Pressable>
        }
        {...propsRest}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {withBoard && (
        <PasswordValidationBoard
          enabled={!!enableBoard}
          password={props.value || ""}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  visibilityButton: {
    marginRight: 15,
    justifyContent: "center",
  },
  visibilityButtonDisabled: {
    opacity: 0.5,
  },
});
