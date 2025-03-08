import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpCaloriePlanService } from "../../services/caloriePlan";
import { queryClient } from "../../libs/react-query/queryClient";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";
import { useCallback } from "react";

interface UseCaloriePlansParams {
  queryEnabled: boolean;
}

export function useCaloriePlans(params?: UseCaloriePlansParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QueryKeys.DATABASE.CALORIE_PLANS,
    enabled: params?.queryEnabled ?? true,
    queryFn: async () => {
      const caloriePlans = await httpCaloriePlanService.getPlans();
      return caloriePlans.data;
    },
  });

  const updateLocalPlans = useCallback((plans: CaloriePlanProps[]) => {
    queryClient.setQueryData<CaloriePlanProps[]>(
      QueryKeys.DATABASE.CALORIE_PLANS,
      () => plans.map((plan) => ({ ...plan }))
    );
  }, []);

  const getPlans = useCallback(async () => {
    const { data: plans } = await refetch({ throwOnError: true });
    return plans || [];
  }, [refetch]);

  return {
    getPlans,
    updateLocalPlans,
    plans: data || [],
    isLoading,
    error,
  };
}
