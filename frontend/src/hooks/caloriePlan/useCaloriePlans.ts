import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpCaloriePlanService } from "../../services/api/caloriePlan";
import { queryClient } from "../../libs/react-query/queryClient";
import { CaloriePlanProps } from "../../@core/entities/caloriePlan/type";
import { useCallback } from "react";

interface UseCaloriePlansParams {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export function useCaloriePlans(params?: UseCaloriePlansParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QueryKeys.API.CALORIE_PLANS,
    enabled: params?.enabled,
    refetchOnMount: params?.refetchOnMount,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const caloriePlans = await httpCaloriePlanService.getPlans();
      return caloriePlans.data;
    }
  });

  const updateLocalPlans = useCallback((plans: CaloriePlanProps[]) => {
    queryClient.setQueryData<CaloriePlanProps[]>(QueryKeys.API.CALORIE_PLANS, () =>
      plans.map((plan) => ({ ...plan }))
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
    error
  };
}
