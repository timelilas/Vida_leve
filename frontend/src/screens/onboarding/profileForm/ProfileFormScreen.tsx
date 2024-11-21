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
import { CommonActions } from "@react-navigation/native";
import { Input } from "../../../components/inputs/Input";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { DateInput } from "../../../components/inputs/DateInput";
import { ToggleButton } from "../../../components/buttons/ToggleButton";
import { GenderType, ProfileFormData, ProfileFromScreenProps } from "./types";
import { Paragraph } from "../../../components/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { useForm } from "../../../hooks/useForm";
import { httpAuthService } from "../../../services/auth";
import {
  maskPhone,
  maskDatePTBR,
  onlyNumbers,
  maskName,
} from "../../../utils/masks";

const profileFormInitialState: ProfileFormData = {
  name: "",
  phone: "",
  birthDate: "",
  gender: "",
};

const ProfileFormScreen = (props: ProfileFromScreenProps) => {
  const { data, handleChange, setError } = useForm(profileFormInitialState);
  const { values } = data;

  function formatDateToISO(date: string) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }


  async function submitProfile() {
    const formatteBirthDate = formatDateToISO(values.birthDate);
    
    const dataSubmit = { ...values, birthDate: formatteBirthDate };

    const result = await httpAuthService.updateProfile(dataSubmit);
    
    if (!result.success) {
      const field = result.error.field || undefined;
      
      setError({ message: result.error.message, field: field as any });
    } else {
      props.navigation.dispatch(
        CommonActions.reset({ routes: [{ name: "Onboarding/NutritionForm" }] })
      );
    }
  }

  function selectGender(value: GenderType) {
    handleChange("gender", value);
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
            value={data.values.name}
            onChange={(value) => handleChange("name", maskName(value))}
            name="name"
            label="Nome completo"
            placeholder="Nome completo (Ex.: Maria Silva)"
            textContentType="name"
          />
          <Input
            value={maskPhone(data.values.phone)}
            onChange={(value) => handleChange("phone", onlyNumbers(value))}
            name="phone"
            label="Telefone"
            placeholder="(DDD) + número de telefone"
            textContentType="telephoneNumber"
          />
          <DateInput
            value={data.values.birthDate}
            textContentType="birthdate"
            onChange={(value) => handleChange("birthDate", maskDatePTBR(value))}
            label="Data de nascimento"
            placeholder="dd/mm/aaaa"
            name="birthDate"
          />
          <View>
            <Text style={styles.genderLabel}>Gênero social</Text>
            <View style={styles.genderButtons}>
              <ToggleButton
                selected={data.values.gender === "feminino"}
                onPress={() => selectGender("feminino")}
              >
                <Text style={styles.gender}>Feminino</Text>
              </ToggleButton>
              <ToggleButton
                selected={data.values.gender === "masculino"}
                onPress={() => selectGender("masculino")}
              >
                <Text style={styles.gender}>Masculino</Text>
              </ToggleButton>
            </View>
          </View>
        </View>
        <SubmitButton
          onPress={submitProfile}
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
