import { ViewStyle } from "react-native";
import { StyleProp, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface SmallLinkButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function SmallLinkButton(props: SmallLinkButtonProps) {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
