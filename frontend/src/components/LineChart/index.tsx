import { Dimensions, Platform, View } from "react-native";
import { Canvas, Color, Group, Rect } from "@shopify/react-native-skia";
import { colors } from "../../styles/colors";
import { useEffect, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { PointerEvent } from "react-native";
import { useChartMeasures } from "./hooks/useChartMeasures";
import { ToolTip } from "./components/ToolTip";
import { XAxis } from "./components/XAxis";
import { YAxis } from "./components/YAxis";
import { ChartLinePath } from "./components/LinePath";
import { LinePoint } from "./components/LinePoint";
import { useChartDomain } from "./hooks/useChartDomain";

interface TooltipState {
  value: number;
  posX: number;
  posY: number;
  visible: boolean;
}

interface LineChartProps {
  labels: string[];
  data: {
    values: number[];
    color: Color;
    withDots?: boolean;
    withTooltip?: boolean;
    withYLabel?: boolean;
  }[];
}

export function LineChart(props: LineChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const XAXIS_FONT_SIZE = 14;
  const YAXIS_FONT_SIZE = 14;
  const LINE_PATH_STROKE_WIDTH = 3;

  const { canvas, chart, linePoint } = useChartMeasures();

  const { xAxis, yAxis } = useChartDomain({
    xLabels: props.labels,
    yData: props.data.map(({ values }) => values).flat(1),
    chart: { width: chart.width, height: chart.height },
  });

  const yStep = Math.ceil(yAxis.domain()[yAxis.domain().length - 1] / 4);
  const ySubDomain = props.data.reduce((acc, { values, withYLabel }) => {
    if (withYLabel) acc.push(...values);
    return acc;
  }, [] as number[]);

  const allowedTooltipPositions = props.data.reduce((acc, dataItem) => {
    if (dataItem.withTooltip) {
      const positions = dataItem.values.map((value, i) => {
        return {
          x: Math.trunc(xAxis(props.labels[i])!),
          y: Math.trunc(yAxis(value)),
          value,
        };
      });
      acc.push(...positions);
    }
    return acc;
  }, [] as { x: number; y: number; value: number }[]);

  function renderInnerLines() {
    const innerLinesDomain = Array.from(
      { length: 4 },
      (_, i) => yStep * i
    ).slice(1);
    return (
      <Group>
        {innerLinesDomain.map((value, i) => {
          return (
            <Rect
              key={i}
              x={chart.x}
              y={canvas.height - canvas.paddingBottom - yAxis(value)}
              height={1}
              width={chart.width}
              color={colors.gray.light}
            />
          );
        })}
      </Group>
    );
  }

  function renderChartBorder() {
    return <Rect {...chart} style="stroke" color={colors.gray.light} />;
  }

  function renderLinePaths() {
    return props.data.map(({ color, values, withDots }, i) => {
      const data = values.map((value, i) => {
        return { value, label: props.labels[i] };
      });
      return (
        <Group key={i}>
          <ChartLinePath
            canvasWidth={canvas.width}
            canvasHeight={canvas.height}
            strokeWidth={LINE_PATH_STROKE_WIDTH}
            xAxis={xAxis}
            yAxis={yAxis}
            color={color}
            data={data}
          />
          {withDots
            ? data.map(({ label, value }) => (
                <Group key={label}>
                  <LinePoint
                    size={linePoint.r}
                    y={canvas.height - canvas.paddingBottom - yAxis(value)}
                    x={canvas.paddingLeft + xAxis(label)!}
                    color={color}
                  />
                </Group>
              ))
            : null}
        </Group>
      );
    });
  }

  function handleTooltipPosition(e: GestureResponderEvent | PointerEvent) {
    let posX = 0;
    let posY = 0;
    let platformEvent = e;

    if (Platform.OS === "web") {
      platformEvent = e as PointerEvent;
      posX = Math.trunc(platformEvent.nativeEvent.offsetX) - canvas.paddingLeft;
      posY =
        canvas.height -
        canvas.paddingBottom -
        Math.trunc(platformEvent.nativeEvent.offsetY);
    } else {
      platformEvent = e as GestureResponderEvent;
      posX =
        Math.trunc(platformEvent.nativeEvent.locationX) - canvas.paddingLeft;
      posY =
        canvas.height -
        canvas.paddingBottom -
        Math.trunc(platformEvent.nativeEvent.locationY);
    }

    for (const position of allowedTooltipPositions) {
      const diffX = Math.abs(position.x - posX);
      const diffY = Math.abs(position.y - posY);

      if (diffX <= 5 && diffY <= 6) {
        setTooltip((prev) => {
          const nextPosX = canvas.paddingLeft + position.x;
          const nextPosY = canvas.height - canvas.paddingBottom - position.y;
          return {
            posX: nextPosX,
            posY: nextPosY,
            value: position.value,
            visible:
              prev?.posX === nextPosX && prev.posY === nextPosY
                ? !prev.visible
                : true,
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
      style={{ width: canvas.width, height: canvas.height }}
    >
      {tooltip?.visible && (
        <ToolTip
          posX={tooltip.posX}
          posY={tooltip.posY}
          value={`${tooltip.value}`}
        />
      )}
      <Canvas
        onTouchEnd={Platform.OS !== "web" ? handleTooltipPosition : undefined}
        style={{
          width: canvas.width,
          height: canvas.height,
        }}
      >
        {renderChartBorder()}
        {renderInnerLines()}
        <XAxis
          xAxis={xAxis}
          fontSize={XAXIS_FONT_SIZE}
          canvasHeight={canvas.height}
          canvasWidth={canvas.width}
          axisLabel="Dias do mês"
        />
        <YAxis
          yAxis={yAxis}
          fontSize={YAXIS_FONT_SIZE}
          canvasHeight={canvas.height}
          canvasWidth={canvas.width}
          axisLabel="kcal"
          subdomain={[...new Set(ySubDomain)]}
        />
        {renderLinePaths()}
      </Canvas>
    </View>
  );
}
