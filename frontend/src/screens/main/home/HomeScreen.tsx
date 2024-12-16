import { StyleSheet, View } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { useUserStore } from "../../../store/user";
import { useProgressStore } from "../../../store/progress";
import { PlanInformation } from "./components/PlanInformation";
import { useCaloriePlanStore } from "../../../store/caloriePlan";
import { ProgressStatistics } from "./components/ProgressStatistics";
import { getDailyCalorieOffset } from "../../../@core/entities/caloriePlan/helpers";

const HomeScreen = () => {
  const email = useUserStore((state) => state.data.email);
  const firstname = useUserStore((state) => state.data.name)?.split(" ")[0];
  const progressData = useProgressStore((state) => state.data)!;

  const { currentCaloriePlan: planType, goalWeight, weight } = progressData;
  const dailyCalorieOffset = getDailyCalorieOffset(planType);

  const currentPlan = useCaloriePlanStore((state) =>
    state.data.find(({ type }) => type === planType)
  )!;

  const isCalorieDeficit = goalWeight < weight;

  return (
    <ScreenWrapper scrollable>
      <ScreenHeader />
      <View style={styles.body}>
        <ProileHeader name={firstname!} email={email} />
        <View style={styles.separatorLine} />
        <View style={styles.progressContainer}>
          <PlanInformation
            planType={planType}
            dailyCalorie={currentPlan?.dailyCalorieIntake!}
          />
          <ProgressStatistics
            overallCalorieGoal={dailyCalorieOffset * currentPlan.durationInDays}
            calorieAccumulated={isCalorieDeficit ? -29000 : 29000} //dado mockado
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 24,
  },
  separatorLine: {
    height: 1,
    width: "86%",
    alignSelf: "center",
    marginTop: 6,
    backgroundColor: "#4e4b66",
  },
  progressContainer: {
    marginTop: 24,
    gap: 24,
  },
});

export default HomeScreen;
