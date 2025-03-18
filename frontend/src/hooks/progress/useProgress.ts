import { useMutation, useQuery } from "@tanstack/react-query";
import { ProgressQueryState, UpdateProgressParams } from "./types";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpProgressService } from "../../services/progress";
import { useCallback } from "react";
import { queryClient } from "../../libs/react-query/queryClient";
import { PlanType } from "../../@core/entities/@shared/planType/type";

interface UseProgressParams {
  queryEnabled?: boolean;
  refetchOnMount?: boolean;
}

export function useProgress(params?: UseProgressParams) {
  const { data, isLoading, error, refetch } = useQuery<ProgressQueryState>({
    queryKey: QueryKeys.DATABASE.PROGRESS,
    enabled: params?.queryEnabled ?? true,
    refetchOnMount: params?.refetchOnMount,
    queryFn: async () => {
      const { data: progressData } = await httpProgressService.getProgress();
      return progressData;
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (params: UpdateProgressParams) => {
      const { data: progressData } = await httpProgressService.upsertProgress({
        ...params,
      });
      return progressData;
    },
    onSuccess: (progressData) => {
      queryClient.setQueryData<ProgressQueryState>(
        QueryKeys.DATABASE.PROGRESS,
        (old) => {
          return old ? { ...old, ...progressData } : progressData;
        }
      );
    },
  });

  const setCaloriePlanMutation = useMutation({
    mutationFn: async (planType: PlanType) => {
      const { data: progressData } = await httpProgressService.setCaloriePlan(
        planType
      );
      return progressData;
    },
    onSuccess: (progressData) => {
      queryClient.setQueryData<ProgressQueryState>(
        QueryKeys.DATABASE.PROGRESS,
        (old) => {
          return old ? { ...old, ...progressData } : progressData;
        }
      );
    },
  });

  const upsertProgress = useCallback(
    async (params: UpdateProgressParams) => {
      const progressData = await updateProgressMutation.mutateAsync(params);
      return progressData;
    },
    [updateProgressMutation]
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
    error,
  };
}
