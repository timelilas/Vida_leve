import { StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  total: number;
  achieved: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const progressPercentage =
    Math.floor(Math.abs(props.achieved / props.total) * 1000) / 10;

  const sanitizedPercentage =
    progressPercentage > 100 ? 100 : progressPercentage;

  return (
    <View style={styles.progressBar}>
      <View style={styles.preventBarOverflow}>
        <View
          style={[
            styles.prgressBarColored,
            { width: `${sanitizedPercentage}%` },
          ]}
        >
          <Text numberOfLines={1} style={styles.innerBarText}>
            {props.achieved} kcal
          </Text>
        </View>
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
