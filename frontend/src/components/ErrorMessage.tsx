import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

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

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-400",
    fontSize: 14,
    lineHeight: 14,
    color: "#F95D4D",
  },
});
