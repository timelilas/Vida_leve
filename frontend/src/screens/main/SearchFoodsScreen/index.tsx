import { RouteProp } from "@react-navigation/native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { RouteConstants, RouteParamsList } from "../../../routes/types";
import { ScreenTitle } from "../../../components/ScreenTitle";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from "react-native";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import SearchInput from "./components/SearchInput";
import { useCallback, useEffect, useState } from "react";
import { FOOD_ITEM_HEIGHT } from "./components/FoodItem/constants";
import {
  formatDateToLabel,
  getTitleFromMealType,
} from "../../../utils/helpers";
import { useThrottle } from "../../../hooks/common/useThrottle ";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { FoodList } from "./components/FoodList";
import { styles } from "./styles";
import { colors } from "../../../styles/colors";
import { useMealStore } from "../../../store/meal";
import { useFoods } from "../../../hooks/food/useFoods";
import { HttpError } from "../../../@core/errors/httpError";
import { NETWORK_ERROR_MESSAGE } from "../../../constants/errorMessages";

type SearchFoodsScreenRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.SearchFoods
>;

interface SearchFoodsScreenProps {
  route: SearchFoodsScreenRouteProp;
}
const SearchFoodsScreen = ({ route }: SearchFoodsScreenProps) => {
  const navigation = useAppNavigation();
  const windowDimensions = useWindowDimensions();

  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);

  const [foodName, setFoodName] = useState("");
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);

  const { isThrottling, startThrottler } = useThrottle(350);
  const { showSnackbar, Snackbar } = useSnackbar();

  const isQueryEnabled = foodName.length > 0 && !!bodyHeight && !isThrottling;
  const limit = calculateTotalFoodsToFetch();
  const shortDateLabel = formatDateToLabel(new Date(mealDate), "short");

  const { foods, hasMore, error, isFetching, fetchMoreFoods } = useFoods({
    foodName,
    enabled: isQueryEnabled,
    limit,
  });

  function goBack() {
    navigation.goBack();
  }

  function calculateTotalFoodsToFetch() {
    if (!bodyHeight) return 0;

    const remainingHeight = windowDimensions.height - bodyHeight;
    const totalItemsToFetch = Math.ceil(remainingHeight / FOOD_ITEM_HEIGHT);

    return totalItemsToFetch;
  }

  function handleInputChange(text: string) {
    startThrottler();
    setFoodName(text);
  }

  function handleInputClear() {
    setFoodName("");
  }

  function isCloseToBottom(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const VERTICAL_THRESHOLD = 100;
    const contentHeight = e.nativeEvent.contentSize.height;
    const layoutHeight = e.nativeEvent.layoutMeasurement.height;
    const verticalOffset = e.nativeEvent.contentOffset.y;

    return verticalOffset + layoutHeight >= contentHeight - VERTICAL_THRESHOLD;
  }

  function handleScreenScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (!foodName.length) return;
    if (!hasMore) return;

    const isScrollCloseToBottom = isCloseToBottom(e);

    if (isScrollCloseToBottom && !isFetching) {
      fetchMoreFoods();
    }
  }

  function getBodyHeight(e: LayoutChangeEvent) {
    setBodyHeight(e.nativeEvent.layout.height);
  }

  const handleQueryError = useCallback(
    (error: Error) => {
      const foodsErrorMessage =
        "Desculpe, não conseguimos encontrar as informações solicitadas, por favor, tente novamente mais tarde.";

      const errorMessage =
        error instanceof HttpError ? foodsErrorMessage : NETWORK_ERROR_MESSAGE;

      showSnackbar({
        id: Math.floor(Math.random() * 2),
        variant: "error",
        duration: 5000,
        message: errorMessage,
      });
    },
    [showSnackbar]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.foodName !== undefined) {
        setFoodName(route.params.foodName);
      }
    });
    return () => unsubscribe();
  }, [route.params?.foodName]);

  useEffect(() => {
    if (error && !isFetching) {
      handleQueryError(error);
    }
  }, [error, isFetching, handleQueryError]);

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      onScroll={handleScreenScroll}
      snackbar={<Snackbar />}
    >
      <View style={styles.body} onLayout={getBodyHeight}>
        <NavigationHeader
          variant="titled"
          title={getTitleFromMealType(mealType)}
          subtitle={shortDateLabel}
          onBack={goBack}
        />
        <ScreenTitle
          style={styles.title}
          title="Encontre o que você vai comer!"
        />
        <Paragraph style={styles.text}>
          Digite o nome do alimento para encontrar o que procura.
        </Paragraph>
        <View style={styles.inputBox}>
          <SearchInput
            value={foodName}
            onChangeText={handleInputChange}
            onClearInput={handleInputClear}
          />
        </View>
      </View>
      <FoodList foods={foods} />
      <View style={styles.activityIndicatorContainer}>
        {isFetching ? (
          <ActivityIndicator color={colors.primary} size="large" />
        ) : null}
      </View>
    </ScreenWrapper>
  );
};

export default SearchFoodsScreen;
