import { Platform, useWindowDimensions } from "react-native";
import { APP_FRAME_WIDTH, WEB_SCREEN_WIDTH_BREAKPOINT } from "../../../constants/webConstants";

interface UseChartMeasuresParams {
  canvasHeight?: number;
  canvasWidth?: number;
  canvasPaddingLeft?: number;
}

export function useChartMeasures(params?: UseChartMeasuresParams) {
  const dimensions = useWindowDimensions();

  const defaultCanvasWidth =
    Platform.OS === "web" && dimensions.width >= WEB_SCREEN_WIDTH_BREAKPOINT
      ? APP_FRAME_WIDTH - 8
      : dimensions.width;

  const CHART_STROKE_WIDTH = 1;

  const LINE_POINT_RADIUS = 3;

  const CANVAS_HEIGHT = params?.canvasHeight || 260;
  const CANVAS_WIDTH = params?.canvasWidth || defaultCanvasWidth - 32;
  const PADDING_LEFT = params?.canvasPaddingLeft ?? 40;
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
    margintTop: 10,
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
