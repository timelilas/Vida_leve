import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native";

export function Paragraph(props: TextProps) {
  const { style, ...propsRest } = props;
  return <Text style={[styles.text, style]} {...propsRest} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Roboto-400",
    color: "#4E4B66",
  },
});
