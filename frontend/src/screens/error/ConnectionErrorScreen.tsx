import { NavigationProp } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Platform,
} from "react-native";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { ScreenTitle } from "../../components/ScreenTitle";
import { Paragraph } from "../../components/Paragraph";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { ReloadIcon } from "../../components/icons/ReloadIcon";

type ConnectionErrorProps = {
  navigation: NavigationProp<any>;
};

export const ConnectionErrorScreen = (props: ConnectionErrorProps) => {
  function closeApp() {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    } else {
      props.navigation.goBack();
    }
  }

  return (
    <ScreenWrapper scrollable>
      <View style={styles.container}>
        <View style={styles.containerContainer}>
          <ScreenTitle title="Ocorreu um erro" />
          <Paragraph
            text="Não foi possível carregar as informações. Verifique sua conexão e tente
        novamente."
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SubmitButton
            onPress={() => props.navigation.goBack()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 56,
    justifyContent: "space-between",
  },
  containerContainer: {
    gap: 8,
    marginTop: 105,
  },
  buttonWrapper: {
    gap: 24,
    marginTop: "auto",
  },
  closeAppButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  closeAppButtonLabel: {
    color: "#FFAE31",
    fontFamily: "Roboto-700",
    fontSize: 16,
    lineHeight: 16,
  },
});
