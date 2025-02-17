import Svg, { Path, SvgProps } from "react-native-svg";

export function SearchIcon(props: SvgProps) {
  return (
    <Svg width={23} height={24} viewBox="0 0 23 24" fill="none" {...props}>
      <Path
        d="M20.125 21L15.9562 16.65M18.2083 11C18.2083 15.4183 14.7758 19 10.5417 19C6.30748 19 2.875 15.4183 2.875 11C2.875 6.58172 6.30748 3 10.5417 3C14.7758 3 18.2083 6.58172 18.2083 11Z"
        stroke="#E3E3E3"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.125 21L15.9562 16.65M18.2083 11C18.2083 15.4183 14.7758 19 10.5417 19C6.30748 19 2.875 15.4183 2.875 11C2.875 6.58172 6.30748 3 10.5417 3C14.7758 3 18.2083 6.58172 18.2083 11Z"
        stroke="#050505"
        strokeOpacity={0.2}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
