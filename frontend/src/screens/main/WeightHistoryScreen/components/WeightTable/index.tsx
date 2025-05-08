import { Text, View } from "react-native";
import { styles } from "./styles";
import { WeightItem } from "../WeightItem";
import { WeightProps } from "../../../../../@core/entities/weight/type";

interface WeightItemData extends WeightProps {
  isDeleted: boolean;
  isLast: boolean;
  onDelete: () => void;
}

interface WeightTableProps {
  data: WeightItemData[];
}

export function WeightTable(props: WeightTableProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableHeaderTextLeftAligned]}>Data</Text>
        <Text style={styles.tableHeaderText}>Peso Registrado</Text>
        <Text style={[styles.tableHeaderText, styles.tableHeaderTextRightAligned]}>Ações</Text>
      </View>
      <View style={styles.tableBody}>
        {props.data.map((item) => (
          <WeightItem
            key={item.id}
            id={item.id}
            date={item.date}
            weight={item.weight}
            isDeleted={item.isDeleted}
            isLast={item.isLast}
            onDelete={item.onDelete}
          />
        ))}
      </View>
    </View>
  );
}
