import { Text, View } from "react-native";
import { styles } from "./styles";
import { PizzaChartIcon } from "../../../../../components/Icons/PizzaChartIcon";
import { colors } from "../../../../../styles/colors";

export function EmptyChartPlaceHolder() {
  return (
    <View style={styles.container}>
      <View style={styles.dashedContainer}>
        <PizzaChartIcon
          strokeWidth={1.5}
          width="100%"
          height="100%"
          stroke={colors.gray.mediumDark}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Sem dados disponíveis</Text>
        <Text style={styles.paragraph}>
          Parece que você não possui dados registrados para esse período.
        </Text>
      </View>
    </View>
  );
}
