import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../../constants/reactQueryKeys";
import { FoodProps } from "../../../../@core/entities/food/type";
import { httpFoodService } from "../../../../services/food";
import { queryClient } from "../../../../libs/react-query/queryClient";
import { useCallback, useDeferredValue } from "react";
import { delay, transformFoodNameIntoSlug } from "../../../../utils/helpers";

interface FoodDataState {
  hasMore: boolean;
  foods: FoodProps[];
}

interface UseFoodParams {
  limit: number;
  foodName: string;
  enabled: boolean;
}

export function useSearchFoods(params: UseFoodParams) {
  const foodSlug = transformFoodNameIntoSlug(params.foodName);
  const queryKey = QueryKeys.DATABASE.FOODS(foodSlug);

  const options = queryOptions<FoodDataState>({
    queryKey: queryKey,
    refetchIntervalInBackground: false,
    enabled: params.enabled,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      const { data } = await httpFoodService.searchFoods({
        name: foodSlug,
        limit: Math.max(params.limit, 10),
        offset: 0,
      });
      return data;
    },
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
      gcTime: options.gcTime,
      queryFn: async () => {
        const { data: newData } = await httpFoodService.searchFoods({
          name: foodSlug,
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

  return {
    foods: deferredData?.foods || [],
    hasMore: deferredData?.hasMore ?? true,
    isFetching,
    isError,
    error,
    fetchMoreFoods,
  };
}
