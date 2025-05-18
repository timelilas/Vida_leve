import { Group, Rect, Text, useFont } from "@shopify/react-native-skia";
import { calculateTextWidth } from "../../utils";
import { useChartMeasures } from "../../hooks/useChartMeasures";
import { colors } from "../../../../styles/colors";

const robotoLight = require("../../../../assets/fonts/Roboto-Light.ttf");

interface XAxisProps {
  fontSize: number;
  measures: ReturnType<typeof useChartMeasures>;
  axisLabel: string;
  xAxis: d3.ScalePoint<string>;
}

export function XAxis(props: XAxisProps) {
  const fontSize = props.fontSize;
  const domain = props.xAxis.domain();
  const measures = props.measures;
  const font = useFont(robotoLight, fontSize);

  const axisLabelWidth = calculateTextWidth(props.axisLabel, font!);

  return (
    <Group>
      <Rect
        width={measures.chart.width}
        height={1}
        x={measures.canvas.paddingLeft}
        y={measures.chart.height + 1}
      />
      <Group>
        {domain.map((domainValue, index) => {
          const textWidth = font ? calculateTextWidth(domainValue, font) : 0;
          if (index === 0 || index === domain.length - 1) {
            const isLast = domain.length !== 1 && index === domain.length - 1;
            return (
              <Group key={domainValue}>
                <Text
                  font={font}
                  text={domainValue}
                  color={colors.common.black}
                  x={
                    measures.canvas.paddingLeft +
                    props.xAxis(domainValue)! -
                    (isLast ? textWidth : textWidth / 2)
                  }
                  y={
                    fontSize +
                    measures.xAxis.margintTop +
                    measures.canvas.height -
                    measures.canvas.paddingBottom
                  }
                />
                <Rect
                  width={measures.xAxis.tickWidth}
                  height={measures.xAxis.tickHeight}
                  color={colors.common.black}
                  x={
                    measures.canvas.paddingLeft -
                    measures.xAxis.tickWidth +
                    props.xAxis(domainValue)!
                  }
                  y={measures.canvas.height - measures.canvas.paddingBottom}
                />
              </Group>
            );
          }
        })}
      </Group>
      <Text
        font={font}
        text={props.axisLabel}
        color={colors.common.black}
        x={measures.chart.x + measures.chart.width / 2 - axisLabelWidth / 2}
        y={measures.canvas.height - 4}
      />
    </Group>
  );
}
