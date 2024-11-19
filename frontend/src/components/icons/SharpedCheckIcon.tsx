import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";

export function SharpedCheckIcon(props: SvgProps) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <G clipPath="url(#clip0_4414_830)">
        <Path
          d="M5.25 9.45L2.8 7L1.98334 7.81666L5.25 11.0833L12.25 4.08333L11.4333 3.26666L5.25 9.45Z"
          fill="#14AE5C"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4414_830">
          <Rect width={14} height={14} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
