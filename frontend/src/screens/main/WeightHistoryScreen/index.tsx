import {
  ActivityIndicator,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  useWindowDimensions,
  View
} from "react-native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import {
  convertDateToLocalDateData,
  dateToPTBR,
  delay,
  formatDateToLabel
} from "../../../utils/helpers";
import { styles } from "./styles";
import { DayPicker } from "../../../components/DayPicker";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { WeightTable } from "./components/WeightTable";
import { SubmitButton } from "../../../components/SubmitButton";
import { CommonActions } from "@react-navigation/native";
import { RouteConstants } from "../../../routes/types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { WeightProps } from "../../../@core/entities/weight/type";
import { useWeightHistory } from "../../../hooks/weight/useWeightHistory";
import { WeightHistoryTableSkeleton } from "./components/WeightHistoryTableSkeleton";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { TableOverlay } from "./components/TableOverlay";
import {
  WEIGHT_TABLE_ITEM_HEIGHT,
  WEIGHT_TABLE_ITEM_MARGIN_BOTTOM
} from "./components/WeightItem/constants";
import { colors } from "../../../styles/colors";
import { AlertModal } from "../../../components/AlertModal";

interface SelectedWeight extends WeightProps {
  isDeleted: boolean;
}

const WeightHistoryScreen = () => {
  const { Snackbar, showSnackbar } = useSnackbar();
  const navigation = useAppNavigation();
  const windowDimensions = useWindowDimensions();

  const dateData = convertDateToLocalDateData(new Date());
  const localDate = new Date(dateData.year, dateData.month, dateData.day);
  const shortDateLabel = formatDateToLabel(localDate, "short");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<SelectedWeight | null>(null);
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);
  const [queryLimit, setQueryLimit] = useState<number>(0);

  const { data, isFetching, isDeleting, error, deleteWeight, fetchWeights, fetchMoreWeights } =
    useWeightHistory({
      limit: queryLimit,
      enabled: !!queryLimit
    });

  const orderedWeights = data.weights.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const selectedWeightFormattedDate = selectedWeight
    ? dateToPTBR(selectedWeight.date, { year: "2-digits" })
    : null;

  function goBack() {
    navigation.goBack();
  }

  function resetNavigationToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: RouteConstants.Home }]
      })
    );
  }

  function handleDeleteWeightError(error: Error) {
    let defaultMessage = NETWORK_ERROR_MESSAGE;
    if (error instanceof HttpError) {
      if (error.status === 404) {
        defaultMessage = "Desculpe, não foi possível localizar o registro solicitado.";
      } else {
        defaultMessage =
          "Desculpe, ocorreu um erro durante o registro de peso. Por favor, tente novamente mais tarde.";
      }
    }
    showSnackbar({ duration: 5000, message: defaultMessage, variant: "error" });
  }

  function onDeleteWeight(weight: WeightProps) {
    if (isDeleting) return;
    setSelectedWeight({ ...weight, isDeleted: false });
    setIsModalVisible(true);
  }

  function onCancelDeleteWeightModal() {
    setIsModalVisible(false);
  }

  async function onConfirmDeleteWeightModal() {
    if (isDeleting) return;
    if (!selectedWeight) return;
    setIsModalVisible(false);

    try {
      await deleteWeight(selectedWeight.id);
      setSelectedWeight((prevState) =>
        prevState ? { ...prevState, isDeleted: true } : prevState
      );
      delay(700).then(() =>
        showSnackbar({
          duration: 3000,
          message: "Registro de peso excluído com sucesso!",
          variant: "success"
        })
      );
    } catch (error: any) {
      handleDeleteWeightError(error);
    }
  }

  async function refreshWeightHistory() {
    setIsRefreshing(true);
    await fetchWeights();
    setIsRefreshing(false);
  }

  function getBodyHeight(e: LayoutChangeEvent) {
    setBodyHeight(e.nativeEvent.layout.height);
  }

  function isCloseToBottom(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const VERTICAL_THRESHOLD = 150;
    const contentHeight = e.nativeEvent.contentSize.height;
    const layoutHeight = e.nativeEvent.layoutMeasurement.height;
    const verticalOffset = e.nativeEvent.contentOffset.y;

    return verticalOffset + layoutHeight >= contentHeight - VERTICAL_THRESHOLD;
  }

  function handleScreenScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const isScrollCloseToBottom = isCloseToBottom(e);

    if (isScrollCloseToBottom && !isFetching) {
      fetchMoreWeights();
    }
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

  useLayoutEffect(() => {
    if (!bodyHeight) return;
    const remainingHeight = windowDimensions.height - bodyHeight;
    const weightItemTotalHeight = WEIGHT_TABLE_ITEM_HEIGHT + WEIGHT_TABLE_ITEM_MARGIN_BOTTOM;
    const totalItemsToFetch = Math.ceil(remainingHeight / weightItemTotalHeight);

    setQueryLimit(Math.max(totalItemsToFetch, 10));
  }, [bodyHeight, windowDimensions.height]);

  return (
    <ScreenWrapper
      onScroll={handleScreenScroll}
      snackbar={<Snackbar />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refreshWeightHistory} />
      }>
      <View onLayout={getBodyHeight}>
        <NavigationHeader
          variant="titled"
          subtitle={shortDateLabel}
          title="Pesos registrados"
          onBack={goBack}
        />
        <ScreenTitle title={"Hoje"} style={[styles.title, styles.dayTitle]} />
        <View style={styles.dayPickerContainer}>
          <DayPicker currentDate={dateData} onSelectDate={() => {}} startDate={localDate} />
        </View>
        <View style={styles.textWrapper}>
          <ScreenTitle title="Histórico de pesos" style={styles.title} />
          <Paragraph style={styles.paragraph}>
            Veja seus registros e acompanhe sua evolução ao longo do tempo. Caso precise,
            exclua um registro pela data.
          </Paragraph>
        </View>
        <View style={styles.separatorLine} />
      </View>
      <View style={styles.weightTableContainer}>
        <WeightHistoryTableSkeleton show={isFetching || isRefreshing || !queryLimit}>
          {error ? null : (
            <>
              <WeightTable
                data={orderedWeights.map((record, index) => {
                  return {
                    id: record.id,
                    weight: record.weight,
                    date: new Date(record.date),
                    isDeleted: selectedWeight?.id === record.id && selectedWeight?.isDeleted,
                    isLast: index === orderedWeights.length - 1,
                    onDelete: () => onDeleteWeight({ ...record, date: new Date(record.date) })
                  };
                })}
              />
              {isFetching && <ActivityIndicator color={colors.primary} size="large" />}
            </>
          )}
        </WeightHistoryTableSkeleton>
        {isDeleting ? <TableOverlay /> : null}
      </View>
      <SubmitButton
        disabled={isDeleting}
        style={styles.submitButton}
        title="Voltar para home"
        type="primary"
        onPress={resetNavigationToHome}
      />
      {selectedWeightFormattedDate ? (
        <AlertModal
          title="Confirmar exclusão do registo de peso"
          message={`Tem certeza de que deseja excluir o registro de ${selectedWeightFormattedDate}? Essa ação não pode ser desfeita.`}
          onConfirmText="Sim, excluir"
          onCancelText="Cancelar"
          isVisible={isModalVisible}
          onCancel={onCancelDeleteWeightModal}
          onConfirm={onConfirmDeleteWeightModal}
        />
      ) : null}
    </ScreenWrapper>
  );
};

export default WeightHistoryScreen;
