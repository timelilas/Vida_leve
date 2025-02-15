import { ReactNode } from "react";
import { AlertIcon } from "../../Icons/AlertIcon";
import { defaultInputStyles } from "../styles";
import { View, TextInput, TextInputProps } from "react-native";

interface RawInputProps {
  error?: boolean;
  disabled?: boolean;
  rightAdornment?: ReactNode;
}

export function RawInput(props: RawInputProps & TextInputProps) {
  const { disabled, error, rightAdornment, ...propsRest } = props;

  const inputStyles = [
    defaultInputStyles.input,
    disabled ? defaultInputStyles.inputDisabled : null,
  ];

  const inputBoxStyles = [
    defaultInputStyles.inputBox,
    disabled ? defaultInputStyles.inputBoxDisabled : null,
  ];

  const inputBoxShadowStyles = [
    defaultInputStyles.boxShadow,
    props.value?.length ? defaultInputStyles.boxShadowFilled : null,
    props.value?.length && disabled
      ? defaultInputStyles.boxShadowDisabled
      : null,
    !props.value?.length && disabled ? defaultInputStyles.boxShadowEmpty : null,
    error ? defaultInputStyles.boxShadowError : null,
  ];

  return (
    <View style={defaultInputStyles.wrapper}>
      <View style={inputBoxShadowStyles}>
        <View style={inputBoxStyles}>
          <TextInput
            placeholderTextColor={"#B7B7B7"}
            style={inputStyles}
            value={props.value}
            editable={!disabled}
            contextMenuHidden={disabled}
            {...propsRest}
          />
          {rightAdornment}
        </View>
      </View>
      {error ? <AlertIcon style={defaultInputStyles.errorIcon} /> : null}
    </View>
  );
}
