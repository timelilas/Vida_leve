import { StyleProp, Text, View, ViewStyle } from "react-native";
import { styles } from "./styles";

interface ErrorMessageProps {
  style?: StyleProp<ViewStyle>;
  message: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <View style={props.style}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
}
