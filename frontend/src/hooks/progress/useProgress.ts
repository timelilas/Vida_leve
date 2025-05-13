import { useMutation, useQuery } from "@tanstack/react-query";
import { ProgressQueryState, upsertProgressParams } from "./types";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpProgressService } from "../../services/progress";
import { useCallback } from "react";
import { queryClient } from "../../libs/react-query/queryClient";
import { PlanType } from "../../@core/entities/@shared/planType/type";
import { invalidateCalorieStatistics } from "../../libs/react-query/helpers";

interface UseProgressParams {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export function useProgress(params?: UseProgressParams) {
  const { data, isLoading, error, refetch } = useQuery<ProgressQueryState>({
    queryKey: QueryKeys.API.PROGRESS,
    enabled: params?.enabled,
    refetchOnMount: params?.refetchOnMount,
    queryFn: async () => {
      const { data: progressData } = await httpProgressService.getProgress();
      return progressData;
    }
  });

  const upsertProgressMutation = useMutation({
    mutationFn: async (params: upsertProgressParams) => {
      const { data: progressData } = await httpProgressService.upsertProgress({
        ...params
      });
      return progressData;
    },
    onSuccess: (progressData) => {
      invalidateCalorieStatistics();
      queryClient.setQueryData<ProgressQueryState>(QueryKeys.API.PROGRESS, (old) => {
        return old ? { ...old, ...progressData } : progressData;
      });
    }
  });

  const setCaloriePlanMutation = useMutation({
    mutationFn: async (planType: PlanType) => {
      const { data: progressData } = await httpProgressService.setCaloriePlan(planType);
      return progressData;
    },
    onSuccess: (progressData) => {
      invalidateCalorieStatistics();
      queryClient.setQueryData<ProgressQueryState>(QueryKeys.API.PROGRESS, (old) => {
        return old ? { ...old, ...progressData } : progressData;
      });
    }
  });

  const upsertProgress = useCallback(
    async (params: upsertProgressParams) => {
      const progressData = await upsertProgressMutation.mutateAsync(params);
      return progressData;
    },
    [upsertProgressMutation]
  );

  const setCaloriePlan = useCallback(
    async (planType: PlanType) => {
      const progressData = await setCaloriePlanMutation.mutateAsync(planType);
      return progressData;
    },
    [setCaloriePlanMutation]
  );

  const getProgress = useCallback(async () => {
    const { data: progressDate } = await refetch({ throwOnError: true });
    return progressDate || null;
  }, [refetch]);

  return {
    getProgress,
    upsertProgress,
    setCaloriePlan,
    progress: data || null,
    isLoading,
    isUpsertingProgress: upsertProgressMutation.isPending,
    error
  };
}
