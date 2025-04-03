import { View } from "moti";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import {
  convertDateToLocalDateData,
  formatDateToLabel,
  generateLocalDateRange,
} from "../../../utils/helpers";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { styles } from "./styles";
import Select, { SelectEvent } from "../../../components/Select";
import { useThrottle } from "../../../hooks/common/useThrottle ";
import { useCallback, useEffect, useState } from "react";
import { DateIntervalType, PlainDate } from "../../../@types";
import { QueryKeys } from "../../../constants/reactQueryKeys";
import { queryClient } from "../../../libs/react-query/queryClient";
import { TimeRangeNavigator } from "../../../components/TimeRangeNavigator";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../../../styles/colors";
import { ChartLabel } from "../../../components/ChartLabel";
import { LineChart } from "../../../components/LineChart";
import { RouteConstants } from "../../../routes/types";
import { useCalorieStatistics } from "../../../hooks/calorieStatistics/useCalorieStatistics";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { EmptyDataPlaceholder } from "../../../components/EmptyDataPlaceholder";
import { LineChartIcon } from "../../../components/Icons/LineChartIcon";
import { LineChartSkeleton } from "./components/LineChartSkeleton/inde";

const ReportScreen = () => {
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

  const chartDataAndLabels = statistics.reduce(
    (acc, { consumption, target, date }, i) => {
      if (i === 0) acc = { dailyConsumption: [], dailyTarget: [], labels: [] };
      acc.labels.push(`${new Date(date).getUTCDate()}`);
      acc.dailyConsumption.push(consumption);
      acc.dailyTarget.push(target);
      return acc;
    },
    {} as {
      labels: string[];
      dailyConsumption: number[];
      dailyTarget: number[];
    }
  );

  function goBack() {
    navigation.goBack();
  }

  function navigateToReportDetailsScreen() {
    navigation.navigate(RouteConstants.ReportDetails);
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

  useEffect(() => {
    if (error && !isLoading) handleQueryError(error);
  }, [error, isLoading, handleQueryError]);

  return (
    <ScreenWrapper snackbar={<Snackbar />}>
      <NavigationHeader
        variant="titled"
        title="Relatório"
        subtitle={formatDateToLabel(localDate, "short")}
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
      <View style={styles.chartContainer}>
        <LineChartSkeleton
          show={isLoading || isThrottling || isFetching || !!error}
        >
          <View style={styles.labelsWrapper}>
            <ChartLabel color={colors.secondary} label="Plano de execução" />
            <ChartLabel color={colors.primary} label="Calorias consumidas" />
          </View>
          {statistics.length > 0 ? (
            <LineChart
              key={dateFilter.day}
              labels={chartDataAndLabels.labels}
              data={[
                {
                  color: colors.primary,
                  values: chartDataAndLabels.dailyConsumption,
                  withTooltip: true,
                  withDots: true,
                },
                {
                  color: colors.secondary,
                  values: chartDataAndLabels.dailyTarget,
                  withYLabel: true,
                  withDots: chartDataAndLabels.dailyTarget.length === 1,
                },
              ]}
            />
          ) : (
            <EmptyDataPlaceholder
              title="Sem dados disponíveis"
              text="Parece que você não possui dados registrados para esse período."
              icon={
                <LineChartIcon
                  strokeWidth={1.5}
                  width="100%"
                  height="100%"
                  stroke={colors.gray.mediumDark}
                />
              }
            />
          )}
        </LineChartSkeleton>
      </View>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={navigateToReportDetailsScreen}
      >
        <Text style={styles.linkButtonText}>Saiba mais</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default ReportScreen;
