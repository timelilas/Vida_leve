import Svg, { Path, SvgProps } from "react-native-svg";

export function SharpedArrowIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z"
        fill="#49454F"
      />
    </Svg>
  );
}
