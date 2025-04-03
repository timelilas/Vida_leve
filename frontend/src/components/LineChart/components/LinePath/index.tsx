import { Color, Skia, Path } from "@shopify/react-native-skia";
import { useChartMeasures } from "../../hooks/useChartMeasures";

interface LinePathProps {
  color: Color;
  data: Array<{ value: number; label: string }>;
  strokeWidth: number;
  canvasWidth: number;
  canvasHeight: number;
  xAxis: d3.ScalePoint<string>;
  yAxis: d3.ScaleLinear<number, number, never>;
}

export const ChartLinePath = (props: LinePathProps) => {
  const { canvas } = useChartMeasures({
    canvasWidth: props.canvasWidth,
    canvasHeight: props.canvasHeight,
  });
  const linePath = Skia.Path.Make();

  const baseY = canvas.height - canvas.paddingBottom;
  const baseX = canvas.paddingLeft;

  for (const key in props.data) {
    const item = props.data[key];

    const posX = baseX + props.xAxis(`${item.label}`)!;
    const posY = baseY - props.yAxis(item.value);

    if (parseInt(key) === 0) {
      linePath.moveTo(posX, posY);
    } else {
      linePath.lineTo(posX, posY);
    }
  }

  return (
    <Path
      strokeWidth={props.strokeWidth}
      color={props.color}
      style={"stroke"}
      path={linePath}
    />
  );
};
