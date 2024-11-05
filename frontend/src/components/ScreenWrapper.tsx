import { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export function ScreenWrapper({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eff0f6",
  },
  container: {
    flex: 1,
    backgroundColor: "#eff0f6",
  },
});
