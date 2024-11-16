import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { NavigationProp } from "@react-navigation/native";
import { Input } from "../../../components/inputs/Input";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { DateInput } from "../../../components/inputs/DateInput";
import { ToggleButton } from "../../../components/buttons/ToggleButton";
import { GenderType } from "./types/types";
import { useState } from "react";
import { Paragraph } from "../../../components/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";

interface ProfileFromScreenProps {
  navigation: NavigationProp<any>;
}

export default function ProfileFormScreen(props: ProfileFromScreenProps) {
  const [gender, setGender] = useState<GenderType | null>(null);
  const [birthDate, setBirthDate] = useState("");

  function selectGender(value: GenderType) {
    setGender(value === gender ? null : value);
  }

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <ScreenHeader
          navigation={props.navigation}
          style={styles.headerContainer}
        />
        <ScreenTitle
          style={styles.title}
          title="Queremos ter conhecer melhor"
        />
        <Paragraph
          style={styles.text}
          text="Complete seu cadastro para tornarmos sua experiência mais personalizada"
        />
        <View style={styles.form}>
          <Input
            value=""
            name="name"
            label="Nome completo"
            placeholder="Nome completo (Ex.: Maria Silva)"
            textContentType="name"
          />
          <Input
            value=""
            name="phone"
            label="Telefone"
            placeholder="(DDD) + número de telefone"
            textContentType="telephoneNumber"
          />
          <DateInput
            textContentType="birthdate"
            value={birthDate}
            onChange={setBirthDate}
            label="Data de nascimento"
            placeholder="dd/mm/aaaa"
            name="birthDate"
          />
          <View>
            <Text style={styles.genderLabel}>Gênero social</Text>
            <View style={styles.genderButtons}>
              <ToggleButton
                selected={gender === "female"}
                onPress={() => selectGender("female")}
              >
                <Text style={styles.gender}>Feminino</Text>
              </ToggleButton>
              <ToggleButton
                selected={gender === "male"}
                onPress={() => selectGender("male")}
              >
                <Text style={styles.gender}>Masculino</Text>
              </ToggleButton>
            </View>
          </View>
        </View>
        <SubmitButton
          onPress={() => props.navigation.navigate("Onboarding/NutritionForm")}
          style={styles.submitButton}
          title="Continuar"
          type="primary"
        />
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
  },
  title: {
    marginTop: 40,
  },
  text: {
    marginTop: 8,
  },
  form: {
    marginTop: 40,
    gap: 16,
    marginBottom: 56,
  },
  genderButtons: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 40,
  },
  genderLabel: {
    fontFamily: "Roboto-400",
    fontSize: 16,
    lineHeight: 16,
    color: "#4E4B66",
    marginBottom: 8,
  },
  gender: {
    fontSize: 16,
    lineHeight: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    fontFamily: "Roboto-400",
    color: "#4E4B66",
  },
  submitButton: {
    marginTop: "auto",
  },
});
