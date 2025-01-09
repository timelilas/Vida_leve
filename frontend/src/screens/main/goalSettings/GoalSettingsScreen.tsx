import { StyleSheet, Text, View } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { Paragraph } from "../../../components/Paragraph";
import { ToggleButton } from "../../../components/buttons/ToggleButton";
import { useState } from "react";
import { RouteConstants } from "../../../routes/types";

type SelectedRoute = "progress" | "plan";

const GoalSettingsScreen = () => {
  const navigation = useAppNavigation();
  const [selectedRoute, setSelectedRoute] = useState<SelectedRoute | null>(
    null
  );

  function goBack() {
    navigation.goBack();
  }

  function selectRoute(route: SelectedRoute | null) {
    setSelectedRoute(route);
  }

  function navigateToPlanSelection() {
    navigation.navigate(RouteConstants.PlanSelection, {
      nextRoute: RouteConstants.Home,
      withModal: true,
    });
  }

  return (
    <ScreenWrapper scrollEnabled={selectedRoute === null}>
      <View style={styles.body}>
        <ScreenHeader onGoBack={goBack} />
        <View style={styles.contentContainer}>
          <ScreenTitle title="Altere sua meta diária" />
          <Paragraph>
            Ajuste facilmente sua meta de calorias e refeições para alcançar
            seus objetivos de forma personalizada. Através da:
          </Paragraph>
        </View>
        <View style={styles.buttonWrapper}>
          <ToggleButton
            rounded
            onPress={() => {}}
            selected={selectedRoute === "progress"}
            onTouchStart={() => selectRoute("progress")}
            onTouchEnd={() => selectRoute(null)}
          >
            <Text style={styles.buttonText}>Meta</Text>
          </ToggleButton>
          <Text style={styles.textDivider}>Ou</Text>
          <ToggleButton
            rounded
            onPress={navigateToPlanSelection}
            selected={selectedRoute === "plan"}
            onTouchStart={() => selectRoute("plan")}
            onTouchEnd={() => selectRoute(null)}
          >
            <Text style={styles.buttonText}>Plano de execução</Text>
          </ToggleButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  body: {
    gap: 32,
  },
  contentContainer: {
    gap: 8,
  },
  buttonWrapper: {
    gap: 16,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 14,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Roboto-400",
    color: "#242424",
  },
  textDivider: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Roboto-700",
    textAlign: "center",
    color: "#4E4B66",
  },
});

export default GoalSettingsScreen;
