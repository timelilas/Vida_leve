import { Text, View } from "react-native";
import { styles } from "./styles";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import {
  convertDateToLocalDateData,
  formatDateToLabel,
  generateLocalDateRange,
} from "../../../utils/helpers";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import Select, { SelectEvent } from "../../../components/Select";
import { TimeRangeNavigator } from "../../../components/TimeRangeNavigator";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../../../styles/colors";
import { SubmitButton } from "../../../components/SubmitButton";
import { CommonActions } from "@react-navigation/native";
import { RouteConstants } from "../../../routes/types";
import { PizzaChart, PizzaChartProps } from "../../../components/PizzaChart";
import { useCalorieStatistics } from "../../../hooks/calorieStatistics/useCalorieStatistics";
import {
  calculateAvgCarlorieConsumption,
  getCalorieStatisticsSummary,
} from "../../../@core/entities/calorieStatistic/helpers";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { HttpError } from "../../../@core/errors/httpError";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { PizzaChartSkeleton } from "./components/PizzaChartSkeleton";
import { SummaryTextSkeleton } from "./components/SummaryTextSkeleton";
import { useThrottle } from "../../../hooks/common/useThrottle ";
import { DateIntervalType, PlainDate } from "../../../@types";
import { queryClient } from "../../../libs/react-query/queryClient";
import { QueryKeys } from "../../../constants/reactQueryKeys";
import { ChartLabel } from "../../../components/ChartLabel";
import { EmptyDataPlaceholder } from "../../../components/EmptyDataPlaceholder";
import { PizzaChartIcon } from "../../../components/Icons/PizzaChartIcon";

const ReportDetailsScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const navigation = useAppNavigation();
  const dateData = convertDateToLocalDateData(new Date());
  const localDate = new Date(dateData.year, dateData.month, dateData.day);

  const { isThrottling, startThrottler } = useThrottle(300);
  const [intervalType, setIntervalType] = useState<DateIntervalType>("monthly");
  const [dateFilter, setDateFilter] = useState<PlainDate>({
    year: dateData.year,
    month: dateData.month,
    day: dateData.day,
    weekDay: dateData.weekDay,
  });

  const dateRange = generateLocalDateRange(intervalType, dateFilter);

  const { statistics, isLoading, isFetching, error } = useCalorieStatistics({
    from: dateRange.from,
    to: dateRange.to > localDate ? localDate : dateRange.to,
    disabled: isThrottling,
  });

  const { daysOffTarget, daysWithinTarget } =
    getCalorieStatisticsSummary(statistics);

  const avgConsumption = calculateAvgCarlorieConsumption(statistics);
  const daysWithData = daysOffTarget + daysWithinTarget;

  function goBack() {
    navigation.goBack();
  }

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RouteConstants.Home }],
      })
    );
  }

  function handleIntervalTypeSelect(e: SelectEvent) {
    setIntervalType(e.value as "monthly" | "weekly");
  }

  const handleTimeRangeChange = useCallback(
    (date: Date) => {
      const { from, to } = generateLocalDateRange(intervalType, date);
      const sanitizedTo = to > localDate ? localDate : to;

      const queryKey = QueryKeys.DATABASE.CALORIE_STATISTICS(
        from.toISOString().split("T")[0],
        sanitizedTo.toISOString().split("T")[0]
      );
      if (queryClient.getQueryData(queryKey) === undefined) {
        startThrottler();
      }
      setDateFilter({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        weekDay: date.getDay(),
      });
    },
    [setDateFilter, intervalType]
  );

  const handleQueryError = useCallback(
    (error: Error) => {
      const mealsError = `Desculpe, não foi possível obter as informações para o período selecionado. contate o suporte para mais informações.`;

      const errorMessage =
        error instanceof HttpError ? mealsError : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage,
      });
    },
    [showSnackbar]
  );

  function generateConsumptionFeedback() {
    const latestStatistic = statistics[statistics.length - 1];
    let feedbakMessage =
      "⚠️ Você ainda não registrou nenhuma refeição no período. Adicione refeições para acompanhar sua alimentação corretamente.";

    if (!latestStatistic || avgConsumption <= 0) return feedbakMessage;

    const currentPlanLabel = latestStatistic.planType;
    const successMessage = `✅ Seu consumo médio está dentro da recomendação do plano ${currentPlanLabel} de ${latestStatistic.target} kcal/dia.`;

    if (latestStatistic.strategy === "deficit") {
      if (avgConsumption <= latestStatistic.target) {
        feedbakMessage = successMessage;
      } else {
        feedbakMessage = `🚨 Seu consumo médio está acima da recomendação do plano ${currentPlanLabel} de ${latestStatistic.target} kcal/dia`;
      }
    }

    if (latestStatistic.strategy === "superavit") {
      if (avgConsumption >= latestStatistic.target) {
        feedbakMessage = successMessage;
      } else {
        feedbakMessage = `🚨 Seu consumo médio está abaixo da recomendação do plano ${currentPlanLabel} de ${latestStatistic.target} kcal/dia`;
      }
    }

    return feedbakMessage;
  }

  const chartData: PizzaChartProps["data"] = [
    {
      value: daysOffTarget,
      color: colors.primary,
      label: {
        title: `${Math.round((daysOffTarget * 100) / daysWithData)}%`,
        subtitle:
          daysOffTarget > 1 ? `${daysOffTarget} dias` : `${daysOffTarget} dia`,
      },
    },
    {
      value: daysWithinTarget,
      color: colors.secondary,
      label: {
        title: `${Math.round((daysWithinTarget * 100) / daysWithData)}%`,
        subtitle:
          daysWithinTarget > 1
            ? `${daysWithinTarget} dias`
            : `${daysWithinTarget} dia`,
      },
    },
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
        <ScreenTitle
          title="Consumo de calorias por período "
          style={styles.title}
        />
        <Paragraph style={styles.text}>
          Visualize seu consumo calórico ao longo dos dias e mantenha uma
          alimentação equilibrada.
        </Paragraph>
      </View>
      <View style={styles.inputWrapper}>
        <Select
          defaultValue={intervalType}
          data={[
            { label: "Mensal", value: "monthly" },
            { label: "Semanal", value: "weekly" },
          ]}
          onChange={handleIntervalTypeSelect}
        />
        <TimeRangeNavigator
          onChange={handleTimeRangeChange}
          intervalType={intervalType}
        />
      </View>
      <SummaryTextSkeleton
        show={isLoading || isThrottling || isFetching || !!error}
        style={styles.summaryContainerSkeleton}
      >
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Media de consumo:</Text>
          <Text style={styles.avgCalorieConsumption}>
            {Math.round(avgConsumption)} KCAL
          </Text>
          <Text style={styles.feedbackMessage}>
            {generateConsumptionFeedback()}
          </Text>
        </View>
      </SummaryTextSkeleton>
      <View style={styles.separatorLine} />
      <PizzaChartSkeleton
        show={isLoading || isThrottling || isFetching || !!error}
        style={styles.chartContainerSkeleton}
      >
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>
            Cumprimento do plano de execução:
          </Text>
          <View style={styles.labelsWrapper}>
            <ChartLabel color={colors.secondary} label="Meta alcançada" />
            <ChartLabel color={colors.primary} label="Meta não alcançada" />
          </View>
          {daysWithData > 0 ? (
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
          )}
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
