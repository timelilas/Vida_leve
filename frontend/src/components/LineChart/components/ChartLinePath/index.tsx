import { Color, Skia, Path, Group } from "@shopify/react-native-skia";
import { useChartMeasures } from "../../hooks/useChartMeasures";

interface LinePathProps {
  color: Color;
  fill?: Color;
  data: { value: number; label: string }[];
  strokeWidth: number;
  canvasWidth: number;
  canvasHeight: number;
  xAxis: d3.ScalePoint<string>;
  yAxis: d3.ScaleLinear<number, number, never>;
}

export const ChartLinePath = (props: LinePathProps) => {
  const { canvas, chart } = useChartMeasures({
    canvasWidth: props.canvasWidth,
    canvasHeight: props.canvasHeight
  });

  function createLinePath() {
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

    return linePath;
  }

  function createGradient() {
    const firstPoint = {
      x: canvas.paddingLeft + props.xAxis(`${props.data[0].label}`)!,
      y: canvas.height - canvas.paddingBottom - props.yAxis(props.data[0].value)
    };

    const gradientAreaSplit = createLinePath();

    gradientAreaSplit.lineTo(
      canvas.width - canvas.paddingRight,
      chart.height + chart.strokeWidth
    );
    gradientAreaSplit.lineTo(canvas.paddingLeft, chart.height + chart.strokeWidth);
    gradientAreaSplit.lineTo(firstPoint.x, firstPoint.y);
    gradientAreaSplit.close();

    return gradientAreaSplit;
  }

  return (
    <Group>
      <Path
        strokeCap="round"
        strokeWidth={props.strokeWidth}
        color={props.color}
        style={"stroke"}
        path={createLinePath()}
      />
      {props.data.length > 1 && props.fill && (
        <Path path={createGradient()} color={props.fill} />
      )}
    </Group>
  );
};
