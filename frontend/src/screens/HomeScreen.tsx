import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { LogoSVG } from "../components/Logo";
import { NavigationProp } from "@react-navigation/native";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { SubmitButton } from "../components/buttons/SubmitButton";
import { ScreenTitle } from "../components/ScreenTitle";

type Tela1ScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Tela1ScreenProps> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <LogoSVG style={styles.logo} />
        <View>
          <ScreenTitle
            style={styles.title}
            title="Transforme sua jornada de perda de peso em uma experiência leve e motivadora com o Vida Leve!"
          />
          <View style={styles.containerButton}>
            <SubmitButton
              title="Começar agora"
              type="primary"
              onPress={() => navigation.navigate("Signup")}
            />
            <SubmitButton
              title="Já tenho uma conta"
              type="outlined"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: "space-between",
    flexGrow: 1,
    gap: 56,
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  title: {
    textAlign: "right",
    marginBottom: 20,
  },
  containerButton: {
    gap: 16,
  },
  logo: {
    marginBottom: 56,
    marginTop: 40,
  },
});

export default HomeScreen;
