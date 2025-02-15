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
import { FOOD_ITEM_HEIGHT } from "./components/FoodItem";
import {
  formatDateToLabel,
  transformFoodNameIntoSlug,
} from "../../../utils/helpers";
import { useSearchFoods } from "./hooks/useSearchFoods";
import { useThrottle } from "../../../hooks/useThrottle ";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { FoodList } from "./components/FoodList";
import { styles } from "./styles";

type SearchFoodsScreenRouteProp = RouteProp<
  RouteParamsList,
  RouteConstants.SearchFoods
>;

interface SearchFoodsScreenProps {
  route: SearchFoodsScreenRouteProp;
}

const SearchFoodsScreen = ({ route }: SearchFoodsScreenProps) => {
  const { mealDate } = route.params;
  const navigation = useAppNavigation();
  const windowDimensions = useWindowDimensions();

  const [foodName, setFoodName] = useState("");
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);

  const foodSlug = transformFoodNameIntoSlug(foodName);
  const { throttler, clearThrottler } = useThrottle(400);
  const { showSnackbar, Snackbar } = useSnackbar();

  const { foods, hasMore, isError, isFetching, fetchFoods, fetchMoreFoods } =
    useSearchFoods(foodSlug);

  useEffect(() => {
    if (bodyHeight) {
      const remainingHeight = windowDimensions.height - bodyHeight;
      const totalItemsToFetch = Math.ceil(remainingHeight / FOOD_ITEM_HEIGHT);

      foodSlug.length > 0
        ? throttler(() => fetchFoods(totalItemsToFetch))
        : clearThrottler();
    }
  }, [bodyHeight, foodSlug]);

  useEffect(() => {
    if (isError) {
      showSnackbar({
        id: Math.floor(Math.random() * 2),
        variant: "error",
        duration: 5000,
        message:
          "Desculpe, não conseguimos encontrar as informações solicitadas, tente novamente mais tarde.",
      });
    }
  }, [isError, isFetching]);

  function goBack() {
    navigation.goBack();
  }

  function handleInputChange(text: string) {
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

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (!foodSlug.length) return;
    if (!hasMore) return;

    const isScrollCloseToBottom = isCloseToBottom(e);

    if (isScrollCloseToBottom && !isFetching) {
      fetchMoreFoods();
    }
  }

  function getBodyHeight(e: LayoutChangeEvent) {
    setBodyHeight(e.nativeEvent.layout.height);
  }

  const shortDateLabel = formatDateToLabel(
    new Date(mealDate.year, mealDate.month, mealDate.day),
    "short"
  );

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      onScroll={handleScroll}
      snackbar={<Snackbar />}
    >
      <View style={styles.body} onLayout={getBodyHeight}>
        <NavigationHeader
          variant="titled"
          title="Lanche"
          subtitle={shortDateLabel}
          onBack={goBack}
        />
        <ScreenTitle
          style={styles.title}
          title="Encontre o que você vai comer!"
        />
        <Paragraph style={styles.text}>
          Pesquise pelo nome do alimento ou escolha entre as sugestões abaixo
          para manter seu controle alimentar em dia.
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
          color="#3AA1A8"
          size="large"
        />
      ) : null}
    </ScreenWrapper>
  );
};

export default SearchFoodsScreen;
