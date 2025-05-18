import { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { styles } from "./styles";
import Svg, { Path, SvgProps } from "react-native-svg";

function SolidArrowIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M0 0L12 20L24 0H0Z" fill="#000000" />
      <Path d="M3 0L12 15L21 0H3Z" fill={props.fill || "#ffffff"} />
    </Svg>
  );
}

export function ToolTip(props: { value: string; posX: number; posY: number; color: string }) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const animatedOpacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedOpacity.current, {
        useNativeDriver: false,
        duration: 100,
        toValue: 1
      }),
      Animated.timing(animatedPosition.current, {
        useNativeDriver: false,
        duration: isFirstRender ? 0 : 180,
        toValue: { x: props.posX, y: props.posY }
      })
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
        backgroundColor: props.color
      }}>
      <Text numberOfLines={1} style={styles.text}>
        {props.value}
      </Text>
      <SolidArrowIcon width={8} height={8} fill={props.color} style={styles.arrowIcon} />
    </Animated.View>
  );
}
