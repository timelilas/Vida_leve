import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MugIcon } from "../../../../components/icons/MugIcon";
import { AppleIcon } from "../../../../components/icons/AppleIcon";
import { FreshFruitsIcon } from "../../../../components/icons/FreshFruitsIcon";
import { CookieIcon } from "../../../../components/icons/CookieIcon";
import { SoupIcon } from "../../../../components/icons/SoupIcon";
import { ProgressBar } from "../../../../components/ProgressBar";

interface ProgressStatisticsProps {
  dailyCalorieTarget: number;
  dailyConsumedCalories: number;
}

export function ProgressStatistics(props: ProgressStatisticsProps) {
  const { dailyCalorieTarget, dailyConsumedCalories } = props;

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
          total={dailyCalorieTarget}
          achieved={dailyConsumedCalories}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
