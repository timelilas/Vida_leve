import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { styles } from "./styles";
import { View } from "react-native";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { MealItem } from "./components/MealItem";
import { useMealStore } from "../../../store/meal";
import { MealSummary } from "./components/MealSummary";
import {
  formatDateToLabel,
  getTitleFromMealType,
} from "../../../utils/helpers";
import { RouteConstants } from "../../../routes/types";

const MealRegistrationScreen = () => {
  const navigation = useAppNavigation();
  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);
  const foodIds = useMealStore((state) => state.foodIds);
  const shortDateLabel = formatDateToLabel(new Date(mealDate), "short");

  function goBack() {
    navigation.navigate(RouteConstants.SearchFoods);
  }

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <View style={styles.body}>
        <NavigationHeader
          variant="titled"
          title={getTitleFromMealType(mealType)}
          subtitle={shortDateLabel}
          onBack={goBack}
        />
        <View style={styles.textWrapper}>
          <ScreenTitle
            title="Aqui está sua refeição até agora"
            style={styles.title}
          />
          <Paragraph style={styles.text}>
            Confira os alimentos que você adicionou. Precisa incluir mais? Toque
            em “Adicionar Alimento”. Se já tiver tudo certo, finalize
            registrando sua refeição e acompanhe seu progresso diário.
          </Paragraph>
        </View>
      </View>
      <View>
        {foodIds.map((id) => (
          <MealItem key={`${id}`} foodId={`${id}`} />
        ))}
      </View>
      <MealSummary />
    </ScreenWrapper>
  );
};

export default MealRegistrationScreen;
