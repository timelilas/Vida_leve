import { useState } from "react";
import { Text, View, Pressable, TextInputProps } from "react-native";
import { EyeOffIcon } from "../../Icons/EyeOffIcon";
import { EyeOpenIcon } from "../../Icons/EyeOpenIcon";
import { defaultInputStyles } from "../styles";
import { PasswordValidationBoard } from "../../PasswordValidationBoard";
import { ErrorMessage } from "../../ErrorMessage";
import { RawInput } from "../RawInput";
import { InputProps } from "../types";
import { styles } from "./styles";

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
