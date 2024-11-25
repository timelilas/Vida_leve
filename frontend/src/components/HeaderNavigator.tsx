import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ArrowIcon } from "./icons/ArrowIcon";
import { CloseIcon } from "./icons/CloseIcon";

interface HeaderNavigatorProps {
  style?: StyleProp<ViewStyle>;
  onGoBack?: () => void;
  onClose?: () => void;
}

export function HeaderNavigator(props: HeaderNavigatorProps) {
  return (
    <View style={[styles.container, props.style]}>
      {props.onGoBack && (
        <TouchableOpacity hitSlop={4} onPress={props.onGoBack}>
          <ArrowIcon />
        </TouchableOpacity>
      )}
      {props.onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          hitSlop={4}
          onPress={props.onClose}
        >
          <CloseIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  closeButton: {
    marginLeft: "auto",
  },
});
