import { Text, View, TextInputProps } from "react-native";
import { defaultInputStyles } from "../styles";
import { ErrorMessage } from "../../ErrorMessage";
import { RawInput } from "../RawInput";
import { InputProps } from "../types";

export function DefaultInput(props: InputProps & TextInputProps) {
  const { error, label, errorMessage, disabled, ...propsRest } = props;

  return (
    <View style={defaultInputStyles.inputField}>
      <Text style={defaultInputStyles.label}>{label}</Text>
      <RawInput
        value={props.value}
        disabled={disabled}
        error={error}
        {...propsRest}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
}
