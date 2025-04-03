import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export function LineChartIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M3 3v18h18" />
      <Path d="m19 9-5 5-4-4-3 3" />
    </Svg>
  );
}
