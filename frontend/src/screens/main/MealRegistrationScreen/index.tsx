import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { useAppNavigation } from "../../../hooks/common/useAppNavigation";
import { styles } from "./styles";
import { View } from "react-native";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { Paragraph } from "../../../components/Paragraph/Paragraph";
import { MealItem } from "./components/MealItem";
import { useMealStore } from "../../../store/meal";
import { MealSummary } from "./components/MealSummary";
import {
  delay,
  formatDateToLabel,
  getTitleFromMealType,
} from "../../../utils/helpers";
import { RouteConstants } from "../../../routes/types";
import { ConnectionError } from "../../../@core/errors/connectionError";
import { useSnackbar } from "../../../hooks/common/useSnackbar";
import { useState } from "react";
import { CreateMealParams } from "../../../hooks/meal/types";
import { useMeal } from "../../../hooks/meal/useMeal";

const MealRegistrationScreen = () => {
  const navigation = useAppNavigation();
  const mealDate = useMealStore((state) => state.date);
  const mealType = useMealStore((state) => state.type);
  const foodIds = useMealStore((state) => state.foodIds);
  const shortDateLabel = formatDateToLabel(new Date(mealDate), "short");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const collapseAllItems = useMealStore((state) => state.collapseAllItems);
  const { Snackbar, showSnackbar } = useSnackbar();
  const { createMeal } = useMeal({
    calorieConsumption: { refetchOnMount: false },
  });

  function goBack() {
    navigation.goBack();
  }

  function handleError(error: Error) {
    setIsSubmitting(false);

    if (error instanceof ConnectionError) {
      return navigation.navigate(RouteConstants.ConnectionError);
    }
    showSnackbar({ duration: 5000, message: error.message, variant: "error" });
  }

  async function handleSubmit(data: CreateMealParams) {
    collapseAllItems();
    setIsSubmitting(true);

    const { date, foods, mealType } = data;
    await createMeal({ date, mealType, foods });

    setIsSubmitting(false);
  }

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      snackbar={<Snackbar />}
    >
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
          <MealItem key={`${id}`} foodId={`${id}`} disabled={isSubmitting} />
        ))}
      </View>
      <MealSummary
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </ScreenWrapper>
  );
};

export default MealRegistrationScreen;
