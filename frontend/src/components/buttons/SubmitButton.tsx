import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { ReactNode } from "react";

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

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  base: {
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4e4b66",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  baseDisabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: "#ffae31",
  },
  outlined: {
    backgroundColor: "#f7f7fc",
  },
  highlighted: {
    backgroundColor: "#f7f7fc",
    borderWidth: 2,
    borderColor: "#FFAE31",
    paddingVertical: 14,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
