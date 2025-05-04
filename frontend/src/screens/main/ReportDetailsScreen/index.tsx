import { Text, View } from "react-native";
import { styles } from "./styles";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import {
  formatDateToLabel,
  generateLocalDateRange,
  getLocalDateOnly,
  toCapitalized
} from "../../../utils/helpers";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import Select, { SelectEvent } from "../../../components/Select";
import { TimeRangeNavigator } from "../../../components/TimeRangeNavigator";
import { ReactNode, useCallback, useContext, useEffect, useMemo } from "react";
import { colors } from "../../../styles/colors";
import { SubmitButton } from "../../../components/SubmitButton";
import { CommonActions } from "@react-navigation/native";
import { RouteConstants } from "../../../routes/types";
import { PizzaChart, PizzaChartProps } from "../../../components/PizzaChart";
import { useCalorieStatistics } from "../../../hooks/calorieStatistics/useCalorieStatistics";
import {
  calculateAvgCarlorieConsumption,
  getCalorieStatisticsSummary
} from "../../../@core/entities/calorieStatistic/helpers";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { HttpError } from "../../../@core/errors/httpError";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { PizzaChartSkeleton } from "./components/PizzaChartSkeleton";
import { SummaryTextSkeleton } from "./components/SummaryTextSkeleton";
import { useDebounce } from "../../../hooks/common/useDebounce";
import { DateIntervalType } from "../../../@types";
import { queryClient } from "../../../libs/react-query/queryClient";
import { QueryKeys } from "../../../constants/reactQueryKeys";
import { ChartLabel } from "../../../components/ChartLabel";
import { EmptyDataPlaceholder } from "../../../components/EmptyDataPlaceholder";
import { PizzaChartIcon } from "../../../components/Icons/PizzaChartIcon";
import { PlanStrategy } from "../../../@core/entities/@shared/panStrategy/type";
import { DateFilterContext } from "../../../contexts/dateFilterContext/DateFilterContext";

