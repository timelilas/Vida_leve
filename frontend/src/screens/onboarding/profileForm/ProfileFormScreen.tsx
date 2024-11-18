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
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { Input } from "../../../components/inputs/Input";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { DateInput } from "../../../components/inputs/DateInput";
import { ToggleButton } from "../../../components/buttons/ToggleButton";
import { GenderType } from "./types/types";
import { useState } from "react";
import { Paragraph } from "../../../components/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { useForm } from "../../../hooks/useForm";
import { httpAuthService } from "../../../services/auth";

type ProfileFromScreenProps = {
  navigation: NavigationProp<any>;
};

const profileFromInitialState = {
  name: "",
  phone: "",
  birthDate: "",
  gender: "",
};

const ProfileFormScreen = (props: ProfileFromScreenProps) => {
  const [gender, setGender] = useState<GenderType | null>(null);
  const { data, handleChange, setError } = useForm(profileFromInitialState);
  const { values } = data;

  async function ProfileForme() {
    const result = await httpAuthService.profileForm(values)

    if(!result.success) {
      const field = result.error.field || undefined;
      setError({ message: result.error.message, field: field as any });
    }
    else {
      console.log(result);
      props.navigation.dispatch(
        CommonActions.reset({ routes : [{ name: "Onboarding/NutritionForm"}]})
      )
    }
  }

  function selectGender(value: GenderType) {
    setGender(value === gender ? null : value);
    handleChange("gender", value)
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
            value={values.name}
            onChange={(value) => handleChange("name", value)}
            name="name"
            label="Nome completo"
            placeholder="Nome completo (Ex.: Maria Silva)"
            textContentType="name"
          />
          <Input
            value={values.phone}
            onChange={(value) => handleChange("phone", value)}
            name="phone"
            label="Telefone"
            placeholder="(DDD) + número de telefone"
            textContentType="telephoneNumber"
          />
          <DateInput
            value={values.birthDate}
            textContentType="birthdate"
            onChange={(value) => handleChange("birthDate", value)}
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
          onPress={ProfileForme}
          style={styles.submitButton}
          title="Continuar"
          type="primary"
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileFormScreen;

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
