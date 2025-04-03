import { Group, Text, useFont } from "@shopify/react-native-skia";
import { calculateTextWidth } from "../../utils";
import { useChartMeasures } from "../../hooks/useChartMeasures";
import { colors } from "../../../../styles/colors";

const robotoLight = require("../../../../assets/fonts/Roboto-Light.ttf");

interface XAxisProps {
  fontSize: number;
  canvasHeight: number;
  canvasWidth: number;
  axisLabel: string;
  xAxis: d3.ScalePoint<string>;
}

export function XAxis(props: XAxisProps) {
  const fontSize = props.fontSize;
  const domain = props.xAxis.domain();

  const measures = useChartMeasures({
    canvasWidth: props.canvasWidth,
    canvasHeight: props.canvasHeight,
  });

  const font = useFont(robotoLight, fontSize);

  const axisLabelWidth = calculateTextWidth(props.axisLabel, font!);

  return (
    <Group>
      <Group>
        {domain.map((domainValue, index) => {
          const textWidth = font ? calculateTextWidth(domainValue, font) : 0;
          if (index === 0 || index === domain.length - 1) {
            return (
              <Text
                key={domainValue}
                font={font}
                text={domainValue}
                color={colors.text.primary}
                x={
                  measures.canvas.paddingLeft -
                  textWidth / 2 +
                  props.xAxis(domainValue)!
                }
                y={
                  fontSize +
                  measures.xAxis.margintTop +
                  measures.canvas.height -
                  measures.canvas.paddingBottom
                }
              />
            );
          }
        })}
      </Group>
      <Text
        font={font}
        text={props.axisLabel}
        color={colors.text.primary}
        x={measures.chart.x + measures.chart.width / 2 - axisLabelWidth / 2}
        y={measures.canvas.height}
      />
    </Group>
  );
}