const ReportDetailsScreen = () => {
  const navigation = useAppNavigation();
  const localDate = useMemo(() => getLocalDateOnly(), []);
  const { Snackbar, showSnackbar } = useSnackbar();
  const { isDebouncing, startDebounce } = useDebounce(300);

  const { dateData, intervalType, updateDateDate, updateIntervalType } =
    useContext(DateFilterContext);

  const dateRange = generateLocalDateRange(intervalType, dateData);
  const { statistics, isLoading, isFetching, error } = useCalorieStatistics({
    from: dateRange.from,
    to: dateRange.to > localDate ? localDate : dateRange.to,
    disabled: isDebouncing
  });

  const { daysOffTarget, daysWithinTarget } = getCalorieStatisticsSummary(statistics);

  const avgConsumption = calculateAvgCarlorieConsumption(statistics);
  const daysWithData = daysOffTarget + daysWithinTarget;

  function goBack() {
    navigation.goBack();
  }

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: RouteConstants.Home }] })
    );
  }

  function handleIntervalTypeSelect(e: SelectEvent) {
    updateIntervalType(e.value as DateIntervalType);
  }

  const handleTimeRangeChange = useCallback(
    (date: Date) => {
      const { from, to } = generateLocalDateRange(intervalType, date);
      const queryKey = QueryKeys.DATABASE.CALORIE_STATISTICS(
        from.toISOString().split("T")[0],
        (to > localDate ? localDate : to).toISOString().split("T")[0]
      );
      if (queryClient.getQueryData(queryKey) === undefined) {
        startDebounce();
      }
      updateDateDate(date);
    },
    [updateDateDate, startDebounce, intervalType, localDate]
  );

  const handleQueryError = useCallback(
    (error: Error) => {
      const mealsError = `Desculpe, não foi possível obter as informações para o período selecionado. contate o suporte para mais informações.`;
      const errorMessage = error instanceof HttpError ? mealsError : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage
      });
    },
    [showSnackbar]
  );

  function createSuccessFeedbackMessage(targetConsumption: number, planName: string) {
    const textStyle = [styles.feedbackMessage, styles.feedbackMessageBold];
    return (
      <>
        ✅ Seu consumo médio está dentro da recomendação do{" "}
        <Text style={textStyle}>Plano {planName}</Text> que é de{" "}
        <Text style={textStyle}>{targetConsumption} kcal/dia</Text>.
      </>
    );
  }

  function createWarningFeedbackMessage(
    targetConsumption: number,
    planName: string,
    strategy: PlanStrategy
  ) {
    const textStyle = [styles.feedbackMessage, styles.feedbackMessageBold];

    return (
      <>
        🚨 Seu consumo médio está {strategy === "deficit" ? "acima" : "abaixo"} da recomendação
        do <Text style={textStyle}>Plano {planName}</Text> que é de{" "}
        <Text style={textStyle}>{targetConsumption} kcal/dia</Text>.
      </>
    );
  }

  function generateConsumptionFeedback() {
    const latestStatistic = statistics[statistics.length - 1];
    let feedbakMessage: ReactNode =
      "⚠️ Você ainda não registrou nenhuma refeição no período. Adicione refeições para acompanhar sua alimentação corretamente.";

    if (!latestStatistic || avgConsumption <= 0) return feedbakMessage;

    const currentPlanLabel = toCapitalized(latestStatistic.planType);
    const successMessage = createSuccessFeedbackMessage(
      latestStatistic.target,
      currentPlanLabel
    );

    if (latestStatistic.strategy === "deficit") {
      if (avgConsumption <= latestStatistic.target) {
        feedbakMessage = successMessage;
      } else {
        feedbakMessage = createWarningFeedbackMessage(
          latestStatistic.target,
          currentPlanLabel,
          "deficit"
        );
      }
    }

    if (latestStatistic.strategy === "superavit") {
      if (avgConsumption >= latestStatistic.target) {
        feedbakMessage = successMessage;
      } else {
        feedbakMessage = feedbakMessage = createWarningFeedbackMessage(
          latestStatistic.target,
          currentPlanLabel,
          "superavit"
        );
      }
    }

    return feedbakMessage;
  }

  function renderSummary() {
    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Média de consumo:</Text>
        <Text style={styles.avgCalorieConsumption}>{Math.round(avgConsumption)} KCAL</Text>
        <Text style={styles.feedbackMessage}>{generateConsumptionFeedback()}</Text>
      </View>
    );
  }

  function renderPizzaChart() {
    return daysWithData > 0 ? (
      <PizzaChart style={styles.chart} data={chartData} />
    ) : (
      <EmptyDataPlaceholder
        title="Sem dados disponíveis"
        text="Parece que você não possui dados registrados para esse período."
        icon={
          <PizzaChartIcon
            strokeWidth={1.5}
            width="100%"
            height="100%"
            stroke={colors.gray.mediumDark}
          />
        }
      />
    );
  }

  const chartData: PizzaChartProps["data"] = [
    {
      value: daysOffTarget,
      color: colors.primary,
      label: {
        title: `${Math.round((daysOffTarget * 100) / daysWithData)}%`,
        subtitle: daysOffTarget > 1 ? `${daysOffTarget} dias` : `${daysOffTarget} dia`
      }
    },
    {
      value: daysWithinTarget,
      color: colors.secondary,
      label: {
        title: `${Math.round((daysWithinTarget * 100) / daysWithData)}%`,
        subtitle: daysWithinTarget > 1 ? `${daysWithinTarget} dias` : `${daysWithinTarget} dia`
      }
    }
  ];

  useEffect(() => {
    if (error && !isLoading) handleQueryError(error);
  }, [error, isLoading, handleQueryError]);

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader
        variant="titled"
        subtitle={formatDateToLabel(localDate, "short")}
        title="Relatório"
        onBack={goBack}
      />

      <View style={styles.textWrapper}>
        <ScreenTitle title="Consumo de calorias por período " style={styles.title} />
        <Paragraph style={styles.text}>
          Visualize seu consumo calórico ao longo dos dias e mantenha uma alimentação
          equilibrada.
        </Paragraph>
      </View>
      <View style={styles.inputWrapper}>
        <Select
          defaultValue={intervalType}
          data={[
            { label: "Mensal", value: "monthly" },
            { label: "Semanal", value: "weekly" }
          ]}
          onChange={handleIntervalTypeSelect}
        />
        <TimeRangeNavigator
          onChange={handleTimeRangeChange}
          intervalType={intervalType}
          initialDate={new Date(dateData.year, dateData.month, dateData.day)}
        />
      </View>
      <SummaryTextSkeleton
        show={isLoading || isDebouncing || isFetching}
        style={styles.summaryContainerSkeleton}>
        {error ? null : renderSummary()}
      </SummaryTextSkeleton>
      <View style={styles.separatorLine} />
      <PizzaChartSkeleton
        show={isLoading || isDebouncing || isFetching}
        style={styles.chartContainerSkeleton}>
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Cumprimento do plano de execução:</Text>
          <View style={styles.labelsWrapper}>
            <ChartLabel color={colors.secondary} label="Meta alcançada" />
            <ChartLabel color={colors.primary} label="Meta não alcançada" />
          </View>
          {error ? null : renderPizzaChart()}
        </View>
      </PizzaChartSkeleton>
      <SubmitButton
        title="Voltar para home"
        type="primary"
        style={styles.backHomeButton}
        onPress={resetNavigationToHome}
      />
    </ScreenWrapper>
  );
};

export default ReportDetailsScreen;
