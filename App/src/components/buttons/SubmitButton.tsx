import {
  Text,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface SubmitButtonProps {
  type: "primary";
  title: string;
  style?: StyleProp<ViewStyle>;
}

export function SubmitButton({ title, type, style }: SubmitButtonProps) {
  return (
    <TouchableOpacity
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
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4e4b66",
  },
  primary: {
    backgroundColor: "#ffae31",
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
