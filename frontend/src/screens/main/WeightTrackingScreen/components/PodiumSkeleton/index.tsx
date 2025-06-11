import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { Skeleton } from "moti/skeleton";
import { styles } from "./styles";
import { ReactNode } from "react";
import { View } from "react-native";

export function PodiumSkeleton(props: { show: boolean; children?: ReactNode }) {
  const { show, children } = props;
  const textProps: Omit<MotiSkeletonProps, "Gradient"> = {
    width: "100%",
    height: 14,
    radius: "square"
  };
  const podiumProps: Omit<MotiSkeletonProps, "Gradient"> = {
    width: "100%",
    height: 165
  };
  const defaultAnimationProps: Omit<MotiSkeletonProps, "Gradient"> = {
    colorMode: "light",
    transition: { type: "timing" },
    disableExitAnimation: true
  };

  return (
    <Skeleton.Group show={show}>
      {show ? (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Skeleton {...textProps} {...defaultAnimationProps} />
            <Skeleton {...textProps} {...defaultAnimationProps} />
            <Skeleton {...textProps} {...defaultAnimationProps} />
          </View>
          <Skeleton {...podiumProps} {...defaultAnimationProps} />
          <View style={styles.textContainer}>
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
