import { Animated, Image, Text, View } from "react-native";
import { styles } from "./styles";
import { useProgressBarAnimation } from "./animations";

interface ProgressBarProps {
  total: number;
  achieved: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const absoluteFraction = Math.abs(props.achieved / props.total);
  const roundedFraction = Math.floor(absoluteFraction * 1000) / 1000;
  const normalizedFraction = roundedFraction >= 1 ? 1 : roundedFraction;
  const { progressPercentage } = useProgressBarAnimation({
    duration: 800,
    barWidthFraction: normalizedFraction,
  });

  const isExceedTotal = props.achieved >= props.total;

  return (
    <View style={styles.progressBar}>
      <View style={styles.preventBarOverflow}>
        <Animated.View
          style={[styles.prgressBarColored, { width: progressPercentage }]}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.innerBarText,
              isExceedTotal && styles.innerBarTextBold,
            ]}
          >
            {props.achieved} kcal
          </Text>
        </Animated.View>
      </View>
      {isExceedTotal ? (
        <Image
          style={{ width: 14, height: 14 }}
          source={require("../../assets/images/fear-emoji.png")}
        />
      ) : null}
    </View>
  );
}
