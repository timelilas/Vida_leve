import { View, ScrollView, Text } from "react-native";
import { SubmitButton } from "../../../components/SubmitButton";
import { Image } from "react-native";
import { BigLogoSVG } from "../../../components/Logos/BigLogoSVG";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

const WelcomeScreen = () => {
  const navigation = useAppNavigation();

  function navigateToSignin() {
    navigation.navigate(RouteConstants.Login);
  }

  function navigateToSignup() {
    navigation.navigate(RouteConstants.Signup);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.backgroundImage}
            source={require("../../../assets/images/orange-gradient.png")}
          />
          <Image
            style={styles.backgroundVegetablesImage}
            source={require("../../../assets/images/vegetables.png")}
          />
          <View style={styles.logoContainer}>
            <BigLogoSVG />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleRuda}>Oiê!!</Text>
            <Text style={styles.titleRoboto}>
              Transforme sua jornada de perda de peso em uma experiência leve e
              motivadora com o{" "}
              <Text style={[styles.titleRoboto, styles.titleRobotoBold]}>
                Vida Leve
              </Text>
              <Text style={styles.titleRoboto}> !</Text>
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <SubmitButton
              title="Começar agora"
              type="primary"
              onPress={navigateToSignup}
            />
            <SubmitButton
              title="Já tenho uma conta"
              type="outlined"
              onPress={navigateToSignin}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
