import { Text, View } from "react-native";
import { styles } from "./styles";

interface ChartLabelProps {
  title: string;
  subtitle?: string;
}

export function ChartLabel(props: ChartLabelProps) {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
      {props.subtitle ? (
        <Text numberOfLines={1} style={styles.subtitle}>
          {props.subtitle}
        </Text>
      ) : null}
    </View>
  );
}
