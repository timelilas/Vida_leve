import { View, StyleSheet, ScrollView, Text, Platform } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { Image } from "react-native";
import { BigLogoSVG } from "../../../components/logos/BigLogoSVG";

type WelcomeScreenProps = {
  navigation: NavigationProp<any>;
};

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <ScreenWrapper>
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
              onPress={() => navigation.navigate("Auth/Signup")}
            />
            <SubmitButton
              title="Já tenho uma conta"
              type="outlined"
              onPress={() => navigation.navigate("Auth/Login")}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    gap: 56,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flex: 1,
    justifyContent: "center",
    gap: 56,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 368,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    overflow: "hidden",
    ...(Platform.OS === "android"
      ? {
          shadowColor: "#000000",
          elevation: 6,
        }
      : {
          shadowColor: "#00000040",
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 4,
        }),
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  backgroundVegetablesImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    marginBottom: 60,
  },
  titleContainer: {
    marginTop: "auto",
  },
  titleRuda: {
    fontFamily: "Ruda-700",
    fontSize: 48,
    lineHeight: 53,
    color: "#3AA1A8",
  },
  titleRoboto: {
    fontFamily: "Roboto-400",
    fontSize: 24,
    lineHeight: 24,
    color: "#242424",
  },
  titleRobotoBold: {
    fontFamily: "Roboto-700",
    color: "#FFAE31",
  },
  buttonWrapper: {
    marginTop: "auto",
    gap: 16,
  },
});
