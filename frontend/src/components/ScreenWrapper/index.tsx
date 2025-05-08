/* eslint-disable react/display-name */
import { forwardRef, ReactNode } from "react";
import { ScrollView, ScrollViewProps, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

interface ScreenWrapperProps extends ScrollViewProps {
  snackbar?: ReactNode;
}

export const ScreenWrapper = forwardRef<ScrollView, ScreenWrapperProps>((props, ref) => {
  const { snackbar, ...propsRest } = props;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          ref={ref}
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          {...propsRest}
        />
        {snackbar}
      </View>
    </SafeAreaView>
  );
});
