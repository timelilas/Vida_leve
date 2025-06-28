import { useEffect, useRef, useState } from "react";
import { Animated, Platform, Text } from "react-native";
import { styles } from "./styles";
import Svg, { Path, SvgProps } from "react-native-svg";

interface TooltipProps {
  value: string;
  posX: number;
  posY: number;
  rightAligned: boolean;
  color: string;
}

function SolidArrowIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M0 0L12 20L24 0H0Z" fill="#000000" />
      <Path d="M3 0L12 15L21 0H3Z" fill={props.fill || "#ffffff"} />
    </Svg>
  );
}

export function ToolTip(props: TooltipProps) {
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
        toValue: { x: props.posX + (props.rightAligned ? 10 : 0), y: props.posY }
      })
    ]).start();

    setIsFirstRender(false);
  }, [props.posX, props.posY, isFirstRender, props.rightAligned]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: animatedOpacity.current,
        top: animatedPosition.current.y,
        left: animatedPosition.current.x,
        backgroundColor: props.color,
        transform: [{ translateX: props.rightAligned ? "-100%" : "-50%" }, { translateY: -36 }]
      }}>
      <Text numberOfLines={1} style={styles.text}>
        {props.value}
      </Text>
      <SolidArrowIcon
        width={8}
        height={8}
        fill={props.color}
        style={[
          styles.arrowIcon,
          props.rightAligned
            ? Platform.OS === "web"
              ? styles.arrowIconRightWeb
              : styles.arrowIconRightMobile
            : null
        ]}
      />
    </Animated.View>
  );
}
