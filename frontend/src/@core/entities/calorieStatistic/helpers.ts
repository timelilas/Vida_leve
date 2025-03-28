import { CalorieStatisticProps } from "./type";

export function calculateAvgCarlorieConsumption(
  data: Omit<CalorieStatisticProps, "date">[]
) {
  const { activeDaysCount, caloriesConsumed } = data.reduce(
    (acc, { consumption }) => {
      acc.caloriesConsumed += consumption;
      acc.activeDaysCount = acc.activeDaysCount + (consumption ? 1 : 0);
      return acc;
    },
    { caloriesConsumed: 0, activeDaysCount: 0 }
  );

  return activeDaysCount <= 0 ? 0 : caloriesConsumed / activeDaysCount;
}

export function getCalorieStatisticsSummary(
  data: Omit<CalorieStatisticProps, "date">[]
) {
  const summary = data.reduce(
    (acc, { consumption, strategy, target }) => {
      if (strategy === "deficit" && consumption > 0) {
        if (consumption <= target) acc.daysWithinTarget += 1;
        else acc.daysOffTarget += 1;
      }
      if (strategy === "superavit" && consumption > 0) {
        if (consumption >= target) acc.daysWithinTarget += 1;
        else acc.daysOffTarget += 1;
      }
      return acc;
    },
    { daysWithinTarget: 0, daysOffTarget: 0 }
  );

  return summary;
}
