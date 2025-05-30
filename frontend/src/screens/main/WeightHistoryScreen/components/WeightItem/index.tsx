import Reanimated from "react-native-reanimated";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { TrashIcon } from "../../../../../components/Icons/TrashIcon";
import { useWeightItemAnimation } from "./animations";
import { WeightProps } from "../../../../../@core/entities/weight/type";
import { dateToPTBR } from "../../../../../utils/helpers";
import { useCallback, useEffect } from "react";
import { queryClient } from "../../../../../libs/react-query/queryClient";
import { WeightHistoryQueryState } from "../../../../../hooks/weight/types";
import { QueryKeys } from "../../../../../constants/reactQueryKeys";
import { WEIGHT_TABLE_ITEM_HEIGHT, WEIGHT_TABLE_ITEM_MARGIN_BOTTOM } from "./constants";
import { colors } from "../../../../../styles/colors";

interface WeightItemProps extends WeightProps {
  isDeleted: boolean;
  isLast: boolean;
  onDelete: () => void;
}

export function WeightItem(props: WeightItemProps) {
  const { id, date, weight, isDeleted, isLast, onDelete } = props;

  const { animatedStyles, isDeleteAnimationFinished, startDeleteAnimation } =
    useWeightItemAnimation({
      itemHeight: WEIGHT_TABLE_ITEM_HEIGHT,
      itemMarginBottom: isLast ? 0 : WEIGHT_TABLE_ITEM_MARGIN_BOTTOM
    });

  function onDeleteWeight() {
    onDelete();
  }

  const removeItemFromCache = useCallback(() => {
    const queryKey = QueryKeys.API.WEIGHT_HISTORY;
    queryClient.setQueryData<WeightHistoryQueryState>(queryKey, (old) => {
      if (old) {
        const newWeightHistory = old.weights.filter((weight) => weight.id !== id);
        return { ...old, weights: newWeightHistory };
      }
    });
  }, [id]);

  useEffect(() => {
    if (isDeleteAnimationFinished) {
      removeItemFromCache();
    }
    return () => {
      if (isDeleted) removeItemFromCache();
    };
  }, [isDeleteAnimationFinished, isDeleted, removeItemFromCache]);

  useEffect(() => {
    if (isDeleted) {
      startDeleteAnimation();
    }
  }, [isDeleted, startDeleteAnimation]);

  return (
    <Reanimated.View style={[styles.weightItem, animatedStyles]}>
      <Text style={styles.weightItemText}>{dateToPTBR(date, { year: "2-digits" })}</Text>
      <Text style={styles.weightItemText}>{weight} kg</Text>
      <TouchableOpacity onPress={onDeleteWeight} style={styles.itemActionButton}>
        <TrashIcon stroke={colors.error} />
        <Text style={styles.itemActionButtonText}>Excluir</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}
