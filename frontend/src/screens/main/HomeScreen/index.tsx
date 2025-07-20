import { View, RefreshControl } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { PlanInformation } from "./components/PlanInformation";
import { CalorieConsumption } from "./components/CalorieConsumption";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";
import { useProgress } from "../../../hooks/progress/useProgress";
import { useCaloriePlans } from "../../../hooks/caloriePlan/useCaloriePlans";
import { useMeal } from "../../../hooks/meal/useMeal";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { convertDateToLocalDateData } from "../../../utils/helpers";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { SectionContainer } from "./components/SectionContainer";
import { StatisticsOverview } from "./components/StatisticsOverview";
import { useWeightHistory } from "../../../hooks/weight/useWeightHistory";
import { ImageManagerModal } from "../../../components/ImageManagerModal";
import { MediaErrorCode, ModalAction } from "../../../components/ImageManagerModal/types";
import { useUser } from "../../../hooks/user/useUser";
import { SnackbarVariant } from "../../../components/Snackbar/types";
import { MAX_PROFILE_IMAGE_SIZE } from "../../../constants/fileConstants";
import { secureStorage } from "../../../services/common/secureStorage";
import { STORAGE_ACCESS_TOKEN } from "../../../constants/localStorageConstants";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { CommonActions } from "@react-navigation/native";
import { RouteConstants } from "../../../routes/types";
import { QueryKeys } from "../../../constants/reactQueryKeys";
import { queryClient } from "../../../libs/react-query/queryClient";

