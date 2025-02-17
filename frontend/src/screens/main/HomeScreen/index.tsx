import { View } from "react-native";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { ProileHeader } from "./components/ProfileHeader";
import { PlanInformation } from "./components/PlanInformation";
import { ProgressStatistics } from "./components/ProgressStatistics/ProgressStatistics";
import { NavigationHeader } from "../../../components/NavigationHeader";
import { styles } from "./styles";

const HomeScreen = () => {
  return (
    <ScreenWrapper>
      <NavigationHeader variant="branded" />
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

export default HomeScreen;
