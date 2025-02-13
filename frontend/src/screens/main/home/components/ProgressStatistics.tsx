import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MugIcon } from "../../../../components/icons/MugIcon";
import { AppleIcon } from "../../../../components/icons/AppleIcon";
import { FreshFruitsIcon } from "../../../../components/icons/FreshFruitsIcon";
import { CookieIcon } from "../../../../components/icons/CookieIcon";
import { SoupIcon } from "../../../../components/icons/SoupIcon";
import { ProgressBar } from "../../../../components/ProgressBar";
import { useProgressStore } from "../../../../store/progress";
import { useCaloriePlanStore } from "../../../../store/caloriePlan";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { RouteConstants } from "../../../../routes/types";

export function ProgressStatistics() {
  const navigation = useAppNavigation();
  const planType = useProgressStore((state) => state.data?.currentCaloriePlan);
  const currentPlan = useCaloriePlanStore((state) =>
    state.data.find(({ type }) => type === planType)
  );

  function navigateToCreateMealScreen() {
    navigation.navigate(RouteConstants.CreateMeal);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foram registradas:</Text>
      <View style={styles.calorieProgress}>
        <View style={styles.foodIconsWrapper}>
          <MugIcon />
          <AppleIcon />
          <FreshFruitsIcon />
          <CookieIcon />
          <SoupIcon />
        </View>
        <ProgressBar
          total={currentPlan?.dailyCalorieIntake || 0}
          achieved={850} //Dado mockado
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCreateMealScreen}>
          <Text style={styles.buttonText}>Registrar refeição</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-300",
    color: "#4e4b66",
  },
  calorieProgress: {
    padding: 10,
    gap: 10,
  },
  foodIconsWrapper: {
    gap: 32,
    rowGap: 16,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    textAlign: "auto",
    fontSize: 14,
    fontFamily: "Roboto-300",
    color: "#0000FF",
  },
});
