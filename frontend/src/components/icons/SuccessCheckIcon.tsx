import Svg, {
  Path,
  SvgProps,
  Circle,
  G,
  Defs,
  RadialGradient,
  Stop,
  ClipPath,
  Rect,
} from "react-native-svg";

export function SuccessCheckIcon(props: SvgProps) {
  return (
    <Svg width={90} height={90} viewBox="0 0 114 114" fill="none" {...props}>
      <Circle
        cx={56.9971}
        cy={56.9971}
        r={56.9971}
        fill="url(#paint0_radial_3003_8073)"
        fillOpacity={0.65}
      />
      <Circle cx={57} cy={55} r={34} fill="#14AE5C" />
      <G clipPath="url(#clip0_3003_8073)">
        <Path
          d="M50.3747 67.875L38.9997 56.5L35.208 60.2916L50.3747 75.4583L82.8747 42.9583L79.083 39.1666L50.3747 67.875Z"
          fill="#EFF0F6"
        />
      </G>
      <Defs>
        <RadialGradient
          id="paint0_radial_3003_8073"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(56.9971 56.9971) rotate(90) scale(56.9971)"
        >
          <Stop stopColor="#14AE5C" />
          <Stop offset={0.435069} stopColor="#33B971" />
          <Stop offset={1} stopColor="#F9FCFA" />
        </RadialGradient>
        <ClipPath id="clip0_3003_8073">
          <Rect
            width={65}
            height={65}
            fill="white"
            transform="translate(26 24)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