const HomeScreen = () => {
  const { year, month, day } = convertDateToLocalDateData(new Date());
  const navigation = useAppNavigation();
  const { progress } = useProgress({ refetchOnMount: false });
  const { plans } = useCaloriePlans({ refetchOnMount: false });
  const { getUserProfile } = useUser({ refetchOnMount: false });
  const {
    error: weightHistoryError,
    isFetching: isFetchingWeightHistory,
    fetchWeights
  } = useWeightHistory({ limit: 20 });
  const {
    dailyConsumption,
    error: mealsError,
    isFetching: isFetchingMeals,
    fetchMeals
  } = useMeal({ date: new Date(year, month, day) });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isImageModalVisible, seIsImageModalVisible] = useState(false);
  const { Snackbar, showSnackbar } = useSnackbar();

  const currentPlan = plans.find(({ type }) => type === progress?.currentCaloriePlan);

  const handleQueryError = useCallback(
    (error: Error, target: "meals" | "weightHistory") => {
      const weightHistoryError =
        "Desculpe, não foi possível obter algumas informações do seu perfil. Por favor, tente novamente mais tarde.";
      const calorieConsumptionErrorMessage =
        "Desculpe, não foi possível obter o seu consumo de calorias diário. Por favor, tente novamente mais tarde.";

      const errorMessage =
        error instanceof HttpError
          ? target === "meals"
            ? calorieConsumptionErrorMessage
            : weightHistoryError
          : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        variant: "error",
        duration: 5000,
        message: errorMessage
      });
    },
    [showSnackbar]
  );

  const clearCachedState = () => {
    const subscriptionQueryKeys = [
      QueryKeys.API.USER,
      QueryKeys.API.PROGRESS,
      QueryKeys.API.CALORIE_PLANS,
      QueryKeys.API.WEIGHT_HISTORY
    ];

    queryClient.removeQueries({
      predicate: (query) => {
        const isQueryKeyString = typeof query.queryKey[0] === "string";
        const isMealKey = query.queryKey[0] === QueryKeys.API.MEALS("")[0];
        const isCalorieStatisticsKey =
          query.queryKey[0] === QueryKeys.API.CALORIE_STATISTICS("", "")[0];

        const isValidKey =
          subscriptionQueryKeys.includes(query.queryKey as any) ||
          (isQueryKeyString && (isMealKey || isCalorieStatisticsKey));

        return isValidKey;
      }
    });
  };

  const handleSignout = () => {
    secureStorage.removeItem(STORAGE_ACCESS_TOKEN);

    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: RouteConstants.Welcome }, { name: RouteConstants.Login }],
        index: 1
      })
    );

    clearCachedState();
  };

  async function refreshData() {
    setIsRefreshing(true);
    await Promise.all([fetchMeals(), fetchWeights(), getUserProfile()]);
    setIsRefreshing(false);
  }

  function openImageModal() {
    seIsImageModalVisible(true);
  }

  function closeImageModal() {
    seIsImageModalVisible(false);
  }

  function mapMediaErrorCodeToMessage(code: MediaErrorCode) {
    const maxImageSizeMB = Math.ceil(MAX_PROFILE_IMAGE_SIZE / 1000000);

    const messageMap: Record<
      MediaErrorCode,
      { text: string; variant: SnackbarVariant } | null
    > = {
      CAMERA_PERMISSION_DENIED: {
        variant: "warning",
        text: "É necessário permitir o acesso à câmera para tirar a sua foto de perfil."
      },
      FILE_TOO_LARGE: {
        variant: "error",
        text: `O tamanho da imagem deve ser inferior a ${maxImageSizeMB}MB.`
      },
      UNKNOWN_TYPE: {
        variant: "error",
        text: "A imagem não possui um formato válido ou é desconhecido."
      },
      MEDIA_UPLOAD_FAILED: {
        variant: "error",
        text: "Desculpe, não foi possível atualizar a sua foto de perfil no momento. Por favor, tente novamente mais tarde."
      },
      MEDIA_DELETE_FAILED: {
        variant: "error",
        text: "Desculpe, não foi possível remover a sua foto de perfil no momento. Por favor, tente novamente mais tarde."
      },
      MEDIA_SELECTION_CANCELED: null
    };

    return messageMap[code] || null;
  }

  function handleImageManagerFailure(code: MediaErrorCode) {
    const message = mapMediaErrorCodeToMessage(code);

    if (message) {
      showSnackbar({
        variant: message.variant,
        duration: 5000,
        message: message.text
      });
    }
  }

  function handleImageManagerSuccess(action: ModalAction) {
    const successMessageMap: Record<ModalAction, string | undefined> = {
      PICK_IMAGE: "Image de perfil atualizada com sucesso.",
      ACCESS_CAMERA: "Image de perfil atualizada com sucesso.",
      DELETE_IMAGE: "Imagem de perfil removida com sucesso."
    };

    const message = successMessageMap[action];

    if (message) {
      showSnackbar({
        duration: 5000,
        variant: "success",
        message: message
      });
    }
  }

  useEffect(() => {
    if (mealsError && !isFetchingMeals) {
      return handleQueryError(mealsError, "meals");
    }
    if (weightHistoryError && !isFetchingWeightHistory) {
      return handleQueryError(weightHistoryError, "weightHistory");
    }
  }, [
    mealsError,
    weightHistoryError,
    isFetchingWeightHistory,
    isFetchingMeals,
    handleQueryError
  ]);

  return (
    <ScreenWrapper
      snackbar={<Snackbar />}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />}>
      <NavigationHeader variant="branded" onSignOut={handleSignout} />
      <View style={styles.body}>
        <ProileHeader onSelectImage={openImageModal} />
        <View style={styles.separatorLine} />
        <View style={styles.sectionWrapper}>
          <SectionContainer>
            <PlanInformation />
          </SectionContainer>
          <SectionContainer>
            <CalorieConsumption
              targetCalories={currentPlan?.dailyCalorieIntake || 0}
              consumedCalories={dailyConsumption.total}
              isLoading={isFetchingMeals}
            />
          </SectionContainer>
          <SectionContainer>
            <StatisticsOverview />
          </SectionContainer>
        </View>
      </View>
      <ImageManagerModal
        isVisible={isImageModalVisible}
        onCloseModel={closeImageModal}
        onFailed={handleImageManagerFailure}
        onSuccess={handleImageManagerSuccess}
      />
    </ScreenWrapper>
  );
};

export default HomeScreen;
