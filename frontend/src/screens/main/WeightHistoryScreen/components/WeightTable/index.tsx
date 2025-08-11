import { ActivityIndicator, FlatList, Platform, Text, View } from "react-native";
import { styles } from "./styles";
import { WeightItem } from "../WeightItem";
import { WeightProps } from "../../../../../@core/entities/weight/type";
import { colors } from "../../../../../styles/colors";

interface WeightItemData extends WeightProps {
  isDeleted: boolean;
  isLast: boolean;
  onDelete: () => void;
}

interface WeightTableProps {
  data: WeightItemData[];
  isLoadingMore?: boolean;
  onEndReached?: () => void;
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
        <FlatList
          style={styles.list}
          data={props.data}
          nestedScrollEnabled
          maxToRenderPerBatch={5}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={Platform.OS !== "web"}
          onEndReached={props.onEndReached}
          ListFooterComponent={
            props.isLoadingMore ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : null
          }
          renderItem={({ item }) => (
            <WeightItem
              key={item.id}
              id={item.id}
              date={item.date}
              weight={item.weight}
              isDeleted={item.isDeleted}
              isLast={props.isLoadingMore ? false : item.isLast}
              onDelete={item.onDelete}
            />
          )}
        />
      </View>
    </View>
  );
}
