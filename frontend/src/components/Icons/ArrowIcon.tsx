import Svg, { Path, SvgProps } from "react-native-svg";

export function ArrowIcon(props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      style={{ flexShrink: 0 }}
      fill="none"
      {...props}
    >
      <Path
        d="M20 24L12 16L20 8"
        stroke="#4E4B66"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
