import Svg, { Path, SvgProps, G, Defs, ClipPath, Rect } from "react-native-svg";

export function MugIcon(props: SvgProps) {
  const { stroke, ...propsRest } = props;
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...propsRest}>
      <G clipPath="url(#clip0_80423_51)">
        <Path
          d="M23.3333 11.8H24.6667C26.0812 11.8 27.4377 12.39 28.4379 13.4402C29.4381 14.4904 30 15.9148 30 17.4C30 18.8852 29.4381 20.3096 28.4379 21.3598C27.4377 22.41 26.0812 23 24.6667 23H23.3333M23.3333 11.8H2V24.4C2 25.8852 2.5619 27.3096 3.5621 28.3598C4.56229 29.41 5.91885 30 7.33333 30H18C19.4145 30 20.771 29.41 21.7712 28.3598C22.7714 27.3096 23.3333 25.8852 23.3333 24.4V11.8ZM7.33333 2V6.2M12.6667 2V6.2M18 2V6.2"
          stroke={stroke || "#4E4B66"}
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_80423_51">
          <Rect width={32} height={32} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
