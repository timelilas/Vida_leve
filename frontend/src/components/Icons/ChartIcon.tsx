import Svg, { Rect, Path, SvgProps } from "react-native-svg";

export function ChartIcon(props: SvgProps) {
  return (
    <Svg width={72} height={66} viewBox="0 0 72 66" fill="none" {...props}>
      <Rect x={1.5} y={1.5} width={69} height={63} rx={6.5} stroke="#FFAE31" strokeWidth={3} />
      <Path
        d="M8.20843 46.0081L23.6674 30.8509L34.7095 41.6775L56.7938 20.0244M56.7938 20.0244H41.3348M56.7938 20.0244V35.1816M7.26155 8V59M6 59H59"
        stroke="#FFAE31"
        strokeWidth={3}
      />
    </Svg>
  );
}
