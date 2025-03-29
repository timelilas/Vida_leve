import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function PizzaChartIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      stroke="#000000"
      fill="transparent"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <Path d="M22 12A10 10 0 0 0 12 2v10z" />
    </Svg>
  );
}
