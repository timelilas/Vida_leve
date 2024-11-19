import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface SubmitButtonProps {
  type: "primary" | "outlined";
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPressOut={props.onPress}
      activeOpacity={0.7}
      onPress={() => {}}
      style={[
        styles.container,
        props.style,
        props.disabled ? styles.baseDisabled : null,
      ]}
    >
      <View style={[styles.base, styles[props.type]]}>
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
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
