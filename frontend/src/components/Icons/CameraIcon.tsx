import Svg, { Path, SvgProps, G, Defs, ClipPath, Rect } from "react-native-svg";

export function CameraIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_5013_1403)">
        <Path
          d="M15.3337 12.6667C15.3337 13.0203 15.1932 13.3594 14.9431 13.6095C14.6931 13.8595 14.3539 14 14.0003 14H2.00033C1.6467 14 1.30756 13.8595 1.05752 13.6095C0.807468 13.3594 0.666992 13.0203 0.666992 12.6667V5.33333C0.666992 4.97971 0.807468 4.64057 1.05752 4.39052C1.30756 4.14048 1.6467 4 2.00033 4H4.66699L6.00033 2H10.0003L11.3337 4H14.0003C14.3539 4 14.6931 4.14048 14.9431 4.39052C15.1932 4.64057 15.3337 4.97971 15.3337 5.33333V12.6667Z"
          stroke="#1E1E1E"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.00033 11.3333C9.47309 11.3333 10.667 10.1394 10.667 8.66667C10.667 7.19391 9.47309 6 8.00033 6C6.52757 6 5.33366 7.19391 5.33366 8.66667C5.33366 10.1394 6.52757 11.3333 8.00033 11.3333Z"
          stroke="#1E1E1E"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5013_1403">
          <Rect width={16} height={16} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
