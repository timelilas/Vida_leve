import { View } from "react-native";
import { styles } from "./styles";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { WeighingScaleIcon } from "../../../../../components/Icons/WeighingScaleIcon";
import { ChartIcon } from "../../../../../components/Icons/ChartIcon";
import { SmallLinkButton } from "../SmallLinkButton";
import { SectionTitle } from "../SectionTitle";

export function StatisticsOverview() {
  const navigation = useAppNavigation();

  function navigateToReportScreen() {
    navigation.navigate(RouteConstants.ReportRouter);
  }

  function navigateToWeightTrackingScreen() {
    navigation.navigate(RouteConstants.WeightTracking);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <SectionTitle style={styles.sectionTitle}>Peso atual:</SectionTitle>
        <WeighingScaleIcon />
        <SmallLinkButton
          title="Alterar"
          style={styles.linkButton}
          onPress={navigateToWeightTrackingScreen}
        />
      </View>
      <View style={styles.sectionContainer}>
        <SectionTitle style={styles.sectionTitle}>Relatório:</SectionTitle>
        <ChartIcon />
        <SmallLinkButton
          title="Visualizar"
          style={styles.linkButton}
          onPress={navigateToReportScreen}
        />
      </View>
    </View>
  );
}
