import { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./styles";

interface SectionContainerProps {
  children?: ReactNode;
}

export function SectionContainer(props: SectionContainerProps) {
  return <View style={styles.container}>{props.children}</View>;
}
