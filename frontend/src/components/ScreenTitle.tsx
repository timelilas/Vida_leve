import { TextStyle } from "react-native";
import { StyleProp, StyleSheet, Text } from "react-native";

interface ScreenTitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export function ScreenTitle({ title, style }: ScreenTitleProps) {
  return <Text style={[styles.title, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: "Roboto-700",
    color: "#4E4B66",
  },
});
