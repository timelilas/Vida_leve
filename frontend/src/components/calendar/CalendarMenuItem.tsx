import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckIcon } from "../icons/CheckIcon";
import { GenericItem } from "./types";
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

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  itemSelected: {
    backgroundColor: "#DEDFE5",
  },
  itemText: {
    fontFamily: "Roboto-400",
    color: "#1D1B20",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
});
