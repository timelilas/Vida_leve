import Svg, { Path, SvgProps } from "react-native-svg";

export function SolidArrowIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path d="M9 11.25L5.25 7.5H12.75L9 11.25Z" fill="#49454F" />
    </Svg>
  );
}
