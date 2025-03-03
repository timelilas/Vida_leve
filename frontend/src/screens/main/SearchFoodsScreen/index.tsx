import { RouteProp } from "@react-navigation/native";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
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
import { useEffect, useState } from "react";
import { FOOD_ITEM_HEIGHT } from "./components/FoodItem/constants";
import {
  delay,
  formatDateToLabel,
  getTitleFromMealType,
} from "../../../utils/helpers";
import { useSearchFoods } from "./hooks/useSearchFoods";
import { useThrottle } from "../../../hooks/useThrottle ";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { FoodList } from "./components/FoodList";
import { styles } from "./styles";
import { colors } from "../../../styles/colors";
import { useMealStore } from "../../../store/meal";

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

  const { foods, hasMore, isError, isFetching, fetchMoreFoods } =
    useSearchFoods({
      foodName,
      enabled: isQueryEnabled,
      limit,
    });

  useEffect(() => {
    if (isError) {
      showSnackbar({
        id: Math.floor(Math.random() * 2),
        variant: "error",
        duration: 5000,
        message:
          "Desculpe, não conseguimos encontrar as informações solicitadas, por favor, tente novamente mais tarde.",
      });
    }
  }, [isError, isFetching]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      delay(200).then(() => setFoodName(""));
    });
    return () => unsubscribe();
  }, []);

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

  function handleSceenScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
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

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      onScroll={handleSceenScroll}
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
      {isFetching ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={colors.primary}
          size="large"
        />
      ) : null}
    </ScreenWrapper>
  );
};

export default SearchFoodsScreen;
