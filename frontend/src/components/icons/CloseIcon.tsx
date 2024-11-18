import Svg, { Path, SvgProps } from "react-native-svg";

export function CloseIcon(props: SvgProps) {
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
        d="M18 6L6 18M6 6L18 18"
        stroke="#4E4B66"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
