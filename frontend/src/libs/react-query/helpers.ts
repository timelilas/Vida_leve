import { QueryKeys } from "../../constants/reactQueryKeys";
import { convertDateToLocalDateData } from "../../utils/helpers";
import { queryClient } from "./queryClient";

export const invalidateCalorieStatistics = (mealDateISO?: string) => {
  const date = convertDateToLocalDateData(new Date());
  let mealDateString;

  if (mealDateISO) {
    mealDateString = mealDateISO;
  } else {
    const currentLocalDate = new Date(date.year, date.month, date.day);
    mealDateString = currentLocalDate.toISOString().split("T")[0];
  }

  queryClient.invalidateQueries({
    predicate: (query) => {
      const baseKey = QueryKeys.API.CALORIE_STATISTICS("", "")[0];

      if (!Array.isArray(query.queryKey)) return false;
      if (query.queryKey[0] !== baseKey) return false;

      const from = new Date(query.queryKey[1]);
      const to = new Date(query.queryKey[2]);
      const mealDate = new Date(mealDateString);

      return mealDate <= to && mealDate >= from;
    }
  });
};
