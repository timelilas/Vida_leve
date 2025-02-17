import Svg, { Path, SvgProps } from "react-native-svg";

export function PencilIcon(props: SvgProps) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M17 3.49975C17.2626 3.23711 17.5744 3.02877 17.9176 2.88663C18.2608 2.74448 18.6286 2.67133 19 2.67133C19.3714 2.67133 19.7392 2.74448 20.0824 2.88663C20.4256 3.02877 20.7374 3.23711 21 3.49975C21.2626 3.7624 21.471 4.0742 21.6131 4.41736C21.7553 4.76052 21.8284 5.12832 21.8284 5.49975C21.8284 5.87119 21.7553 6.23898 21.6131 6.58214C21.471 6.92531 21.2626 7.23711 21 7.49975L7.5 20.9998L2 22.4998L3.5 16.9998L17 3.49975Z"
        stroke="#4E4B66"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
