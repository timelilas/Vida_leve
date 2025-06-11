import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { dateToPTBR } from "../../../../../utils/helpers";
import { PlanStrategy } from "../../../../../@core/entities/@shared/panStrategy/type";

interface PodiumProps {
  startWeight: {
    date: Date;
    value: number;
  };
  currentWeight: {
    date: Date;
    value: number;
  };
  targetWeight: {
    date: Date;
    value: number;
  };
}

export function Podium(props: PodiumProps) {
  const { startWeight, currentWeight, targetWeight } = props;

  const strategy: PlanStrategy =
    targetWeight.value > startWeight.value ? "superavit" : "deficit";

  const reachedTheGoal =
    (strategy === "deficit" && currentWeight.value <= targetWeight.value) ||
    (strategy === "superavit" && currentWeight.value >= targetWeight.value);

  return (
    <View style={styles.container}>
      <View style={[styles.place, styles.thirdPlace]}>
        <Text style={styles.date}>{dateToPTBR(startWeight.date)}</Text>
        <Text style={styles.value}>{startWeight.value} kg</Text>
      </View>
      <View style={[styles.place, styles.secondPlace]}>
        <Text style={styles.date}>{dateToPTBR(currentWeight.date)}</Text>
        <Text style={styles.value}>{currentWeight.value} kg</Text>
        {!reachedTheGoal && (
          <Image
            style={styles.runningAvocadoImage}
            source={require("../../../../../assets/images/running-avocado.png")}
          />
        )}
      </View>
      <View style={[styles.place, styles.firstPlace]}>
        <Text style={styles.date}>{dateToPTBR(targetWeight.date)}</Text>
        <Text style={styles.value}>{targetWeight.value} kg</Text>
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
