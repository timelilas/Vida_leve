import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { SearchIcon } from "../../../../components/icons/SearchIcon";
import { ClearInputIcon } from "./ClearInputIcon";
import { useEffect, useRef } from "react";

interface SearchInputProps {
  onClearInput: () => void;
}

export default function SearchInput(props: TextInputProps & SearchInputProps) {
  const { onClearInput, ...propsRest } = props;

  return (
    <View style={[styles.container, props.value && styles.containerFilled]}>
      {props.value?.length ? (
        <ClearInputButton onPress={onClearInput} hitSlop={4} />
      ) : null}
      <TextInput
        style={styles.input}
        placeholderTextColor="#B7B7B7"
        {...propsRest}
      />
      <SearchIcon style={styles.icon} />
    </View>
  );
}

function ClearInputButton(props: TouchableOpacityProps) {
  const animatedValue = useRef(new Animated.Value(0));
  const interpolatedScale = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 1],
  });

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      duration: 200,
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, []);

  return (
    <TouchableOpacity {...props}>
      <Animated.View
        style={{
          transform: [{ scale: interpolatedScale }],
        }}
      >
        <ClearInputIcon />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingInline: 16,
    borderWidth: 1,
    backgroundColor: "#F7F7FC",
    borderColor: "#4E4B66",
    borderRadius: 8,
    height: 48,
  },
  containerFilled: {
    borderColor: "#3AA1A8",
  },
  input: {
    height: "100%",
    flex: 1,
    fontFamily: "Roboto-400",
    color: "#242424",
    fontSize: 16,
    lineHeight: 16,
  },
  icon: {
    marginLeft: "auto",
  },
});
