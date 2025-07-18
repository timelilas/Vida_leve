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
import { RefreshControl, Text, View } from "react-native";
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
import { Podium } from "./components/Podium";
import { PodiumSkeleton } from "./components/PodiumSkeleton";

const WeightTrackingScreen = () => {
  const navigation = useAppNavigation();

  const { Snackbar, showSnackbar } = useSnackbar();
  const {
    data: weightHistory,
    error,
    isFetching,
    fetchWeights
  } = useWeightHistory({ limit: 20 });
  const { progress } = useProgress({ refetchOnMount: false });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dateData = convertDateToLocalDateData(new Date());
  const localDate = new Date(dateData.year, dateData.month, dateData.day);
  const shortDateLabel = formatDateToLabel(localDate, "short");

  const chartDataAndLabels = generateChartDataAndLabels();
  const mostRecentWeight = getMostRecentWeight(weightHistory.weights);

  const [isRefreshing, setIsRefreshing] = useState(false);

  async function refreshWeightHistory() {
    setIsRefreshing(true);
    await fetchWeights();
    setIsRefreshing(false);
  }

  function generateChartDataAndLabels() {
    const chartDataAndLabels: { labels: string[]; weights: number[]; goalWeights: number[] } =
      {
        labels: [],
        weights: [],
        goalWeights: []
      };

    const sortedWeightHistory = weightHistory.weights.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    if (progress) {
      const { day, month } = convertDateToLocalDateData(new Date(progress.lastWeightUpdateAt));
      const monthName = toCapitalized(getMonthNameFromIndex(month).slice(0, 3));
      chartDataAndLabels.weights.push(progress.weight);
      chartDataAndLabels.goalWeights.push(progress.goalWeight);
      chartDataAndLabels.labels.push(`${`0${day}`.slice(-2)}/${monthName}`);
    }

    for (const weightRecord of sortedWeightHistory) {
      const recordDate = new Date(weightRecord.date);
      const recordDay = `0${recordDate.getUTCDate()}`.slice(-2);
      const RecordMonthName = toCapitalized(
        getMonthNameFromIndex(recordDate.getUTCMonth()).slice(0, 3)
      );

      chartDataAndLabels.labels.push(`${recordDay}/${RecordMonthName}`);
      chartDataAndLabels.weights.push(weightRecord.weight);
      if (progress) {
        chartDataAndLabels.goalWeights.push(progress.goalWeight);
      }
    }

    if (chartDataAndLabels.goalWeights.length === 1 && progress?.goalWeight) {
      chartDataAndLabels.goalWeights.push(progress.goalWeight);
      chartDataAndLabels.labels.push("");
    }

    return chartDataAndLabels;
  }

  function getMostRecentWeight(weightHsitory: WeightHistoryQueryState["weights"]) {
    if (!progress) return null;

    if (error) return null;

    return weightHsitory.reduce(
      (max, record) => {
        if (record && new Date(record.date) >= new Date(max.date)) {
          max.value = record.weight;
          max.date = record.date;
        }
        return max;
      },
      { date: progress.lastWeightUpdateAt, value: progress.weight }
    );
  }

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RouteConstants.Home }]
      })
    );
  }

  function goBack() {
    navigation.goBack();
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
    const data = chartDataAndLabels.goalWeights;

    const isLastItem = index === data.length - 1;
    const isFirstItem = index === 0;

    return isFirstItem || isLastItem;
  }

  function renderWeightHistoryChart() {
    return (
      <LineChart
        yAxisName="kg"
        xAxisName="Dia do mês"
        lineStrokeWidth={3}
        style={{ paddingLeft: 32 }}
        tooltipConfig={{ withLabel: true }}
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
        "Desculpe, não foi possível obter o seu histórico de pesos. Tente novamente mais tarde.";
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
    <ScreenWrapper
      snackbar={<Snackbar />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refreshWeightHistory} />
      }>
      <NavigationHeader
        onBack={goBack}
        variant="titled"
        title="Acompanhamento de peso"
        subtitle={shortDateLabel}
      />
      <ScreenTitle title={"Hoje"} style={[styles.title, styles.dayTitle]} />

      <View style={styles.dayPickerContainer}>
        <DayPicker
          disabled
          currentDate={dateData}
          onSelectDate={() => {}}
          startDate={localDate}
        />
      </View>

      <View style={styles.podiumSection}>
        <ScreenTitle title="Acompanhe o seu peso" style={styles.title} />
        {progress && mostRecentWeight ? (
          <PodiumSkeleton show={isFetching}>
            <>
              <View>
                <Paragraph style={styles.paragraph}>
                  Você iniciou com o peso de{" "}
                  <Paragraph style={styles.paragraphBold}>{progress.weight} kg</Paragraph>, mas
                  deseja alcançar{" "}
                  <Paragraph style={styles.paragraphBold}>{progress.goalWeight} kg</Paragraph>{" "}
                  e atualmente você está com o peso de{" "}
                  <Paragraph style={styles.paragraphBold}>
                    {mostRecentWeight.value} kg
                  </Paragraph>
                  .
                </Paragraph>
              </View>
              <View style={styles.podium}>
                <Podium
                  startWeight={progress.weight}
                  currentWeight={mostRecentWeight.value}
                  targetWeight={progress.goalWeight}
                />
              </View>
              <Paragraph style={styles.paragraph}>
                Para manter o acompanhamento em dia, é necessário a passagem semanalmente.
              </Paragraph>
            </>
          </PodiumSkeleton>
        ) : null}
      </View>

      <LinkButton title="Registrar peso" onPress={onAddWeight} style={styles.linkButton} />
      <View style={styles.separatorLine} />

      <View style={styles.chartSection}>
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
