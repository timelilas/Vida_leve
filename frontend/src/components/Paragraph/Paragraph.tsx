import { Text, TextProps } from "react-native";
import { styles } from "./styles";

export function Paragraph(props: TextProps) {
  const { style, ...propsRest } = props;
  return <Text style={[styles.text, style]} {...propsRest} />;
}
