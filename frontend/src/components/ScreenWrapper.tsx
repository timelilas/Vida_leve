import { forwardRef, PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapper extends PropsWithChildren {
  scrollable?: boolean;
}

export const ScreenWrapper = forwardRef<ScrollView, ScreenWrapper>(
  (props, ref) => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.container}>
            {props.scrollable ? (
              <ScrollView
                ref={ref}
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                {props.children}
              </ScrollView>
            ) : (
              props.children
            )}
          </View>
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
