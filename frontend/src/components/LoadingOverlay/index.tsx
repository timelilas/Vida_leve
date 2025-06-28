import { View } from "moti";
import { ActivityIndicator } from "react-native";
import { colors } from "../../styles/colors";
import { styles } from "./styles";

export function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
