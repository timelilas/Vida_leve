import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { Skeleton } from "moti/skeleton";
import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { ReactNode } from "react";
import { useChartMeasures } from "../LineChart/hooks/useChartMeasures";

export function LineChartSkeleton(props: {
  show: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const chartMeasures = useChartMeasures();
  const { show, children, style } = props;
  const labelProps = { width: 150, height: 16, radius: 2 };
  const xAxisProps = { width: 120, height: 16, radius: 2 };
  const chartProps = { height: chartMeasures.chart.height, radius: 2 };
  const defaultAnimationProps: Omit<MotiSkeletonProps, "Gradient"> = {
    colorMode: "light",
    transition: { type: "timing" },
    disableExitAnimation: true
  };

  return (
    <Skeleton.Group show={show}>
      {show ? (
        <View style={[styles.container, style]}>
          <View style={styles.labelWrapper}>
            <Skeleton {...labelProps} {...defaultAnimationProps} />
            <Skeleton {...labelProps} {...defaultAnimationProps} />
          </View>
          <View style={styles.chartContainer}>
            <Skeleton width="100%" {...chartProps} {...defaultAnimationProps} />
            <Skeleton {...xAxisProps} {...defaultAnimationProps} />
          </View>
        </View>
      ) : (
        children
      )}
    </Skeleton.Group>
  );
}
