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

type Tela1ScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Tela1ScreenProps> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <LogoSVG style={styles.logo} />
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
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
    gap: 56,
    justifyContent: "space-between",
    paddingTop:
      24 + (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
  },
  containerButton: {
    width: "100%",
    gap: 16,
  },
  logo: {
    marginTop: 40,
  },
});

export default HomeScreen;
