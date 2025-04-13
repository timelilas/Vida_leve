import { Group, Rect, Text, useFont } from "@shopify/react-native-skia";
import { calculateTextWidth } from "../../utils";
import { useChartMeasures } from "../../hooks/useChartMeasures";
import { colors } from "../../../../styles/colors";

const robotoLight = require("../../../../assets/fonts/Roboto-Light.ttf");

interface YAxisProps {
  fontSize: number;
  canvasHeight: number;
  canvasWidth: number;
  yAxis: d3.ScaleLinear<number, number, never>;
  axisLabel: string;
  subdomain?: number[];
}

export function YAxis(props: YAxisProps) {
  const fontSize = props.fontSize;
  const domain = props.yAxis.domain();
  const step = Math.ceil(domain[domain.length - 1] / 4);
  const subDomain = Array.from({ length: 5 }, (_, i) => step * i);

  const measures = useChartMeasures({
    canvasWidth: props.canvasWidth,
    canvasHeight: props.canvasHeight
  });

  const font = useFont(robotoLight, fontSize);

  const AXIS_LABEL_MARGIN_RIGHT = 8;
  const AXIS_LABEL_TEXT_WIDTH = calculateTextWidth(props.axisLabel, font!);
  const AXIS_LABEL_POS_Y = 25;
  const AXIS_LABEL_POS_X = measures.chart.x - AXIS_LABEL_TEXT_WIDTH - AXIS_LABEL_MARGIN_RIGHT;

  return (
    <Group>
      <Rect width={1} height={measures.chart.height + 1} x={measures.canvas.paddingLeft - 1} />
      {subDomain.map((value, i) => {
        const label = `${value}`;
        const labelWidth = font ? calculateTextWidth(label, font) : 0;
        const baseHeight =
          measures.canvas.height - measures.canvas.paddingBottom - props.yAxis(value);
        return i === subDomain.length - 1 ? null : (
          <Group key={label}>
            <Rect
              color={colors.common.black}
              height={measures.yAxis.tickHeight}
              width={measures.yAxis.tickWidth}
              x={measures.canvas.paddingLeft - measures.yAxis.tickWidth}
              y={baseHeight}
            />
            <Text
              text={label}
              font={font}
              color={colors.common.black}
              x={
                measures.chart.x -
                labelWidth -
                measures.yAxis.tickWidth -
                measures.yAxis.labelMarginRight
              }
              y={baseHeight + fontSize / 3}
            />
          </Group>
        );
      })}
      <Text
        font={font}
        text={props.axisLabel}
        transform={[
          { translateX: AXIS_LABEL_POS_X + 4 + AXIS_LABEL_TEXT_WIDTH / 2 },
          { translateY: fontSize * 1.25 },
          { rotate: -Math.PI / 2 },
          { translateX: -(AXIS_LABEL_POS_X + AXIS_LABEL_TEXT_WIDTH / 2) },
          { translateY: -(fontSize + fontSize / 2) }
        ]}
        x={AXIS_LABEL_POS_X}
        y={AXIS_LABEL_POS_Y}
        color={colors.common.black}
      />
    </Group>
  );
}
