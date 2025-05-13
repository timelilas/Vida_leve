import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpMealService } from "../../services/meal";

interface UseCalorieStatisticsParams {
  enabled?: boolean;
  from: Date;
  to: Date;
}

export function useCalorieStatistics(params: UseCalorieStatisticsParams) {
  const { from, to } = params;
  const isoDateFrom = from.toISOString().split("T")[0];
  const isoDateTo = to.toISOString().split("T")[0];
  const queryKey = QueryKeys.API.CALORIE_STATISTICS(isoDateFrom, isoDateTo);

  const calorieStatisticsQuery = useQuery({
    queryKey,
    enabled: params.enabled,
    staleTime: Infinity,
    retry: 1,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      const { data: statistics } = await httpMealService.getCalorieStatistics({
        from: isoDateFrom,
        to: isoDateTo
      });
      return statistics;
    }
  });

  return {
    statistics: calorieStatisticsQuery.data || [],
    isLoading: calorieStatisticsQuery.isLoading,
    isFetching: calorieStatisticsQuery.isFetching,
    error: calorieStatisticsQuery.error
  };
}
