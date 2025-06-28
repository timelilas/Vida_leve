import Svg, { Path, SvgProps } from "react-native-svg";

export function CloseIcon(props: SvgProps) {
  const { stroke, ...propsRest } = props;
  return (
    <Svg
      width={24}
      height={24}
      style={{ flexShrink: 0 }}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      {...propsRest}>
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={stroke || "#4E4B66"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
