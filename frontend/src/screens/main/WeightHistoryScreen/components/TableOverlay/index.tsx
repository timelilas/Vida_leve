import { ActivityIndicator, View } from "react-native";
import { colors } from "../../../../../styles/colors";
import { styles } from "./styles";

export function TableOverlay() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color={colors.primary}
      />
    </View>
  );
}
