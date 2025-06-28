import { Circle, Color, Paint } from "@shopify/react-native-skia";
import { colors } from "../../../../styles/colors";

interface LinePointProps {
  x: number;
  y: number;
  size: number;
  color: Color;
}
export function LinePoint(props: LinePointProps) {
  return (
    <Circle
      style="stroke"
      strokeWidth={3.5}
      color={props.color}
      r={props.size}
      cx={props.x}
      cy={props.y}>
      <Paint color={colors.common.white} />
    </Circle>
  );
}
