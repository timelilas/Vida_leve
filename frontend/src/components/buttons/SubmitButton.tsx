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
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function SubmitButton({
  title,
  type,
  style,
  onPress,
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      onPressOut={onPress}
      activeOpacity={0.8}
      onPress={() => {}}
      style={[styles.container, style]}
    >
      <View style={[styles.base, styles[type]]}>
        <Text style={styles.text}>{title}</Text>
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
