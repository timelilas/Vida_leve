import {
  Skia,
  Canvas,
  Path,
  Color,
  Group,
  Paint,
  Circle,
} from "@shopify/react-native-skia";
import { ReactElement, ReactNode } from "react";
import { colors } from "../../styles/colors";
import { View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { ChartLabel } from "./components/ChartLabel";
import { StyleProp } from "react-native";

export interface PizzaChartProps {
  style?: StyleProp<ViewStyle>;
  data: {
    value: number;
    color: Color;
    label: { title: string; subtitle?: string };
  }[];
}

export function PizzaChart(props: PizzaChartProps) {
  const { data } = props;
  const CANVAS_SIZE = 200;
  const CANVAS_PADDING = 4;

  const CHART_STROKE_WIDTH = 2;
  const CHART_CENTER = CANVAS_SIZE / 2;
  const CHART_RADIUS = (CANVAS_SIZE - CANVAS_PADDING * 2) / 2;
  const CHART_DIAMETER = CHART_RADIUS * 2;

  const total = data.reduce((acc, item) => (acc += item.value), 0);
  const slices = data.map((item) => ({
    color: item.color,
    value: item.value / total,
    label: item.label,
  }));

  function createSlice(params: {
    id: number | string;
    startAngle: number;
    sweepgAngle: number;
    color: Color;
  }) {
    const path = Skia.Path.Make();
    const startAngleDeg = params.startAngle;
    const sweepAngleDeg = params.sweepgAngle;

    // O traço (path) começa a partir do centro do gráfico
    path.moveTo(CHART_CENTER, CHART_CENTER);

    // Após, uma linha reta é desenhada até o ponto correspondente ao ângulo inicial do arco
    const startRad = (Math.PI / 180) * startAngleDeg;
    const startX = CHART_CENTER + CHART_RADIUS * Math.cos(startRad);
    const startY = CHART_CENTER + CHART_RADIUS * Math.sin(startRad);
    path.lineTo(startX, startY);

    // O arco então é desenhado até o ponto correspondente ao ângulo final
    path.addArc(
      {
        x: CANVAS_PADDING,
        y: CANVAS_PADDING,
        height: CHART_DIAMETER,
        width: CHART_DIAMETER,
      },
      startAngleDeg,
      sweepAngleDeg
    );

    // Por fim, a linha volta ao ponto central do gŕafico
    path.lineTo(CHART_CENTER, CHART_CENTER);
    path.close();

    return sweepAngleDeg >= 360 ? (
      <Group key={params.id}>
        <Path path={path} color={params.color} style="fill" />
        <Circle
          r={CHART_RADIUS}
          cx={CHART_CENTER}
          cy={CHART_CENTER}
          strokeWidth={CHART_STROKE_WIDTH}
          color={colors.common.white}
          style="stroke"
        />
      </Group>
    ) : (
      <Path key={params.id} path={path} color={params.color} style="fill">
        {sweepAngleDeg !== 0 ? (
          <Paint
            color={colors.common.white}
            style="stroke"
            strokeWidth={CHART_STROKE_WIDTH}
          />
        ) : null}
      </Path>
    );
  }

  function createLabelBox(params: {
    id: string | number;
    startAngle: number;
    sliceValue: number;
    children: ReactNode;
  }) {
    const { id, startAngle, sliceValue, children } = params;

    const endAngle = startAngle + 360 * sliceValue;
    const middleAngle = (startAngle + endAngle) / 2;
    const middleAngleRad = (Math.PI / 180) * middleAngle;

    const middleX = CHART_CENTER + CHART_RADIUS * Math.cos(middleAngleRad);
    const middleY = CHART_CENTER + CHART_RADIUS * Math.sin(middleAngleRad);

    const diffX = middleX - CHART_CENTER;
    const diffY = middleY - CHART_CENTER;

    const finalPosX = CHART_CENTER + diffX / 2;
    const finalPosY = CHART_CENTER + diffY / 2;

    let translateX: `${number}%` = "-50%";
    let translateY: `${number}%` = "-50%";

    let left = finalPosX;
    let top = finalPosY;

    const slicePercentValue = Math.round(sliceValue * 100);

    if (slicePercentValue < 16) {
      if (middleX > CHART_CENTER) translateX = "30%";
      if (middleX < CHART_CENTER) translateX = "-90%";
      left = middleX;
      top = middleY;
    }

    if (sliceValue >= 1) {
      left = CHART_CENTER;
      top = CHART_CENTER;
    }

    return (
      <View
        key={id}
        style={[
          styles.labelBox,
          { left, top, transform: [{ translateX }, { translateY }] },
        ]}
      >
        {sliceValue === 0 ? null : children}
      </View>
    );
  }

  function renderChart() {
    const slicePaths: ReactElement[] = [];
    let startAngle = 0;

    for (let i = 0; i < slices.length; i++) {
      slicePaths.push(
        createSlice({
          id: i,
          startAngle: startAngle,
          sweepgAngle: 360 * slices[i].value,
          color: slices[i].color,
        })
      );
      startAngle = startAngle + 360 * slices[i].value;
    }

    return <Group>{slicePaths}</Group>;
  }

  function renderLabels() {
    const textBoxes: ReactElement[] = [];
    let startAngle = 0;

    for (let i = 0; i < slices.length; i++) {
      const sliceValue = slices[i].value;
      const label = slices[i].label;

      const chartLabel = (
        <ChartLabel title={label.title} subtitle={label.subtitle} />
      );

      textBoxes.push(
        createLabelBox({ id: i, startAngle, sliceValue, children: chartLabel })
      );

      startAngle = startAngle + 360 * sliceValue;
    }

    return textBoxes;
  }

  return (
    <View
      style={[
        styles.container,
        { width: CANVAS_SIZE, height: CANVAS_SIZE },
        props.style,
      ]}
    >
      <Canvas
        style={{
          height: CANVAS_SIZE,
          width: CANVAS_SIZE,
        }}
      >
        {renderChart()}
      </Canvas>
      {renderLabels()}
    </View>
  );
}
