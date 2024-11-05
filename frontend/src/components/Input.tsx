import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from "react-native";

interface InputProps {
  name: string;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  textContentType?: TextInputProps["textContentType"];
  onChange?: (text: string) => void;
}

export function Input(props: InputProps) {
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{props.name}</Text>
      <TextInput
        autoFocus={props.autoFocus}
        textContentType={props.textContentType}
        placeholderTextColor="#4e4b66"
        style={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    gap: 8,
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
  },
  input: {
    padding: 16,
    fontFamily: "Roboto-400",
    fontSize: 16,
    backgroundColor: "#F7F7FC",
    borderRadius: 8,
    borderColor: "#4E4B66",
    borderWidth: 1,
    color: "#242424",
  },
});
