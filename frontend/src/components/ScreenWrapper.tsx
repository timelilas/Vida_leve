import { forwardRef, PropsWithChildren, ReactNode } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapper extends ScrollViewProps {
  snackbar?: ReactNode;
}

export const ScreenWrapper = forwardRef<ScrollView, ScreenWrapper>(
  (props, ref) => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            ref={ref}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            {...props}
          ></ScrollView>
        </View>
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#eff0f6",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 24,
    flexGrow: 1,
  },
});
