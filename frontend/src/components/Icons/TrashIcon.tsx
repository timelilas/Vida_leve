import Svg, { Path, SvgProps } from "react-native-svg";

export function TrashIcon(props: SvgProps) {
  const { stroke, ...propsRest } = props;
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...propsRest}>
      <Path
        d="M2 3.99998H3.33333M3.33333 3.99998H14M3.33333 3.99998L3.33333 13.3333C3.33333 13.6869 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6666 4.66667 14.6666H11.3333C11.687 14.6666 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.6869 12.6667 13.3333V3.99998M5.33333 3.99998V2.66665C5.33333 2.31302 5.47381 1.97389 5.72386 1.72384C5.97391 1.47379 6.31304 1.33331 6.66667 1.33331H9.33333C9.68696 1.33331 10.0261 1.47379 10.2761 1.72384C10.5262 1.97389 10.6667 2.31302 10.6667 2.66665V3.99998"
        stroke={stroke || "#1E1E1E"}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
