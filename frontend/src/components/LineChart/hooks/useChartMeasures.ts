import { useWindowDimensions } from "react-native";

interface UseChartMeasuresParams {
  canvasHeight?: number;
  canvasWidth?: number;
}

export function useChartMeasures(params?: UseChartMeasuresParams) {
  const dimensions = useWindowDimensions();

  const CHART_STROKE_WIDTH = 1;

  const LINE_POINT_RADIUS = 3;

  const CANVAS_HEIGHT = params?.canvasHeight || 260;
  const CANVAS_WIDTH = params?.canvasWidth || dimensions.width - 32;
  const PADDING_LEFT = 44;
  const PADDING_BOTTOM = 40;
  const PADDING_TOP = 1;
  const PADDING_RIGHT = 8;

  const canvas = {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    paddingLeft: PADDING_LEFT,
    paddingRight: PADDING_RIGHT,
    paddingBottom: PADDING_BOTTOM,
    paddingTop: PADDING_TOP
  };

  const xAxis = {
    margintTop: 8,
    tickWidth: 1,
    tickHeight: 8
  };

  const yAxis = {
    tickWidth: 8,
    tickHeight: 1,
    labelMarginRight: 2
  };

  const chart = {
    width: canvas.width - canvas.paddingLeft - canvas.paddingRight,
    height: canvas.height - canvas.paddingTop - canvas.paddingBottom,
    strokeWidth: CHART_STROKE_WIDTH,
    x: canvas.paddingLeft - CHART_STROKE_WIDTH / 2,
    y: canvas.paddingTop
  };

  const linePoint = {
    r: LINE_POINT_RADIUS
  };

  return {
    canvas,
    chart,
    xAxis,
    yAxis,
    linePoint
  };
}
