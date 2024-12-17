import { StyleSheet, TextStyle } from "react-native";
import { StyleProp, Text } from "react-native";

interface ParagraphProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export function Paragraph(props: ParagraphProps) {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    // lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#4E4B66",
  },
});
