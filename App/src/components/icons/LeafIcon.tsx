import Svg, { Path, SvgProps } from "react-native-svg";

export function LeafIcon(props: SvgProps) {
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
        d="M20.24 12.74C21.3658 11.6141 21.9983 10.0872 21.9983 8.49497C21.9983 6.90279 21.3658 5.37582 20.24 4.24997C19.1142 3.12413 17.5872 2.49164 15.995 2.49164C14.4028 2.49164 12.8758 3.12413 11.75 4.24997L5 11V19.5H13.5L20.24 12.74Z"
        fill="#FFAE31"
      />
      <Path
        d="M16 8.49997L2 22.5M17.5 15.5H9M20.24 12.74C21.3658 11.6141 21.9983 10.0872 21.9983 8.49497C21.9983 6.90279 21.3658 5.37582 20.24 4.24997C19.1142 3.12413 17.5872 2.49164 15.995 2.49164C14.4028 2.49164 12.8758 3.12413 11.75 4.24997L5 11V19.5H13.5L20.24 12.74Z"
        stroke="#1E1E1E"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
