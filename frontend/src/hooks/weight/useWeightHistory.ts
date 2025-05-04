import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { useCallback } from "react";
import { queryClient } from "../../libs/react-query/queryClient";
import { httpWeightHistoryService } from "../../services/weight";
import { AddWeightParams, WeightHistoryQueryState } from "./types";

interface UseWeightHistoryParams {
  limit: number;
  enabled: boolean;
}

export function useWeightHistory(props: UseWeightHistoryParams) {
  const queryKey = QueryKeys.DATABASE.WEIGHT_HISTORY;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    enabled: props.enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    retry: 1,
    queryFn: async () => {
      const { data } = await httpWeightHistoryService.getWeightHistory({
        limit: Math.min(props.limit, 20),
        offset: 0
      });
      return data;
    }
  });

  const deleteWeightMutation = useMutation({
    mutationFn: async (weightId: number) => {
      await httpWeightHistoryService.deleteWeight({
        id: weightId
      });
      return weightId;
    }
  });

  const addWeightMutation = useMutation({
    mutationFn: async (params: AddWeightParams) => {
      const isoDate = params.date.toISOString();
      const newWeight = await httpWeightHistoryService.addWeight({
        date: isoDate,
        weight: params.weight
      });
      return newWeight.data;
    },
    onSuccess: (newWeight) => {
      queryClient.setQueryData<WeightHistoryQueryState>(queryKey, (old) => {
        if (old) {
          return { ...old, weights: [newWeight, ...old.weights] };
        }
      });
    }
  });

  const fetchMoreWeights = useCallback(async () => {
    const currentState = queryClient.getQueryData<WeightHistoryQueryState>(queryKey);

    if (currentState?.hasMore === false) return;

    await queryClient.fetchQuery<WeightHistoryQueryState>({
      queryKey,
      retry: 1,
      queryFn: async () => {
        const { data: newData } = await httpWeightHistoryService.getWeightHistory({
          limit: 10,
          offset: currentState?.weights.length || 0
        });
        if (!currentState) return newData;
        return {
          hasMore: newData.hasMore,
          weights: [...currentState.weights, ...newData.weights]
        };
      }
    });
  }, [queryKey]);

  const deleteWeight = useCallback(
    async (weightId: number) => {
      await deleteWeightMutation.mutateAsync(weightId);
    },
    [deleteWeightMutation]
  );

  const addWeight = useCallback(
    async (params: AddWeightParams) => {
      await addWeightMutation.mutateAsync(params);
    },
    [addWeightMutation]
  );

  return {
    data: data || { weights: [], hasMore: true },
    isFetching,
    isLoading,
    error,
    isDeleting: deleteWeightMutation.isPending,
    fetchMoreWeights,
    deleteWeight,
    addWeight
  };
}
