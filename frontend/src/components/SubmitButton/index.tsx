import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { ReactNode } from "react";
import { styles } from "./styles";

interface SubmitButtonProps {
  type: "primary" | "outlined" | "highlighted";
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={0.5}
      onPress={props.onPress}
      style={[
        styles.container,
        props.style,
        props.disabled ? styles.baseDisabled : null,
      ]}
    >
      <View style={[styles.base, styles[props.type]]}>
        {props.icon}
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
