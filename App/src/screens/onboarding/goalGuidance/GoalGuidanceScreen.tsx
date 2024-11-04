import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { HorizontalLogoSVG } from "../../../components/HorizontalLogoSVG";
import { CloseIcon } from "../../../components/icons/CloseIcon";
import { GuidanceItem } from "./components/GuidanceItem";
import { FoodTrayIcon } from "../../../components/icons/FoodTrayIcon";
import { ClipboardIcon } from "../../../components/icons/ClipboardIcon";
import { TargetIcon } from "../../../components/icons/TargetIcon";

export default function GoalGuidanceScreen() {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <HorizontalLogoSVG />
          <Pressable onPress={() => {}} hitSlop={4} style={styles.closeButton}>
            <CloseIcon />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Como chegar no seu objetivo?</Text>
          <View style={styles.guidanceWrapperShadow}>
            <View style={styles.guidanceWrapper}>
              <GuidanceItem
                title="Coma o que ama, sem restrições!"
                description="Você escolhe e nós te ajudamos a encontrar seus alimentos preferidos"
                icon={<FoodTrayIcon />}
              />
              <GuidanceItem
                title="Registre suas refeições  "
                description="Adicione o que comeu e monitore sua ingestão calórica."
                icon={<ClipboardIcon />}
              />
              <GuidanceItem
                title="Coma o que ama, sem restrições!"
                description="Você terá um limite diário de calorias para garantir que alcance a sua meta."
                icon={<TargetIcon />}
              />
            </View>
          </View>
          <View style={styles.adviceWrapper}>
            <Text style={styles.heading}>
              O que acontece ao seu redor importa!
            </Text>
            <Text style={styles.adviceDescription}>
              O processo de emagrecimento é individual e depende de muitos
              fatores.
            </Text>
            <View style={styles.adviceImageBox}>
              <Image
                style={styles.adviceImage}
                source={require("../../../assets/healthy-lifestyle.png")}
              />
            </View>
            <Text style={styles.adviceLabel}>
              Para um acompanhamento mais específico, consulte um médico ou
              nutricionista.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  headerContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    height: 31,
    borderRadius: 31 / 2,
    right: 0,
    top: "50%",
    transform: [{ translateY: -31 / 2 }],
  },
  contentContainer: {
    marginTop: 64,
  },
  heading: {
    fontSize: 24,
    lineHeight: 28.8,
    fontFamily: "Roboto-700",
    color: "#4e4b66",
    textAlign: "center",
  },
  guidanceWrapperShadow: {
    overflow: "hidden",
    paddingBottom: 16,
    borderRadius: 16,
    marginTop: 10,
  },
  guidanceWrapper: {
    backgroundColor: "#f7f7fc",
    padding: 8,
    borderRadius: 16,
    gap: 16,
    ...{
      ...(Platform.OS === "android"
        ? {
            elevation: 4,
            shadowColor: "#000000",
          }
        : {
            shadowColor: "#00000040",
            shadowOffset: { height: 4, width: 0 },
            shadowRadius: 4,
          }),
    },
  },
  adviceWrapper: {
    marginTop: 32,
    gap: 8,
    alignItems: "center",
  },
  adviceDescription: {
    fontSize: 16,
    fontFamily: "Roboto-300",
    textAlign: "center",
    color: "#242424",
  },
  adviceImageBox: {
    maxWidth: 314,
    height: 209,
    width: "100%",
  },
  adviceImage: {
    width: "100%",
    height: "100%",
  },
  adviceLabel: {
    fontFamily: "Roboto-300",
    fontSize: 14,
    color: "#242424",
    textAlign: "center",
  },
});
