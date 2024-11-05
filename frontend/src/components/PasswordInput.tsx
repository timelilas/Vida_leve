import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { EyeOffIcon } from "./icons/EyeOffIcon";
import { EyeOpenIcon } from "./icons/EyeOpenIcon";

interface PasswordInputProps {
  name: string;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (text: string) => void;
}

export function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{props.name}</Text>
      <View style={styles.inputBox}>
        <TextInput
          autoFocus={props.autoFocus}
          textContentType="password"
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#4e4b66"
          style={styles.input}
          placeholder="*************"
          value={props.value}
          onChangeText={props.onChange}
        />
        <TouchableOpacity
          hitSlop={{ top: 14, bottom: 14 }}
          style={styles.visibilityButton}
          onPress={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <EyeOpenIcon /> : <EyeOffIcon />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    gap: 8,
  },
  inputBox: {
    borderColor: "#4E4B66",
    borderWidth: 1,
    color: "#242424",
    borderRadius: 8,
    backgroundColor: "#F7F7FC",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
  },
  input: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  visibilityButton: {
    marginLeft: "auto",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
