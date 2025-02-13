import { TextInputProps } from "react-native";
import { Input, InputProps } from "../inputs/Input";

export function WeightInput(props: InputProps & TextInputProps) {
  const { label, value, error, errorMessage, disabled, ...propsRest } = props;
  return (
    <Input
      keyboardType="numeric"
      label={label}
      value={value ? `${value}`.concat(" kg") : ""}
      error={error}
      errorMessage={errorMessage}
      disabled={disabled}
      selection={{
        start: `${value}`.length,
        end: `${value}`.length,
      }}
      {...propsRest}
    />
  );
}
