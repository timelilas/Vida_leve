import { View, ViewStyle } from "react-native";
import ReactNativeModal from "react-native-modal";
import { colors } from "../../styles/colors";
import { styles } from "./styles";
import { ReactNode } from "react";
import { StyleProp } from "react-native";

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
        animationInTiming={350}
        animationOutTiming={600}
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
