import {
  Animated,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import { SearchIcon } from "../../../../../components/Icons/SearchIcon";
import { ClearInputIcon } from "../ClearInputIcon";
import { useEffect, useRef } from "react";
import { styles } from "./styles";
import { colors } from "../../../../../styles/colors";

interface SearchInputProps {
  onClearInput: () => void;
}

export default function SearchInput(props: TextInputProps & SearchInputProps) {
  const { onClearInput, ...propsRest } = props;

  return (
    <View style={[styles.container, props.value && styles.containerFilled]}>
      {props.value?.length ? <ClearInputButton onPress={onClearInput} hitSlop={4} /> : null}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray.medium}
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
    outputRange: [0.25, 1]
  });

  useEffect(() => {
    Animated.timing(animatedValue.current, {
      duration: 200,
      useNativeDriver: true,
      toValue: 1
    }).start();
  }, []);

  return (
    <TouchableOpacity {...props}>
      <Animated.View
        style={{
          transform: [{ scale: interpolatedScale }]
        }}>
        <ClearInputIcon />
      </Animated.View>
    </TouchableOpacity>
  );
}
