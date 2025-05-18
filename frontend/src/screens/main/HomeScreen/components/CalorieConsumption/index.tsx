import { View } from "react-native";
import { MugIcon } from "../../../../../components/Icons/MugIcon";
import { AppleIcon } from "../../../../../components/Icons/AppleIcon";
import { FreshFruitsIcon } from "../../../../../components/Icons/FreshFruitsIcon";
import { CookieIcon } from "../../../../../components/Icons/CookieIcon";
import { SoupIcon } from "../../../../../components/Icons/SoupIcon";
import { ProgressBar } from "../../../../../components/ProgressBar/ProgressBar";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";
import { Skeleton } from "moti/skeleton";
import { SmallLinkButton } from "../SmallLinkButton";
import { SectionTitle } from "../SectionTitle";

interface CalorieConsumptionProps {
  targetCalories: number;
  consumedCalories: number;
  isLoading?: boolean;
}

export function CalorieConsumption(props: CalorieConsumptionProps) {
  const navigation = useAppNavigation();

  function navigateToCreateMealScreen() {
    navigation.navigate(RouteConstants.CreateMeal);
  }

  return (
    <View>
      <SectionTitle>Foram registradas:</SectionTitle>
      <View style={styles.calorieProgress}>
        <View style={styles.foodIconsWrapper}>
          <MugIcon />
          <AppleIcon />
          <FreshFruitsIcon />
          <CookieIcon />
          <SoupIcon />
        </View>
        <Skeleton
          show={props.isLoading}
          height={20}
          radius={20}
          width="100%"
          colorMode="light">
          <ProgressBar total={props.targetCalories} achieved={props.consumedCalories} />
        </Skeleton>
      </View>
      <SmallLinkButton
        title="Registrar"
        style={styles.linkButton}
        onPress={navigateToCreateMealScreen}
      />
    </View>
  );
}
