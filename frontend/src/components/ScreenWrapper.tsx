import { forwardRef, PropsWithChildren } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

interface ScreenWrapper extends PropsWithChildren {
  scrollable?: boolean;
}

export const ScreenWrapper = forwardRef<ScrollView, ScreenWrapper>(
  (props, ref) => {
    return (
      <SafeAreaView style={styles.safeArea}>
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
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eff0f6",
  },
  container: {
    flex: 1,
    backgroundColor: "#eff0f6",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
});
