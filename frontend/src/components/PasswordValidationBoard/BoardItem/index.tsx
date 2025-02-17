import { View, Text } from "react-native";
import { SharpedCheckIcon } from "../../Icons/SharpedCheckIcon";
import { SharpedCloseIcon } from "../../Icons/SharpedCloseIcon";
import { styles } from "./styles";

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
