import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";

export function SharpedCloseIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <G clipPath="url(#clip0_4414_848)">
        <Path
          d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
          fill="#F95D4D"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4414_848">
          <Rect width={18} height={18} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
