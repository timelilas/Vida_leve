import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { styles } from "./styles";

export function ToolTip(props: { value: String; posX: number; posY: number }) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const animatedOpacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedOpacity.current, {
        useNativeDriver: false,
        duration: 100,
        toValue: 1,
      }),
      Animated.timing(animatedPosition.current, {
        useNativeDriver: false,
        duration: isFirstRender ? 0 : 180,
        toValue: { x: props.posX, y: props.posY },
      }),
    ]).start();

    setIsFirstRender(false);
  }, [props.posX, props.posY, isFirstRender]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: animatedOpacity.current,
        top: animatedPosition.current.y,
        left: animatedPosition.current.x,
        transform: [{ translateX: "-50%" }, { translateY: -36 }],
      }}
    >
      <Text numberOfLines={1} style={styles.text}>
        {props.value} kcal
      </Text>
      <View style={styles.arrow} />
    </Animated.View>
  );
}
