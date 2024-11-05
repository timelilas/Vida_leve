import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";

export function CloseIcon(props: SvgProps) {
  return (
    <Svg width={31} height={31} viewBox="0 0 31 31" fill="none" {...props}>
      <G clipPath="url(#clip0_4414_1276)">
        <Path
          d="M24.5416 8.27958L22.7203 6.45833L15.4999 13.6788L8.2795 6.45833L6.45825 8.27958L13.6787 15.5L6.45825 22.7204L8.2795 24.5417L15.4999 17.3213L22.7203 24.5417L24.5416 22.7204L17.3212 15.5L24.5416 8.27958Z"
          fill="#4E4B66"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4414_1276">
          <Rect width={31} height={31} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
