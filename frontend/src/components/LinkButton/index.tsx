import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";

interface LinkButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={styles.linkButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
