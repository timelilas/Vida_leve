import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { PlanStrategy } from "../../../../../@core/entities/@shared/panStrategy/type";

interface PodiumProps {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
}

export function Podium(props: PodiumProps) {
  const { startWeight, currentWeight, targetWeight } = props;

  const strategy: PlanStrategy = targetWeight > startWeight ? "superavit" : "deficit";

  const reachedTheGoal =
    (strategy === "deficit" && currentWeight <= targetWeight) ||
    (strategy === "superavit" && currentWeight >= targetWeight);

  return (
    <View style={styles.container}>
      <View style={[styles.place, styles.thirdPlace]}>
        <Text style={styles.value}>{startWeight} kg</Text>
        <Text style={styles.label}>Inicial</Text>
      </View>
      <View style={[styles.place, styles.secondPlace]}>
        <Text style={styles.value}>{currentWeight} kg</Text>
        <Text style={styles.label}>Atual</Text>
        {!reachedTheGoal && (
          <Image
            style={styles.runningAvocadoImage}
            source={require("../../../../../assets/images/running-avocado.png")}
          />
        )}
      </View>
      <View style={[styles.place, styles.firstPlace]}>
        <Text style={styles.value}>{targetWeight} kg</Text>
        <Text style={styles.label}>Objetivo</Text>
        <Image
          style={reachedTheGoal ? styles.finishFlagImageRight : styles.finishFlagImage}
          source={require("../../../../../assets/images/finish-flag.png")}
        />
        {reachedTheGoal && (
          <View style={styles.avocadoWithTrophyContainer}>
            <Image
              style={styles.avocadoWithTrophy}
              source={require("../../../../../assets/images/avocado-with-trophy.png")}
            />
          </View>
        )}
      </View>
    </View>
  );
}
