import { Image, View, Text } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { GuidanceItem } from "./components/GuidanceItem";
import { FoodTrayIcon } from "../../../components/Icons/FoodTrayIcon";
import { ClipboardIcon } from "../../../components/Icons/ClipboardIcon";
import { TargetIcon } from "../../../components/Icons/TargetIcon";
import { CommonActions } from "@react-navigation/native";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { SubmitButton } from "../../../components/SubmitButton";
import { styles } from "./styles";

const GoalGuidanceScreen = () => {
  const navigation = useAppNavigation();

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RouteConstants.Home }],
      })
    );
  }

  return (
    <ScreenWrapper>
      <NavigationHeader variant="branded" />
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
        <SubmitButton
          style={styles.resetToHomeButton}
          type="highlighted"
          title="Ir para Home"
          onPress={resetNavigationToHome}
        />
      </View>
    </ScreenWrapper>
  );
};

export default GoalGuidanceScreen;
