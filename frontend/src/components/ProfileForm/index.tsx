import { styles } from "./styles";
import { Text, View } from "react-native";
import { Input } from "../Input";
import { Controller, useForm } from "react-hook-form";
import { ProfileFormData, ProfileFormSubmitData } from "./types";
import { customZodResolver } from "../../libs/zod/@shared/resolver";
import { zodProfileSchema } from "./schemas";
import { HttpError } from "../../@core/errors/httpError";
import { GenderButton } from "./components/GenderButton";
import { ErrorMessage } from "../ErrorMessage";
import { SubmitButton } from "../SubmitButton";
import { delay, formatDateToISO } from "../../utils/helpers";
import { GenderType } from "../../@core/entities/@shared/gender/type";
import { maskDatePTBR, maskName, maskPhone, onlyNumbers } from "../../utils/masks";

interface ProfileFormProps {
  initialData: ProfileFormData;
  submitButtonText: string;
  onSubmit: (formData: ProfileFormSubmitData) => Promise<void>;
  onError?: (error: Error) => void;
}

export function ProfileForm(props: ProfileFormProps) {
  const { initialData, submitButtonText } = props;

  const {
    control,
    trigger,
    setError,
    getValues,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, errors }
  } = useForm({
    criteriaMode: "firstError",
    values: initialData,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: customZodResolver(zodProfileSchema)
  });

  const firstFieldError = Object.entries(errors)[0];

  function handleApiError(error: Error) {
    if (error instanceof HttpError && error.field) {
      setError(error.field as any, { message: error.message });
    }
    if (props.onError) {
      props.onError(error);
    }
  }

  async function onSubmit(params: ProfileFormData) {
    if (!params.gender) return;

    const birthDateISO = formatDateToISO(params.birthDate);
    const sanitizedData = {
      name: params.name,
      phone: params.phone,
      birthDate: new Date(birthDateISO),
      gender: params.gender
    };
    try {
      await props.onSubmit(sanitizedData);
    } catch (error: any) {
      handleApiError(error);
    }
  }

  function revalidateFields(fields?: (keyof ProfileFormData)[]) {
    trigger(fields);
  }

  function clearErrorsWithDelay(fields?: (keyof ProfileFormData)[]) {
    delay(100).then(() => clearErrors(fields));
  }

  function selectGender(value: GenderType) {
    const currentGender = getValues("gender");
    setValue("gender", currentGender === value ? null : value);
    trigger();
  }

  return (
    <View style={styles.container}>
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
                errorMessage={isNameError ? firstFieldError[1].message : undefined}
                onBlur={() => revalidateFields(["name"])}
                onChangeText={(text) => onChange(maskName(text))}
                onFocus={() =>
                  isInvalid && clearErrorsWithDelay(["phone", "birthDate", "gender"])
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
                errorMessage={isPhoneError ? firstFieldError[1].message : undefined}
                onBlur={() => revalidateFields(["name", "phone"])}
                onChangeText={(text) => onChange(onlyNumbers(text, 11))}
                onFocus={() => isInvalid && clearErrorsWithDelay(["birthDate", "gender"])}
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
                errorMessage={isDateError ? firstFieldError[1].message : undefined}
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
                    onPress={() => selectGender("feminino")}>
                    <Text style={styles.gender}>Feminino</Text>
                  </GenderButton>
                  <GenderButton
                    disabled={isSubmitting}
                    selected={value === "masculino"}
                    onPress={() => selectGender("masculino")}>
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
        title={submitButtonText}
        type="primary"
      />
    </View>
  );
}
