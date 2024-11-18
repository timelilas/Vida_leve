import Svg, { Path, SvgProps } from "react-native-svg";

export function ArrowIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      style={{ flexShrink: 0 }}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M15 18.5L9 12.5L15 6.5"
        stroke="#4E4B66"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
