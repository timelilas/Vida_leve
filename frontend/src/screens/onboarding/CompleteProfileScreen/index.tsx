import { Text, View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { Input } from "../../../components/Input";
import { SubmitButton } from "../../../components/SubmitButton";
import { ProfileFormData } from "./types";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { GenderType } from "../../../@core/entities/@shared/gender/type";
import { ErrorMessage } from "../../../components/ErrorMessage";
import {
  maskPhone,
  maskDatePTBR,
  onlyNumbers,
  maskName,
} from "../../../utils/masks";
import { useUserStore } from "../../../store/user";
import { dateToPTBR, delay, formatDateToISO } from "../../../utils/helpers";
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
import { Controller, useForm } from "react-hook-form";
import { zodProfileSchema } from "./schema";
import { customZodResolver } from "../../../libs/zod/@shared/resolver";

const CompleteProfileScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const { setUser, data: user } = useUserStore((state) => state);

  const formInitialState: ProfileFormData = {
    name: user.name ?? "",
    phone: user.phone ?? "",
    gender: user.gender ?? null,
    birthDate: user.birthDate ? dateToPTBR(new Date(user.birthDate)) : "",
  };

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
  } = useForm({
    criteriaMode: "firstError",
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: customZodResolver(zodProfileSchema),
    values: formInitialState,
  });

  const firstFieldError = Object.entries(errors).at(0);
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

  function revalidateFields(fields?: (keyof ProfileFormData)[]) {
    trigger(fields);
  }

  function clearErrorsWithDelay(fields?: (keyof ProfileFormData)[]) {
    delay(100).then(() => clearErrors(fields));
  }

  function navigateToProgressForm() {
    navigation.navigate(RouteConstants.CreateProgress);
  }

  function selectGender(value: GenderType) {
    const currentGender = getValues("gender");
    setValue("gender", currentGender === value ? null : value);
    trigger();
  }

  async function onSubmit(params: ProfileFormData) {
    const birthDateISO = formatDateToISO(params.birthDate);
    try {
      const { data } = await httpUserService.updateProfile({
        name: params.name,
        phone: params.phone,
        gender: params.gender as GenderType,
        birthDate: new Date(birthDateISO),
      });
      setUser(data);
      navigateToProgressForm();
    } catch (error: any) {
      handleApiError(error);
    }
  }

  async function handleApiError(error: Error) {
    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    if (error instanceof HttpError && error.field) {
      return setError(error.field as any, { message: error.message });
    }
    showSnackbar({
      duration: 5000,
      message: error.message,
      variant: "error",
    });
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader variant="branded" onBack={goBack} />
      <ScreenTitle style={styles.title} title="Queremos ter conhecer melhor" />
      <Paragraph style={styles.text}>
        Complete seu cadastro para tornarmos sua experiência mais personalizada.
      </Paragraph>
      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, name }, fieldState }) => {
            const isInvalid = fieldState.invalid;
            const isNameError = firstFieldError?.at(0) === name;
            return (
              <Input
                value={value}
                error={isNameError}
                label="Como você gostaria de ser chamado(a)?"
                placeholder="Ex.: Maria Silva"
                textContentType="name"
                disabled={isSubmitting}
                errorMessage={
                  isNameError ? firstFieldError[1].message : undefined
                }
                onBlur={() => revalidateFields(["name"])}
                onChangeText={(text) => onChange(maskName(text))}
                onFocus={() =>
                  isInvalid &&
                  clearErrorsWithDelay(["phone", "birthDate", "gender"])
                }
              />
            );
          }}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value, name }, fieldState }) => {
            const isPhoneError = firstFieldError?.at(0) === name;
            const isInvalid = fieldState.invalid;
            return (
              <Input
                value={maskPhone(value)}
                error={isPhoneError}
                label="Telefone"
                placeholder="(DDD) + número de telefone"
                textContentType="telephoneNumber"
                disabled={isSubmitting}
                errorMessage={
                  isPhoneError ? firstFieldError[1].message : undefined
                }
                onBlur={() => revalidateFields(["name", "phone"])}
                onChangeText={(text) => onChange(onlyNumbers(text, 11))}
                onFocus={() =>
                  isInvalid && clearErrorsWithDelay(["birthDate", "gender"])
                }
              />
            );
          }}
        />
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { value, name, onChange }, fieldState }) => {
            const isDateError = firstFieldError?.at(0) === name;
            const isInvalid = fieldState.invalid;
            return (
              <Input.Date
                onBlur={() => revalidateFields(["name", "phone", "birthDate"])}
                onChangeText={(text) => onChange(maskDatePTBR(text))}
                onFocus={() => isInvalid && clearErrorsWithDelay(["gender"])}
                value={value}
                error={isDateError}
                errorMessage={
                  isDateError ? firstFieldError[1].message : undefined
                }
                disabled={isSubmitting}
                textContentType="birthdate"
                label="Data de nascimento"
                placeholder="dd/mm/aaaa"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: { value, name } }) => {
            const isGenderError = firstFieldError?.at(0) === name;
            return (
              <View>
                <Text style={styles.genderLabel}>Gênero social</Text>
                <View style={styles.genderButtons}>
                  <GenderButton
                    disabled={isSubmitting}
                    selected={value === "feminino"}
                    onPress={() => selectGender("feminino")}
                  >
                    <Text style={styles.gender}>Feminino</Text>
                  </GenderButton>
                  <GenderButton
                    disabled={isSubmitting}
                    selected={value === "masculino"}
                    onPress={() => selectGender("masculino")}
                  >
                    <Text style={styles.gender}>Masculino</Text>
                  </GenderButton>
                </View>
                {isGenderError && firstFieldError[1].message && (
                  <ErrorMessage
                    style={styles.genderError}
                    message={firstFieldError[1].message}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
      <SubmitButton
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
        title="Continuar cadastro"
        type="primary"
      />
    </ScreenWrapper>
  );
};

export default CompleteProfileScreen;
