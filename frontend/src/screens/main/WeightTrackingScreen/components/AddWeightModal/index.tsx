import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Platform
} from "react-native";
import { styles } from "./styles";
import { Modal } from "../../../../../components/Modal";
import { Paragraph } from "../../../../../components/Paragraph/Paragraph";
import { WarningIcon } from "../../../../../components/Icons/WarningIcon";
import { customZodResolver } from "../../../../../libs/zod/@shared/resolver";
import { Controller, useForm } from "react-hook-form";
import { zodWeightFormSChema } from "./schema";
import { onlyNumbers } from "../../../../../utils/masks";
import { colors } from "../../../../../styles/colors";
import { AlertIcon } from "../../../../../components/Icons/AlertIcon";
import { useWeightHistory } from "../../../../../hooks/weight/useWeightHistory";
import { convertDateToLocalDateData, delay } from "../../../../../utils/helpers";
import { NETWORK_ERROR_MESSAGE } from "../../../../../constants/errorMessages";
import { HttpError } from "../../../../../@core/errors/httpError";
import { useProgress } from "../../../../../hooks/progress/useProgress";
import { WEB_SCREEN_WIDTH_BREAKPOINT } from "../../../../../constants/webConstants";

interface AddWeightModalProps {
  currentDate: Date;
  isVisible: boolean;
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
  onCancel: () => void;
}

export function AddWeightModal(props: AddWeightModalProps) {
  const { isVisible, currentDate, onSuccess, onError, onCancel } = props;
  const { data, addWeight } = useWeightHistory({ enabled: false });
  const { progress } = useProgress({ refetchOnMount: false });
  const dimensions = useWindowDimensions();

  const isWebDesktop =
    Platform.OS === "web" && dimensions.width >= WEB_SCREEN_WIDTH_BREAKPOINT;

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    setError
  } = useForm({
    criteriaMode: "firstError",
    values: { weight: "" },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: customZodResolver(zodWeightFormSChema)
  });

  function handleWeightAdditionError(error: Error) {
    let defaultMessage = NETWORK_ERROR_MESSAGE;
    if (error instanceof HttpError) {
      if (error.status === 409) {
        return setError("weight", {
          message:
            "Opa! Só é permitido um registro por semana. Volte na próxima semana para atualizar."
        });
      } else {
        defaultMessage =
          "Desculpe, ocorreu um erro durante o registro de peso. Por favor, tente novamente mais tarde.";
      }
    }
    onError(defaultMessage);
  }

  async function onSubmit(params: { weight: string }) {
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth();
    const currentDay = currentDate.getUTCDate();
    const currentWeekDay = currentDate.getUTCDay();

    const weekStartDate = new Date(currentYear, currentMonth, currentDay - currentWeekDay);
    const weekEndDate = new Date(currentYear, currentMonth, currentDay + 6 - currentWeekDay);

    for (const weight of data.weights) {
      const weightDate = new Date(weight.date);

      if (weightDate >= weekStartDate && weightDate <= weekEndDate) {
        return setError("weight", {
          message:
            "Opa! Só é permitido um registro por semana. Volte na próxima semana para atualizar."
        });
      }

      if (progress?.lastWeightUpdateAt) {
        const { year, month, day } = convertDateToLocalDateData(
          new Date(progress.lastWeightUpdateAt)
        );
        const lastWeightUpdateDate = new Date(year, month, day);
        if (lastWeightUpdateDate >= weekStartDate && lastWeightUpdateDate <= weekEndDate) {
          return setError("weight", {
            message:
              "Opa! Só é permitido um registro por semana. Volte na próxima semana para atualizar."
          });
        }
      }
    }

    try {
      await addWeight({ date: currentDate, weight: parseInt(params.weight) });
      reset({ weight: "" });
      onSuccess();
    } catch (error: any) {
      handleWeightAdditionError(error);
    }
  }

  function onClose() {
    onCancel();
    delay(600).then(() => reset({ weight: "" }));
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={[styles.modal, isWebDesktop && styles.modalWeb]}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Qual é o seu peso atual?</Text>
          <Paragraph style={styles.paragraph}>
            Para acompanhar sua evolução, atualize seu peso semanalmente. Isso nos ajuda a
            calcular seu progresso até o seu objetivo.
          </Paragraph>
        </View>
        <View style={styles.warningContainer}>
          <WarningIcon style={styles.warningIcon} />
          <Paragraph style={styles.paragraph}>
            Atualize seu peso toda semana para acompanhar seu progresso, lembrando que só é
            possível registrar uma vez por semana.
          </Paragraph>
        </View>
        <View style={styles.inputSection}>
          <View style={[styles.inputContainer, isSubmitting && styles.weightInputDisabled]}>
            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  placeholder="Ex.: 60 kg"
                  editable={!isSubmitting}
                  placeholderTextColor={colors.gray.medium}
                  value={value}
                  style={[styles.weightInput, errors.weight && styles.weightInputError]}
                  onChangeText={(text) => onChange(onlyNumbers(text, 3))}
                />
              )}
            />
            <Text style={styles.weightInputLabel}>kg</Text>
            {errors.weight ? <AlertIcon /> : null}
          </View>
          {errors.weight?.message ? (
            <Text style={styles.inputErrorMessage}>{errors.weight.message}</Text>
          ) : null}
        </View>
        <View style={[styles.actionsWrapper, isSubmitting && styles.actionButtonDisabled]}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={onClose}
            disabled={isSubmitting}>
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Cancelar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}>
            <View style={[styles.actionButton, styles.actionButtonFilled]}>
              <Text style={styles.actionButtonText}>Registrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
