import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  total: number;
  achieved: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const absoluteFraction = Math.abs(props.achieved / props.total);
  const roundedFraction = Math.floor(absoluteFraction * 1000) / 1000;
  const normalizedFraction = roundedFraction >= 1 ? 1 : roundedFraction;

  const widthAsFraction = useRef(new Animated.Value(0)).current;
  const progressPercentage = widthAsFraction.interpolate({
    inputRange: [0.0, 1.0],
    outputRange: ["0%", "100%"],
  });

  useEffect(() => {
    Animated.timing(widthAsFraction, {
      toValue: normalizedFraction,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
      duration: 800,
    }).start();
  }, [normalizedFraction]);

  return (
    <View style={styles.progressBar}>
      <View style={styles.preventBarOverflow}>
        <Animated.View
          style={[styles.prgressBarColored, { width: progressPercentage }]}
        >
          <Text numberOfLines={1} style={styles.innerBarText}>
            {props.achieved} kcal
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: "#ffffff",
    padding: 2,
    borderRadius: 20,
    height: 20,
    overflow: "hidden",
  },
  preventBarOverflow: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
  },
  prgressBarColored: {
    backgroundColor: "#FFAE31",
    height: "100%",
    width: "0%",
    borderRadius: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerBarText: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
});
