import { View, Text, StyleSheet } from "react-native";
import { SharpedCheckIcon } from "../icons/SharpedCheckIcon";
import { SharpedCloseIcon } from "../icons/SharpedCloseIcon";

interface BoardItemProps {
  message: string;
  state?: "valid" | "invalid";
}

export function BoardItem(props: BoardItemProps) {
  function renderIcon() {
    if (props.state) {
      return props.state === "valid" ? (
        <SharpedCheckIcon />
      ) : (
        <SharpedCloseIcon />
      );
    }
    return null;
  }

  return (
    <View style={styles.boardItem}>
      <Text
        style={[
          styles.text,
          props.state === "valid" ? styles.textValid : null,
          props.state === "invalid" ? styles.textInvalid : null,
        ]}
      >
        {props.message}
      </Text>
      {renderIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  boardItem: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-400",
    lineHeight: 19,
    color: "#4E4B66",
  },
  textValid: {
    color: "#14AE5C",
  },
  textInvalid: {
    color: "#F95D4D",
  },
});
