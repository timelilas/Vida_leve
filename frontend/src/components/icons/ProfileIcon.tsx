import Svg, { Path, SvgProps } from "react-native-svg";

export function ProfileIcon(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Path
        d="M36 38V34C36 31.8783 35.1571 29.8434 33.6569 28.3431C32.1566 26.8429 30.1217 26 28 26H12C9.87827 26 7.84344 26.8429 6.34315 28.3431C4.84285 29.8434 4 31.8783 4 34V38M28 10C28 14.4183 24.4183 18 20 18C15.5817 18 12 14.4183 12 10C12 5.58172 15.5817 2 20 2C24.4183 2 28 5.58172 28 10Z"
        stroke="#242424"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
