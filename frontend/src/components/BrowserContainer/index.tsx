import { PropsWithChildren, useLayoutEffect } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import { styles } from "./styles";
import { WEB_SCREEN_WIDTH_BREAKPOINT } from "../../constants/webConstants";

export function BrowserContainer(props: PropsWithChildren) {
  const dimensions = useWindowDimensions();

  useLayoutEffect(() => {
    if (Platform.OS === "web") {
      const body = document.body;
      body.style.overflowY = "scroll";
    }
  }, []);

  if (dimensions.width <= WEB_SCREEN_WIDTH_BREAKPOINT) {
    return props.children;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.appFrame}>{props.children}</View>
      </View>
    </View>
  );
}
