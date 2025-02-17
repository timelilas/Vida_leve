import { Text, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { Input } from "../../../components/Input";
import { SubmitButton } from "../../../components/SubmitButton";
import { ProfileFormData } from "./types";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { useForm } from "../../../hooks/useForm";
import { GenderType } from "../../../@core/entities/@shared/gender/type";
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
import { useUserStore } from "../../../store/user";
import { dateToPTBR, formatDateToISO } from "../../../utils/helpers";
import { HttpError } from "../../../@core/errors/httpError";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../routes/types";
import { httpUserService } from "../../../services/user";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { SecureStorage } from "../../../services/secureStorage/SecureStorage";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";
import { CommonActions } from "@react-navigation/native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { GenderButton } from "./components/GenderButton";

const CompleteProfileScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const { setUser, data: user } = useUserStore((state) => state);
  const { data, handleChange, setError, validateField, onSubmit } =
    useForm<ProfileFormData>({
      initialState: {
        name: user.name ?? "",
        phone: user.phone ?? "",
        birthDate: user.birthDate ? dateToPTBR(new Date(user.birthDate)) : "",
        gender: user.gender ?? null,
      },
    });

  const { values, error, isSubmitting, isFormDirty } = data;
  const navigation = useAppNavigation({ preventGoBack: isSubmitting });

  function goBack() {
    SecureStorage.removeItem(STORAGE_ACCESS_TOKEN);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: RouteConstants.Welcome },
          { name: RouteConstants.Login },
        ],
      })
    );
  }

  function navigateToProgressForm() {
    navigation.navigate(RouteConstants.CreateProgress);
  }

  function selectGender(value: GenderType) {
    const newGender = value !== values.gender ? value : null;
    handleChange("gender", newGender);
    validateField("gender", newGender || "", validateGender);
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

  async function handleSubmit() {
    if (!validateAllFields()) return;
    if (!isFormDirty) return navigateToProgressForm();

    const birthDateISO = formatDateToISO(values.birthDate);
    const dataToSubmit = { ...values, birthDate: birthDateISO };
    const { data } = await httpUserService.updateProfile(dataToSubmit as any);

    setUser(data);
    navigateToProgressForm();
  }

  async function handleError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (error instanceof HttpError) {
      setError({ field: error.field as any, message: error.message });
    }
    if (!(error as any).field) {
      showSnackbar({
        duration: 4000,
        message: error.message,
        variant: "error",
      });
    }
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle style={styles.title} title="Queremos ter conhecer melhor" />
      <Paragraph style={styles.text}>
        Complete seu cadastro para tornarmos sua experiência mais personalizada.
      </Paragraph>
      <View style={styles.form}>
        <Input
          onBlur={() => validateField("name", values.name, validateName)}
          onChangeText={(value) => handleChange("name", maskName(value))}
          value={data.values.name}
          error={error.field === "name"}
          errorMessage={error.field === "name" ? error.message : undefined}
          disabled={isSubmitting}
          label="Como você gostaria de ser chamado(a)?"
          placeholder="Ex.: Maria Silva"
          textContentType="name"
          autoFocus
        />
        <Input
          onBlur={() => validateField("phone", values.phone, validatePhone)}
          onChangeText={(value) =>
            handleChange("phone", onlyNumbers(value, 11))
          }
          value={maskPhone(data.values.phone)}
          error={error.field === "phone"}
          errorMessage={error.field === "phone" ? error.message : undefined}
          disabled={isSubmitting}
          label="Telefone"
          placeholder="(DDD) + número de telefone"
          textContentType="telephoneNumber"
        />
        <Input.Date
          onChangeText={(value) =>
            handleChange("birthDate", maskDatePTBR(value))
          }
          onBlur={() =>
            validateField("birthDate", values.birthDate, validateBirthDate)
          }
          value={data.values.birthDate}
          error={error.field === "birthDate"}
          errorMessage={error.field === "birthDate" ? error.message : undefined}
          disabled={isSubmitting}
          textContentType="birthdate"
          label="Data de nascimento"
          placeholder="dd/mm/aaaa"
        />
        <View>
          <Text style={styles.genderLabel}>Gênero social</Text>
          <View style={styles.genderButtons}>
            <GenderButton
              disabled={isSubmitting}
              selected={data.values.gender === "feminino"}
              onPress={() => selectGender("feminino")}
            >
              <Text style={styles.gender}>Feminino</Text>
            </GenderButton>
            <GenderButton
              disabled={isSubmitting}
              selected={data.values.gender === "masculino"}
              onPress={() => selectGender("masculino")}
            >
              <Text style={styles.gender}>Masculino</Text>
            </GenderButton>
          </View>
          {error.field === "gender" && error.message && (
            <ErrorMessage style={styles.genderError} message={error.message} />
          )}
        </View>
      </View>
      <SubmitButton
        disabled={isSubmitting}
        onPress={onSubmit(handleSubmit, handleError)}
        style={styles.submitButton}
        title="Continuar cadastro"
        type="primary"
      />
    </ScreenWrapper>
  );
};

export default CompleteProfileScreen;
