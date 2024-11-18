import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  contentWrapper: {
    flexShrink: 1,
    gap: 8,
  },
  title: {
    fontFamily: "Roboto-700",
    fontSize: 20,
    lineHeight: 20,
    color: "#242424",
  },
  description: {
    fontFamily: "Roboto-300",
    fontSize: 16,
    lineHeight: 16,
    color: "#242424",
  },
});
