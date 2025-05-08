import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";
import { styles } from "./styles";
import { ReactNode } from "react";

export function WeightHistoryTableSkeleton(props: { show: boolean; children?: ReactNode }) {
  const { show, children } = props;
  const defaultAnimationProps: Omit<MotiSkeletonProps, "Gradient"> = {
    colorMode: "light",
    transition: { type: "timing" },
    disableExitAnimation: true,
    radius: 4
  };

  return (
    <Skeleton.Group show={show}>
      {show ? (
        <View style={styles.container}>
          <Skeleton width="100%" height={30} {...defaultAnimationProps} />
          <View style={styles.tableBody}>
            <Skeleton width="100%" height={22} {...defaultAnimationProps} />
            <Skeleton width="100%" height={22} {...defaultAnimationProps} />
            <Skeleton width="100%" height={22} {...defaultAnimationProps} />
            <Skeleton width="100%" height={22} {...defaultAnimationProps} />
          </View>
        </View>
      ) : (
        children
      )}
    </Skeleton.Group>
  );
}
