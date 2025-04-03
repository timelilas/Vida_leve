import { Text, View } from "react-native";
import { styles } from "./styles";
import { ReactNode } from "react";

interface EmptyDataPlaceholderProps {
  title: string;
  text: string;
  icon: ReactNode;
}

export function EmptyDataPlaceholder(props: EmptyDataPlaceholderProps) {
  const { title, text, icon } = props;

  return (
    <View style={styles.container}>
      <View style={styles.dashedContainer}>{icon}</View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    </View>
  );
}
