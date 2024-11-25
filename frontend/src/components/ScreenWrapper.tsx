import { forwardRef, PropsWithChildren } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  ColorValue,
} from "react-native";

interface ScreenWrapper extends PropsWithChildren {
  scrollable?: boolean;
  statusBarColor?: ColorValue;
}

export const ScreenWrapper = forwardRef<ScrollView, ScreenWrapper>(
  (props, ref) => {
    return (
      <View style={styles.safeArea}>
        <StatusBar
          translucent={props.statusBarColor === "transparent"}
          backgroundColor={props.statusBarColor || "#eff0f6"}
          barStyle="dark-content"
        />
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
    paddingTop: 24,
  },
});
