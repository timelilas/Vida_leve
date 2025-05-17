import * as d3 from "d3";

interface UseChartDomainParams {
  yAxisTickMultiple?: number;
  xLabels: string[];
  yData: number[];
  chart: {
    height: number;
    width: number;
  };
}

export function useChartDomain(params: UseChartDomainParams) {
  const { chart, xLabels, yData, yAxisTickMultiple } = params;
  const yTickMultiple = yAxisTickMultiple || 1;

  const yRange = [0, chart.height];
  const yDomain = [0, Math.ceil((d3.max(yData)! * 1.25) / yTickMultiple) * yTickMultiple];
  const yAxis = d3.scaleLinear().range(yRange).domain(yDomain);

  const xRange = [0, chart.width];
  const xAxis = d3.scalePoint().range(xRange).domain(xLabels);

  return { xAxis, yAxis };
}
