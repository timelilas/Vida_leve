import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { Input } from "../../../components/inputs/Input";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { DateInput } from "../../../components/inputs/DateInput";
import { ToggleButton } from "../../../components/buttons/ToggleButton";
import { ProfileFormData, ProfileFromScreenProps } from "./types";
import { Paragraph } from "../../../components/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { useForm } from "../../../hooks/useForm";
import { GenderType } from "../../../@core/common/gender";
import { httpAuthService } from "../../../services/auth";
import { validatePhone } from "../../../utils/validations/phone";
import { validateBirthDate } from "../../../utils/validations/date";
import { validateName } from "../../../utils/validations/name";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { validateGender } from "../../../utils/validations/gender";
import {
  maskPhone,
  maskDatePTBR,
  onlyNumbers,
  maskName,
} from "../../../utils/masks";
import { useRef } from "react";

const profileFormInitialState: ProfileFormData = {
  name: "",
  phone: "",
  birthDate: "",
  gender: null,
};

const ProfileFormScreen = (props: ProfileFromScreenProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const { data, handleChange, setError, validateField, setIsLoading } = useForm(
    profileFormInitialState
  );
  const { values, error, isLoading } = data;

  function formatDateToISO(date: string) {
    const [day, month, year] = date.split("/");
    const sanitizedDay = day === "29" && month === "02" ? "28" : day;
    return `${year}-${month}-${sanitizedDay}`;
  }

  function validateAllFields() {
    const validationMap = {
      name: validateName(values.name),
      phone: validatePhone(values.phone),
      birthDate: validateBirthDate(values.birthDate),
      gender: validateGender(values.gender || ""),
    };

    for (const [field, validation] of Object.entries(validationMap)) {
      if (!validation.success) {
        setError({ field: field as any, message: validation.error });
        return false;
      }
    }
    return true;
  }

  async function submitProfile() {
    if (isLoading) return;
    if (!validateAllFields()) return;

    setError({});
    setIsLoading(true);

    const formattedBirthDate = formatDateToISO(values.birthDate);
    const dataSubmit = { ...values, birthDate: formattedBirthDate };
    const result = await httpAuthService.updateProfile(dataSubmit as any);

    setIsLoading(false);

    if (!result.success) {
      const field = result.error.field || undefined;
      if (field === "connection") {
        return props.navigation.navigate("ConnectionError");
      }
      if (!field) {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
      setError({ message: result.error.message, field: field as any });
    } else {
      props.navigation.navigate("Onboarding/HealthForm");
    }
  }

  function selectGender(value: GenderType) {
    const newGender = value !== values.gender ? value : null;
    handleChange("gender", newGender);
    validateField("gender", newGender || "", validateGender);
  }

  return (
    <ScreenWrapper ref={scrollRef} scrollable>
      <ScreenHeader
        style={styles.header}
        onGoBack={() => props.navigation.goBack()}
      />
      {!error.field && error.message && (
        <ErrorMessage style={styles.error} message={error.message} />
      )}
      <ScreenTitle title="Queremos ter conhecer melhor" />
      <Paragraph
        style={styles.text}
        text="Complete seu cadastro para tornarmos sua experiência mais personalizada"
      />
      <View style={styles.form}>
        <Input
          onBlur={() => validateField("name", values.name, validateName)}
          onChange={(value) => handleChange("name", maskName(value))}
          value={data.values.name}
          error={error.field === "name"}
          errorMessage={error.field === "name" ? error.message : undefined}
          disabled={isLoading}
          name="name"
          label="Como você gostaria de ser chamado(a)?"
          placeholder="Ex.: Maria Silva"
          textContentType="name"
          autoFocus
        />
        <Input
          onBlur={() => validateField("phone", values.phone, validatePhone)}
          onChange={(value) => handleChange("phone", onlyNumbers(value, 11))}
          value={maskPhone(data.values.phone)}
          error={error.field === "phone"}
          errorMessage={error.field === "phone" ? error.message : undefined}
          disabled={isLoading}
          name="phone"
          label="Telefone"
          placeholder="(DDD) + número de telefone"
          textContentType="telephoneNumber"
        />
        <DateInput
          onChange={(value) => handleChange("birthDate", maskDatePTBR(value))}
          onBlur={() =>
            validateField("birthDate", values.birthDate, validateBirthDate)
          }
          value={data.values.birthDate}
          error={error.field === "birthDate"}
          errorMessage={error.field === "birthDate" ? error.message : undefined}
          disabled={isLoading}
          textContentType="birthdate"
          label="Data de nascimento"
          placeholder="dd/mm/aaaa"
          name="birthDate"
        />
        <View>
          <Text style={styles.genderLabel}>Gênero social</Text>
          <View style={styles.genderButtons}>
            <ToggleButton
              disabled={isLoading}
              selected={data.values.gender === "feminino"}
              onPress={() => selectGender("feminino")}
            >
              <Text style={styles.gender}>Feminino</Text>
            </ToggleButton>
            <ToggleButton
              disabled={isLoading}
              selected={data.values.gender === "masculino"}
              onPress={() => selectGender("masculino")}
            >
              <Text style={styles.gender}>Masculino</Text>
            </ToggleButton>
          </View>
          {error.field === "gender" && error.message && (
            <ErrorMessage style={styles.genderError} message={error.message} />
          )}
        </View>
      </View>
      <SubmitButton
        disabled={isLoading}
        onPress={submitProfile}
        style={styles.submitButton}
        title="Continuar"
        type="primary"
      />
    </ScreenWrapper>
  );
};

export default ProfileFormScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  error: {
    marginBottom: 8,
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
  genderError: {
    marginTop: 8,
  },
});
