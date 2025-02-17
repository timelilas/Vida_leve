import {
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Platform,
} from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { SubmitButton } from "../../../components/SubmitButton";
import { ReloadIcon } from "../../../components/Icons/ReloadIcon";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { styles } from "./styles";

const ConnectionErrorScreen = () => {
  const navigation = useAppNavigation();

  function goBack() {
    navigation.goBack();
  }

  function closeApp() {
    return Platform.OS === "android" ? BackHandler.exitApp() : goBack();
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.containerContainer}>
          <ScreenTitle title="Ocorreu um erro" />
          <Paragraph>
            Não foi possível carregar as informações. Verifique sua conexão e
            tente novamente.
          </Paragraph>
        </View>
        <View style={styles.buttonWrapper}>
          <SubmitButton
            onPress={goBack}
            type="highlighted"
            title="Atualizar"
            icon={<ReloadIcon />}
          />
          <TouchableOpacity
            onPress={closeApp}
            style={styles.closeAppButton}
            activeOpacity={0.7}
          >
            <Text style={styles.closeAppButtonLabel}>Sair do aplicativo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ConnectionErrorScreen;
