import { ReactNode } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

interface GuidanceItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function GuidanceItem(props: GuidanceItemProps) {
  return (
    <View style={styles.container}>
      {props.icon}
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
    </View>
  );
}
