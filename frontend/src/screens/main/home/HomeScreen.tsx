import { StyleSheet, View } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { useUserStore } from "../../../store/user";
import { useProgressStore } from "../../../store/progress";
import { PlanInformation } from "./components/PlanInformation";
import { useCaloriePlanStore } from "../../../store/caloriePlan";

const HomeScreen = () => {
  const planType = useProgressStore((state) => state.data?.currentCaloriePlan);
  const user = useUserStore((state) => state.data);
  const firstName = user.name?.split(" ")[0];

  const currentPlan = useCaloriePlanStore((state) =>
    state.data.find(({ type }) => type === planType)
  );

  return (
    <ScreenWrapper scrollable>
      <ScreenHeader />
      <View style={styles.body}>
        <ProileHeader name={firstName!} email={user.email} />
        <View style={styles.separatorLine} />
        <View style={styles.progressContainer}>
          <PlanInformation
            planType={planType}
            dailyCalorie={currentPlan?.dailyCalorieIntake!}
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
