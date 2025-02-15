import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../constants/reactQueryKeys";
import { FoodProps } from "../../../../@core/entities/food/type";
import { httpFoodService } from "../../../../services/food";
import { queryClient } from "../../../../libs/react-query/queryClient";
import { useCallback, useDeferredValue } from "react";

interface FoodDataState {
  hasMore: boolean;
  foods: FoodProps[];
}

export function useSearchFoods(foodName: string) {
  const queryKey = QueryKeys.DATABASE.FOODS(foodName);
  const options = queryOptions<FoodDataState>({
    queryKey: queryKey,
    enabled: false,
    gcTime: Infinity,
    refetchInterval: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: true,
    staleTime: Infinity,
  });

  const { data, isFetching, error, isError } = useQuery<FoodDataState>(options);
  const deferredData = useDeferredValue(data);

  const fetchMoreFoods = useCallback(async () => {
    const currentState = queryClient.getQueryData<FoodDataState>(queryKey);

    if (currentState?.hasMore === false) {
      return;
    }

    await queryClient.fetchQuery<FoodDataState>({
      queryKey,
      queryFn: async () => {
        const { data: newData } = await httpFoodService.searchFoods({
          name: foodName,
          limit: 5,
          offset: currentState?.foods.length || 0,
        });

        if (!currentState) return newData;

        return {
          hasMore: newData.hasMore,
          foods: [...currentState.foods, ...newData.foods],
        };
      },
    });
  }, [queryKey]);

  const fetchFoods = useCallback(
    async (limit: number) => {
      const currentState = queryClient.getQueryData<FoodDataState>(queryKey);

      if (currentState) return;

      await queryClient.fetchQuery<FoodDataState>({
        ...options,
        queryFn: async () => {
          const { data } = await httpFoodService.searchFoods({
            name: foodName,
            limit: Math.max(limit, 10),
            offset: 0,
          });
          return data;
        },
      });
    },
    [queryKey]
  );

  return {
    foods: deferredData?.foods || [],
    hasMore: deferredData?.hasMore ?? true,
    isFetching,
    isError,
    error,
    fetchFoods,
    fetchMoreFoods,
  };
}
