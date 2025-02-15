import { TextStyle } from "react-native";
import { StyleProp, Text } from "react-native";
import { styles } from "./styles";

interface ScreenTitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export function ScreenTitle({ title, style }: ScreenTitleProps) {
  return <Text style={[styles.title, style]}>{title}</Text>;
}
