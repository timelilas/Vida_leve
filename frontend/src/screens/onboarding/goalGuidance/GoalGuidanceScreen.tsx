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
import { HorizontalLogoSVG } from "../../../components/logos/HorizontalLogoSVG";
import { CloseIcon } from "../../../components/icons/CloseIcon";
import { GuidanceItem } from "./components/GuidanceItem";
import { FoodTrayIcon } from "../../../components/icons/FoodTrayIcon";
import { ClipboardIcon } from "../../../components/icons/ClipboardIcon";
import { TargetIcon } from "../../../components/icons/TargetIcon";
import { NavigationProp } from "@react-navigation/native";
import { ScreenTitle } from "../../../components/ScreenTitle";

type GoalGuidanceScreenProps = {
  navigation: NavigationProp<any>;
};

const GoalGuidanceScreen = (props: GoalGuidanceScreenProps) => {
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <HorizontalLogoSVG />
          <Pressable
            onPress={() => props.navigation.goBack()}
            hitSlop={4}
            style={styles.closeButton}
          >
            <CloseIcon />
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <ScreenTitle
            style={styles.title}
            title="Como chegar no seu objetivo?"
          />
          <View style={styles.guidanceWrapperShadow}>
            <View style={styles.guidanceWrapper}>
              <GuidanceItem
                title="Coma o que ama, sem restrições!"
                description="Você escolhe e nós te ajudamos a encontrar seus alimentos preferidos"
                icon={<FoodTrayIcon />}
              />
              <View style={styles.separator} />
              <GuidanceItem
                title="Registre suas refeições  "
                description="Adicione o que comeu e monitore sua ingestão calórica."
                icon={<ClipboardIcon />}
              />
              <View style={styles.separator} />
              <GuidanceItem
                title="Meta personalizada "
                description="Você terá um limite diário de calorias para garantir que alcance a sua meta."
                icon={<TargetIcon />}
              />
            </View>
          </View>
          <View style={styles.adviceWrapper}>
            <ScreenTitle
              style={styles.title}
              title="O que acontece ao seu redor importa!"
            />
            <Text style={styles.adviceDescription}>
              O processo de emagrecimento é individual e depende de muitos
              fatores.
            </Text>
            <View style={styles.adviceImageBox}>
              <Image
                style={styles.adviceImage}
                source={require("../../../assets/images/healthy-lifestyle.png")}
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
};

export default GoalGuidanceScreen;

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
    padding: 2,
    borderRadius: 28 / 2,
    right: 0,
    top: "50%",
    transform: [{ translateY: -28 / 2 }],
  },
  contentContainer: {
    marginTop: 64,
  },
  separator: {
    height: 2,
    backgroundColor: "#B7B7B7",
  },
  title: {
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
