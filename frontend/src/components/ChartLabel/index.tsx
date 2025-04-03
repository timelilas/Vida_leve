import { ColorValue, Text, View } from "react-native";
import { styles } from "./styles";

interface ChartLabelProps {
  color: ColorValue;
  label: string;
}

export function ChartLabel(props: ChartLabelProps) {
  const { color, label } = props;

  return (
    <View style={styles.labelItem}>
      <View style={[styles.labelMarker, { backgroundColor: color }]} />
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}
