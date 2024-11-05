import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";

export function LightningIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={25}
      style={{ flexShrink: 0 }}
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_4706_1160)">
        <Path
          d="M7.28569 1.35712L3.42855 10.46C3.3752 10.5898 3.35458 10.7308 3.36846 10.8705C3.38235 11.0102 3.43033 11.1444 3.50821 11.2612C3.58607 11.378 3.69145 11.4739 3.81507 11.5404C3.93867 11.607 4.07674 11.6421 4.21712 11.6428H8.99998L5.57141 23.6428L20.2971 9.68855C20.4195 9.57067 20.504 9.41913 20.54 9.25312C20.576 9.08712 20.562 8.91415 20.4994 8.75618C20.437 8.59821 20.329 8.46237 20.1893 8.36587C20.0494 8.26939 19.8841 8.21661 19.7143 8.21426H13.2857L16.7143 1.35712H7.28569Z"
          fill="#FFAE31"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4706_1160">
          <Rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
