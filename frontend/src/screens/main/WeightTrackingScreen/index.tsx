import { styles } from "./styles";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { convertDateToLocalDateData, formatDateToLabel } from "../../../utils/helpers";
import { DayPicker } from "../../../components/DayPicker";
import { View } from "react-native";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { LinkButton } from "../../../components/LinkButton";
import { RouteConstants } from "../../../routes/types";
import { AddWeightModal } from "./components/AddWeightModal";
import { useState } from "react";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { SubmitButton } from "../../../components/SubmitButton";
import { CommonActions } from "@react-navigation/native";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useWeightHistory } from "../../../hooks/weight/useWeightHistory";
import { WeightHistoryQueryState } from "../../../hooks/weight/types";

const WeightTrackingScreen = () => {
  const navigation = useAppNavigation();

  const { Snackbar, showSnackbar } = useSnackbar();
  const { data } = useWeightHistory({ enabled: true, limit: 10 });
  const { progress } = useProgress({ refetchOnMount: false });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dateData = convertDateToLocalDateData(new Date());
  const localDate = new Date(dateData.year, dateData.month, dateData.day);
  const shortDateLabel = formatDateToLabel(localDate, "short");
  const mostRecentWeight = getMostRecentWeight(data.weights) || progress?.goalWeight;

  function goBack() {
    navigation.goBack();
  }

  function getMostRecentWeight(weightHsitory: WeightHistoryQueryState["weights"]) {
    return weightHsitory.reduce(
      (max, record) => {
        if (max.date === null || new Date(record.date) > max.date) {
          max = { date: new Date(record.date), weight: record.weight };
        }
        return max;
      },
      { date: null, weight: null } as { date: Date | null; weight: number | null }
    ).weight;
  }

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RouteConstants.Home }]
      })
    );
  }

  function navigateToWeightHistory() {
    navigation.navigate(RouteConstants.WeightHistory);
  }

  function onAddWeight() {
    setIsModalVisible(true);
  }

  function onCloseWeightAdditionModal() {
    setIsModalVisible(false);
  }

  function onWeightAdditionSuccess() {
    setIsModalVisible(false);
    showSnackbar({
      duration: 4000,
      message: "Seu peso foi registrado com sucesso!",
      variant: "success"
    });
  }

  function onWeightAdditionError(errorMessage: string) {
    showSnackbar({
      duration: 5000,
      message: errorMessage,
      variant: "error"
    });
  }

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader
        onBack={goBack}
        variant="titled"
        title="Acompanhamento de peso"
        subtitle={shortDateLabel}
      />
      <ScreenTitle title={"Hoje"} style={[styles.title, styles.dayTitle]} />
      <View style={styles.dayPickerContainer}>
        <DayPicker currentDate={dateData} onSelectDate={() => {}} startDate={localDate} />
      </View>
      <View style={styles.textWrapper}>
        <ScreenTitle title="Acompanhe o seu peso" style={styles.title} />
        <View>
          <Paragraph style={styles.paragraph}>
            Você iniciou com o peso de{" "}
            <Paragraph style={styles.paragraphBold}>{progress?.weight} kg</Paragraph>, mas
            deseja alcançar{" "}
            <Paragraph style={styles.paragraphBold}>{progress?.goalWeight} kg</Paragraph> e
            atualmente você está com o peso de{" "}
            <Paragraph style={styles.paragraphBold}>{mostRecentWeight} kg</Paragraph>.
          </Paragraph>
        </View>
      </View>
      <View style={styles.podiumContainer}>
        <View style={styles.podium} />
        <Paragraph style={styles.paragraph}>
          Para manter o acompanhamento em dia, é necessário a passagem semanalmente.
        </Paragraph>
      </View>
      <LinkButton title="Registrar peso" onPress={onAddWeight} style={styles.linkButton} />
      <View style={styles.separatorLine} />
      <View style={styles.chartContainer}>
        <LinkButton
          title="Histórico de registros"
          onPress={navigateToWeightHistory}
          style={styles.linkButton}
        />
      </View>
      <SubmitButton
        type="primary"
        title="Voltar para home"
        style={styles.submitButton}
        onPress={resetNavigationToHome}
      />
      <AddWeightModal
        currentDate={localDate}
        isVisible={isModalVisible}
        onCancel={onCloseWeightAdditionModal}
        onSuccess={onWeightAdditionSuccess}
        onError={onWeightAdditionError}
      />
    </ScreenWrapper>
  );
};

export default WeightTrackingScreen;
