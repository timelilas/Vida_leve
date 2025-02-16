import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 24,
    flexGrow: 1,
  },
});
