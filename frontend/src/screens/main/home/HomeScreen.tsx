import { StyleSheet, View } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { PlanInformation } from "./components/PlanInformation";
import { ProgressStatistics } from "./components/ProgressStatistics";

const HomeScreen = () => {
  return (
    <ScreenWrapper scrollable>
      <ScreenHeader />
      <View style={styles.body}>
        <ProileHeader />
        <View style={styles.separatorLine} />
        <View style={styles.progressContainer}>
          <PlanInformation />
          <ProgressStatistics />
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
