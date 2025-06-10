import { View } from "moti";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import {
  formatDateToLabel,
  generateLocalDateRange,
  getLocalDateOnly
} from "../../../utils/helpers";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { styles } from "./styles";
import Select, { SelectEvent } from "../../../components/Select";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { DateIntervalType } from "../../../@types";
import { QueryKeys } from "../../../constants/reactQueryKeys";
import { queryClient } from "../../../libs/react-query/queryClient";
import { TimeRangeNavigator } from "../../../components/TimeRangeNavigator";
import { colors } from "../../../styles/colors";
import { ChartLabel } from "../../../components/ChartLabel";
import { LineChart } from "../../../components/LineChart";
import { useCalorieStatistics } from "../../../hooks/calorieStatistics/useCalorieStatistics";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { EmptyDataPlaceholder } from "../../../components/EmptyDataPlaceholder";
import { LineChartIcon } from "../../../components/Icons/LineChartIcon";
import { LineChartSkeleton } from "../../../components/LineChartSkeleton/inde";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ReportRoutesConstants,
  ReportRoutesParamsList
} from "../../../routes/reportRouter/types";
import { DateFilterContext } from "../../../contexts/dateFilterContext/DateFilterContext";
import { LinkButton } from "../../../components/LinkButton";

const ReportScreen = () => {
  const navigation = useNavigation<NavigationProp<ReportRoutesParamsList>>();
  const localDate = useMemo(() => getLocalDateOnly(), []);
  const { Snackbar, showSnackbar } = useSnackbar();

  const { dateData, intervalType, isDebouncing, updateDateDate, updateIntervalType } =
    useContext(DateFilterContext);

  const dateRange = generateLocalDateRange(intervalType, dateData);
  const { statistics, isLoading, isFetching, error } = useCalorieStatistics({
    from: dateRange.from,
    to: dateRange.to > localDate ? localDate : dateRange.to,
    enabled: !isDebouncing
  });

  const chartDataAndLabels = generateChartDataAndLabels();

  const isDailyTargetUnchanged = chartDataAndLabels.dailyTarget.reduce(
    (acc, value, _, data) => (value !== data[0] ? false : acc),
    true
  );

  function generateChartDataAndLabels() {
    const chartDataAndLabels = statistics.reduce(
      (acc, { consumption, target, date }) => {
        acc.labels.push(`${new Date(date).getUTCDate()}`);
        acc.dailyConsumption.push(consumption);
        acc.dailyTarget.push(target);
        return acc;
      },
      { dailyConsumption: [], dailyTarget: [], labels: [] } as {
        labels: string[];
        dailyConsumption: number[];
        dailyTarget: number[];
      }
    );

    if (statistics.length === 1) {
      chartDataAndLabels.labels.push("");
      chartDataAndLabels.dailyTarget.push(statistics[0].target);
    }

    return chartDataAndLabels;
  }

  function goBack() {
    navigation.goBack();
  }

  function navigateToReportDetailsScreen() {
    navigation.navigate(ReportRoutesConstants.ReportDetails);
  }

  function handleIntervalTypeSelect(e: SelectEvent) {
    updateIntervalType(e.value as DateIntervalType);
  }

  const handleTimeRangeChange = useCallback(
    (date: Date) => {
      const { from, to } = generateLocalDateRange(intervalType, date);
      const queryKey = QueryKeys.API.CALORIE_STATISTICS(
        from.toISOString().split("T")[0],
        (to > localDate ? localDate : to).toISOString().split("T")[0]
      );
      const withDebounce = queryClient.getQueryData(queryKey) === undefined;
      updateDateDate(date, withDebounce);
    },
    [updateDateDate, intervalType, localDate]
  );

  const handleQueryError = useCallback(
    (error: Error) => {
      const mealsError = `Desculpe, não foi possível obter as informações para o período selecionado. Tente novamente mais tarde.`;
      const errorMessage = error instanceof HttpError ? mealsError : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage
      });
    },
    [showSnackbar]
  );

  function checkDailyTargetPointsVisiblity(value: number, index: number) {
    const data = chartDataAndLabels.dailyTarget;

    if (!isDailyTargetUnchanged) {
      const previousValue = data[index - 1];
      const nextValue = data[index + 1];
      return previousValue !== value || nextValue !== value;
    }

    const isLastItem = index === data.length - 1;
    const isFirstItem = index === 0;
    const isMiddleItem = data.length % 2 !== 0 && index === Math.floor(data.length / 2);

    return isFirstItem || isLastItem || isMiddleItem;
  }

  function renderCalorieConsumptionChart() {
    const data = chartDataAndLabels.dailyConsumption;
    const maxCalorieConsumption = data?.length ? Math.max(...data) : 0;
    return statistics.length > 0 ? (
      <LineChart
        xAxisName="Dia do mês"
        yAxisName="kcal"
        key={dateData.day}
        lineStrokeWidth={3}
        yTickMultiple={100}
        style={{ paddingLeft: maxCalorieConsumption > 10000 ? 52 : 44 }}
        labels={chartDataAndLabels.labels}
        data={[
          {
            color: colors.primary,
            fillColor: colors.primary,
            values: chartDataAndLabels.dailyConsumption,
            tooltip: { color: colors.primary, enabled: true },
            withDots: true
          },
          {
            color: colors.secondary,
            values: chartDataAndLabels.dailyTarget,
            withDots: checkDailyTargetPointsVisiblity,
            tooltip: { color: colors.secondary, enabled: checkDailyTargetPointsVisiblity }
          }
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
    );
  }

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
          key={`${dateData.year}-${dateData.month}-${dateData.day}`}
          onChange={handleTimeRangeChange}
          intervalType={intervalType}
          initialDate={new Date(dateData.year, dateData.month, dateData.day)}
        />
      </View>
      <View style={styles.chartContainer}>
        <LineChartSkeleton show={isLoading || isDebouncing || isFetching}>
          <View style={styles.labelsWrapper}>
            <ChartLabel color={colors.secondary} label="Plano de execução" />
            <ChartLabel color={colors.primary} label="Calorias consumidas" />
          </View>
          {error ? null : renderCalorieConsumptionChart()}
        </LineChartSkeleton>
      </View>
      <LinkButton
        style={styles.linkButton}
        title="Saiba mais"
        onPress={navigateToReportDetailsScreen}
      />
    </ScreenWrapper>
  );
};

export default ReportScreen;
