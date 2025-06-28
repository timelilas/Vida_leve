import { Dimensions, Platform, View } from "react-native";
import { Canvas, Color, Group } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { PointerEvent } from "react-native";
import { useChartMeasures } from "./hooks/useChartMeasures";
import { ToolTip } from "./components/ToolTip";
import { XAxis } from "./components/XAxis";
import { YAxis } from "./components/YAxis";
import { ChartLinePath } from "./components/ChartLinePath";
import { LinePoint } from "./components/LinePoint";
import { useChartDomain } from "./hooks/useChartDomain";

interface TooltipState {
  value: number;
  posX: number;
  posY: number;
  color: string;
  visible: boolean;
  isLast: boolean;
}

interface LineChartProps {
  lineStrokeWidth?: number;
  yTickMultiple?: number;
  labels: string[];
  yAxisName: string;
  xAxisName: string;
  style?: {
    paddingLeft?: number;
  };
  data: {
    values: number[];
    color: Color;
    fillColor?: Color;
    withDots?: boolean | ((value: number, index: number) => boolean);
    tooltip?: {
      color: string;
      enabled: boolean | ((value: number, index: number) => boolean);
    };
  }[];
}

export function LineChart(props: LineChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const XAXIS_FONT_SIZE = 14;
  const YAXIS_FONT_SIZE = 14;

  const measures = useChartMeasures({
    canvasPaddingLeft: props.style?.paddingLeft
  });

  const { canvas, chart, linePoint } = measures;
  const { xAxis, yAxis } = useChartDomain({
    xLabels: props.labels,
    yData: props.data.map(({ values }) => values).flat(1),
    chart: { width: chart.width, height: chart.height },
    yAxisTickMultiple: props.yTickMultiple
  });

  const allowedTooltipPositions = getAllowedTooltipPositions();

  function renderLinePaths() {
    return props.data.map(({ color, values, withDots, fillColor }, i) => {
      const data = values.map((value, i) => {
        return { value, label: props.labels[i] };
      });
      return (
        <Group key={i}>
          <ChartLinePath
            measures={measures}
            strokeWidth={props.lineStrokeWidth || 1}
            xAxis={xAxis}
            yAxis={yAxis}
            color={color}
            fill={fillColor}
            data={data}
          />
          {withDots
            ? data.map(({ label, value }, i) => {
                const useDot = typeof withDots === "function" ? withDots(value, i) : withDots;
                if (useDot)
                  return (
                    <LinePoint
                      key={i}
                      size={linePoint.r}
                      y={canvas.height - canvas.paddingBottom - yAxis(value)}
                      x={canvas.paddingLeft + xAxis(label)!}
                      color={color}
                    />
                  );
              })
            : null}
        </Group>
      );
    });
  }

  function getAllowedTooltipPositions() {
    return props.data.reduce(
      (acc, dataItem) => {
        if (dataItem.tooltip?.enabled) {
          const tooltipColor = dataItem.tooltip.color;

          dataItem.values.forEach((value, i) => {
            const isTooltipPositionAllowed =
              typeof dataItem.tooltip?.enabled === "function"
                ? dataItem.tooltip?.enabled(value, i)
                : true;

            if (isTooltipPositionAllowed) {
              acc.push({
                x: Math.trunc(xAxis(props.labels[i])!),
                y: Math.trunc(yAxis(value)),
                tooltipColor,
                value
              });
            }
          });
        }
        return acc;
      },
      [] as { x: number; y: number; value: number; tooltipColor: string }[]
    );
  }

  function getTooltipePositionWEB(e: PointerEvent) {
    return {
      posX: Math.trunc(e.nativeEvent.offsetX) - canvas.paddingLeft,
      posY: canvas.height - canvas.paddingBottom - Math.trunc(e.nativeEvent.offsetY)
    };
  }

  function getTooltipPositionMOBILE(e: GestureResponderEvent) {
    return {
      posX: Math.trunc(e.nativeEvent.locationX) - canvas.paddingLeft,
      posY: canvas.height - canvas.paddingBottom - Math.trunc(e.nativeEvent.locationY)
    };
  }

  function handleTooltipPosition(e: GestureResponderEvent | PointerEvent) {
    let posX = 0;
    let posY = 0;
    const lastPosition = allowedTooltipPositions.slice(-1)[0];

    const tooltipPlataformPosition =
      Platform.OS === "web"
        ? getTooltipePositionWEB(e as PointerEvent)
        : getTooltipPositionMOBILE(e as GestureResponderEvent);

    posX = tooltipPlataformPosition.posX;
    posY = tooltipPlataformPosition.posY;

    for (const position of allowedTooltipPositions) {
      const diffX = Math.abs(position.x - posX);
      const diffY = Math.abs(position.y - posY);

      if (diffX <= 6 && diffY <= 6) {
        return setTooltip((prev) => {
          const nextPosX = canvas.paddingLeft + position.x;
          const nextPosY = canvas.height - canvas.paddingBottom - position.y;
          const samePosition = prev?.posX === nextPosX && prev.posY === nextPosY;
          return {
            posX: nextPosX,
            posY: nextPosY,
            value: position.value,
            visible: samePosition ? !prev.visible : true,
            color: position.tooltipColor,
            isLast: position.x === lastPosition.x
          };
        });
      }
    }
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      setTooltip(null);
    });
    return () => subscription.remove();
  }, []);

  return (
    <View
      onPointerUp={Platform.OS === "web" ? handleTooltipPosition : undefined}
      style={{ width: canvas.width, height: canvas.height }}>
      {tooltip && tooltip?.visible && (
        <ToolTip
          posX={tooltip.posX}
          posY={tooltip.posY}
          value={`${tooltip.value} ${props.yAxisName}`}
          rightAligned={tooltip.isLast}
          color={tooltip.color}
        />
      )}
      <Canvas
        onTouchEnd={Platform.OS !== "web" ? handleTooltipPosition : undefined}
        style={{ width: canvas.width, height: canvas.height }}>
        <XAxis
          xAxis={xAxis}
          fontSize={XAXIS_FONT_SIZE}
          measures={measures}
          axisLabel={props.xAxisName}
        />
        <YAxis
          yAxis={yAxis}
          fontSize={YAXIS_FONT_SIZE}
          measures={measures}
          axisLabel={props.yAxisName}
        />
        {renderLinePaths()}
      </Canvas>
    </View>
  );
}
