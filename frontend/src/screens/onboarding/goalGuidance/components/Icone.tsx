import Svg, { Path, SvgProps } from "react-native-svg";

export function Icone(props: SvgProps){
  return <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M20.24 12.74C21.3658 11.6142 21.9983 10.0872 21.9983 8.49504C21.9983 6.90285 21.3658 5.37588 20.24 4.25004C19.1142 3.12419 17.5872 2.4917 15.995 2.4917C14.4028 2.4917 12.8758 3.12419 11.75 4.25004L5 11V19.5H13.5L20.24 12.74Z"
      fill="#FFAE31"
    />
    <Path
      d="M16 8.50004L2 22.5M17.5 15.5H9M20.24 12.74C21.3658 11.6142 21.9983 10.0872 21.9983 8.49504C21.9983 6.90285 21.3658 5.37588 20.24 4.25004C19.1142 3.12419 17.5872 2.4917 15.995 2.4917C14.4028 2.4917 12.8758 3.12419 11.75 4.25004L5 11V19.5H13.5L20.24 12.74Z"
      stroke="#1E1E1E"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
}
  