import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/fonts";

export const styles = StyleSheet.create({
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
    fontFamily: fonts.robotoRegular,
    color: "#1D1B20",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
});
