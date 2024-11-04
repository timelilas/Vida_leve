import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style/Tela1Screen.styles";
import { LogoSVG } from "../components/Logo";
import { NavigationProp } from "@react-navigation/native";

type Tela1ScreenProps = {
  navigation: NavigationProp<any>;
};

const Tela1Screen: React.FC<Tela1ScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LogoSVG />
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.buttonText}>Começar agora</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tela1Screen;
