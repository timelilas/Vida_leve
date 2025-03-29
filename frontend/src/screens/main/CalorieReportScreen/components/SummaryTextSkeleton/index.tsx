import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { Skeleton } from "moti/skeleton";
import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { ReactNode } from "react";

export function SummaryTextSkeleton(props: {
  show: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { show, style, children } = props;
  const textProps: Omit<MotiSkeletonProps, "Gradient"> = {
    height: 14,
    width: "100%",
    radius: 2,
  };
  const defaultAnimationProps: Omit<MotiSkeletonProps, "Gradient"> = {
    colorMode: "light",
    transition: { type: "timing" },
    disableExitAnimation: false,
  };

  return (
    <Skeleton.Group show>
      {show ? (
        <View style={[styles.container, style]}>
          <Skeleton
            height={18}
            width={250}
            radius={2}
            {...defaultAnimationProps}
          />
          <Skeleton
            height={24}
            width={100}
            radius={2}
            {...defaultAnimationProps}
          />
          <View style={styles.textSkeletonWrapper}>
            <Skeleton {...textProps} {...defaultAnimationProps} />
            <Skeleton {...textProps} {...defaultAnimationProps} />
          </View>
        </View>
      ) : (
        children
      )}
    </Skeleton.Group>
  );
}
