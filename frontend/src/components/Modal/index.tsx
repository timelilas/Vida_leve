import { View, ViewStyle } from "react-native";
import ReactNativeModal from "react-native-modal";
import { colors } from "../../styles/colors";
import { styles } from "./styles";
import { ReactNode } from "react";
import { StyleProp } from "react-native";
import { ANIMATION_IN_DURATION, ANIMATION_OUT_DURATION } from "./constants";

interface ModalProps {
  isVisible: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Modal(props: ModalProps) {
  const { isVisible, style, children } = props;
  return (
    <View>
      <ReactNativeModal
        animationInTiming={ANIMATION_IN_DURATION}
        animationOutTiming={ANIMATION_OUT_DURATION}
        animationIn="zoomIn"
        animationOut="fadeOutUpBig"
        backdropColor={colors.common.black}
        backdropOpacity={0.2}
        isVisible={isVisible}
        style={[styles.container, style]}>
        {children}
      </ReactNativeModal>
    </View>
  );
}
