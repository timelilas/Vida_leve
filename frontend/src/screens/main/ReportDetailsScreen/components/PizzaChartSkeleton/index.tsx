import { View } from "moti";
import { Skeleton } from "moti/skeleton";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
import { styles } from "./styles";
import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { ReactNode } from "react";

export function PizzaChartSkeleton(props: {
  show: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { show, style, children } = props;
  const labelProps = { width: 150, height: 16, radius: 2 };
  const chartProps = { width: 200, height: 200, radius: 200 };
  const titleProps = { width: "100%" as any, height: 18, radius: 2 };
  const defaultAnimationProps: Omit<MotiSkeletonProps, "Gradient"> = {
    colorMode: "light",
    transition: { type: "timing" },
    disableExitAnimation: true,
  };

  return (
    <Skeleton.Group show={show}>
      {show ? (
        <View style={[styles.container, style]}>
          <Skeleton {...titleProps} {...defaultAnimationProps} />
          <View style={styles.labelWrapper}>
            <Skeleton {...labelProps} {...defaultAnimationProps} />
            <Skeleton {...labelProps} {...defaultAnimationProps} />
          </View>
          <Skeleton {...chartProps} {...defaultAnimationProps} />
        </View>
      ) : (
        children
      )}
    </Skeleton.Group>
  );
}
