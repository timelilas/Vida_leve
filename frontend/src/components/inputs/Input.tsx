import { Text, TextInput, View, TextInputProps } from "react-native";
import { AlertIcon } from "../icons/AlertIcon";
import { defaultInputStyles } from "./styles";
import { ErrorMessage } from "../ErrorMessage";

interface InputProps {
  name: string;
  value: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  selection?: TextInputProps["selection"];
  label?: string;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
  textContentType?: TextInputProps["textContentType"];
  onBlur?: () => void;
  onChange?: (text: string) => void;
}

export function Input(props: InputProps) {
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
              selection={props.selection}
              onBlur={props.onBlur}
              autoFocus={props.autoFocus}
              textContentType={props.textContentType}
              keyboardType={props.keyboardType}
              placeholderTextColor={"#B7B7B7"}
              style={[
                defaultInputStyles.input,
                props.disabled ? defaultInputStyles.inputDisabled : null,
              ]}
              placeholder={props.placeholder}
              value={props.value}
              onChangeText={props.onChange}
              editable={!props.disabled}
              contextMenuHidden={props.disabled}
              selectTextOnFocus={props.disabled}
            />
          </View>
        </View>
        {props.error ? (
          <AlertIcon style={defaultInputStyles.errorIcon} />
        ) : null}
      </View>
      {props.errorMessage && <ErrorMessage message={props.errorMessage} />}
    </View>
  );
}
