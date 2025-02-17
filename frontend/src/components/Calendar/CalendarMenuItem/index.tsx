import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckIcon } from "../../Icons/CheckIcon";
import { GenericItem } from "../types";
import { styles } from "./styles";
import { memo } from "react";

interface CalendarMenuItemProps {
  item: GenericItem;
  selected: boolean;
  onTouch: () => void;
}

export const CalendarMenuItem = memo(
  (props: CalendarMenuItemProps) => {
    return (
      <Pressable
        onPress={props.onTouch}
        style={[styles.item, props.selected && styles.itemSelected]}
      >
        <View style={styles.itemIcon}>
          {props.selected ? <CheckIcon /> : null}
        </View>
        <Text style={styles.itemText}>{props.item.value || props.item.id}</Text>
      </Pressable>
    );
  },
  (prev, next) => prev.selected === next.selected
);
