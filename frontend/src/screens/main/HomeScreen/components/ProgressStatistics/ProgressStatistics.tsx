import { Text, TouchableOpacity, View } from "react-native";
import { MugIcon } from "../../../../../components/Icons/MugIcon";
import { AppleIcon } from "../../../../../components/Icons/AppleIcon";
import { FreshFruitsIcon } from "../../../../../components/Icons/FreshFruitsIcon";
import { CookieIcon } from "../../../../../components/Icons/CookieIcon";
import { SoupIcon } from "../../../../../components/Icons/SoupIcon";
import { ProgressBar } from "../../../../../components/ProgressBar/ProgressBar";
import { useAppNavigation } from "../../../../../hooks/common/useAppNavigation";
import { RouteConstants } from "../../../../../routes/types";
import { styles } from "./styles";
import { Skeleton } from "moti/skeleton";

interface ProgressStatisticsProps {
  targetCalories: number;
  consumedCalories: number;
  isLoading?: boolean;
}

export function ProgressStatistics(props: ProgressStatisticsProps) {
  const navigation = useAppNavigation();

  function navigateToCreateMealScreen() {
    navigation.navigate(RouteConstants.CreateMeal);
  }

  function navigateToReportScreen() {
    navigation.navigate(RouteConstants.ReportRouter);
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
        <Skeleton
          show={props.isLoading}
          height={20}
          radius={20}
          width="100%"
          colorMode="light">
          <ProgressBar total={props.targetCalories} achieved={props.consumedCalories} />
        </Skeleton>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={navigateToReportScreen}>
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCreateMealScreen}>
          <Text style={styles.buttonText}>Registrar refeição</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
