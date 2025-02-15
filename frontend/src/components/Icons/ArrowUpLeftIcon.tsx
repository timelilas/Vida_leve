import Svg, { Path, SvgProps } from "react-native-svg";

export function ArrowUpLeftIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17 17L7 7M7 7V17M7 7H17"
        stroke="#E3E3E3"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 17L7 7M7 7V17M7 7H17"
        stroke="#050505"
        strokeOpacity={0.2}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
