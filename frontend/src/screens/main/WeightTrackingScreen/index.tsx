import { styles } from "./styles";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import {
  convertDateToLocalDateData,
  delay,
  formatDateToLabel,
  getMonthNameFromIndex,
  toCapitalized
} from "../../../utils/helpers";
import { DayPicker } from "../../../components/DayPicker";
import { Text, View } from "react-native";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { LinkButton } from "../../../components/LinkButton";
import { RouteConstants } from "../../../routes/types";
import { AddWeightModal } from "./components/AddWeightModal";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { SubmitButton } from "../../../components/SubmitButton";
import { CommonActions } from "@react-navigation/native";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useWeightHistory } from "../../../hooks/weight/useWeightHistory";
import { WeightHistoryQueryState } from "../../../hooks/weight/types";
import { LineChartSkeleton } from "../../../components/LineChartSkeleton/inde";
import { ChartLabel } from "../../../components/ChartLabel";
import { colors } from "../../../styles/colors";
import { LineChart } from "../../../components/LineChart";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";

const WeightTrackingScreen = () => {
  const navigation = useAppNavigation();

  const { Snackbar, showSnackbar } = useSnackbar();
  const { data: weightHistory, error, isFetching } = useWeightHistory({ limit: 20 });
  const { progress } = useProgress({ refetchOnMount: false });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dateData = convertDateToLocalDateData(new Date());
  const localDate = new Date(dateData.year, dateData.month, dateData.day);
  const shortDateLabel = formatDateToLabel(localDate, "short");
  const mostRecentWeight = getMostRecentWeight(weightHistory.weights) || progress?.goalWeight;

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
    delay(300).then(() =>
      showSnackbar({
        duration: 4000,
        message: "Seu peso foi registrado com sucesso!",
        variant: "success"
      })
    );
  }

  function onWeightAdditionError(errorMessage: string) {
    showSnackbar({
      duration: 5000,
      message: errorMessage,
      variant: "error"
    });
  }

  function checkGoalWeightPointsVisiblity(value: number, index: number) {
    const data = weightHistory.weights;
    const middleIndexes = [Math.floor(data.length / 2), Math.floor((data.length - 1) / 2)];

    const isLastItem = index === data.length - 1;
    const isFirstItem = index === 0;
    const iMiddleItem =
      data.length % 2 === 0
        ? middleIndexes.includes(index)
        : index === Math.floor(data.length / 2);

    return isFirstItem || isLastItem || iMiddleItem;
  }

  function renderWeightHistoryChart() {
    const chartDataAndLabels = weightHistory.weights
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reduce(
        (acc, item, i) => {
          const date = new Date(item.date);
          const day = `0${date.getUTCDate()}`.slice(-2);
          const monthName = toCapitalized(
            getMonthNameFromIndex(date.getUTCMonth()).slice(0, 3)
          );
          acc.labels.push(`${day}/${monthName}`);
          acc.weights.push(item.weight);
          acc.goalWeights.push(progress?.goalWeight!);
          return acc;
        },
        { weights: [], goalWeights: [], labels: [] } as {
          labels: string[];
          weights: number[];
          goalWeights: number[];
        }
      );

    return (
      <LineChart
        yAxisName="kg"
        xAxisName="Dia do mês"
        lineStrokeWidth={3}
        style={{ paddingLeft: 32 }}
        data={[
          {
            color: colors.primary,
            values: chartDataAndLabels.weights,
            withDots: true,
            tooltip: { color: colors.primary, enabled: true }
          },
          {
            color: colors.secondary,
            values: chartDataAndLabels.goalWeights,
            withDots: checkGoalWeightPointsVisiblity,
            tooltip: { color: colors.secondary, enabled: checkGoalWeightPointsVisiblity }
          }
        ]}
        labels={chartDataAndLabels.labels}
      />
    );
  }

  const handleQueryError = useCallback(
    (error: Error) => {
      const weightHistoryError =
        "Desculpe, não foi possível obter o seu histórico de pesos. Tente novamente mais tarde";
      const errorMessage =
        error instanceof HttpError ? weightHistoryError : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage
      });
    },
    [showSnackbar]
  );

  useEffect(() => {
    if (error && !isFetching) handleQueryError(error);
  }, [error, isFetching, handleQueryError]);

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
        <Text style={styles.subtitle}>Acompanhamento do peso</Text>
        <LineChartSkeleton show={isFetching} style={styles.chartSkeleton}>
          <View style={styles.chartBox}>
            <View style={styles.labelsWrapper}>
              <ChartLabel color={colors.secondary} label="Peso desejado" />
              <ChartLabel color={colors.primary} label="Peso registrado" />
            </View>
            {error ? null : renderWeightHistoryChart()}
          </View>
        </LineChartSkeleton>
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
