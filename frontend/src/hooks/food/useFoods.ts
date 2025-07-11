import { useQuery } from "@tanstack/react-query";
import { FoodProps } from "../../@core/entities/food/type";
import { transformFoodNameIntoSlug } from "../../utils/helpers";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { useCallback } from "react";
import { queryClient } from "../../libs/react-query/queryClient";
import { httpFoodService } from "../../services/food";

interface FoodDataState {
  hasMore: boolean;
  foods: FoodProps[];
}

interface UseFoodsParams {
  limit: number;
  foodName: string;
  enabled: boolean;
}

export function useFoods(params: UseFoodsParams) {
  const foodSlug = transformFoodNameIntoSlug(params.foodName);
  const queryKey = QueryKeys.API.FOODS(foodSlug);

  const {
    data: queryData,
    isFetching,
    error
  } = useQuery<FoodDataState>({
    queryKey: queryKey,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: params.enabled,
    retry: 1,
    queryFn: async () => {
      const { data } = await httpFoodService.searchFoods({
        name: foodSlug,
        limit: Math.max(params.limit, 10),
        offset: 0
      });
      return data;
    }
  });

  const fetchMoreFoods = useCallback(async () => {
    const currentState = queryClient.getQueryData<FoodDataState>(queryKey);

    if (currentState?.hasMore === false) return;

    await queryClient.fetchQuery<FoodDataState>({
      queryKey,
      retry: 1,
      queryFn: async () => {
        const { data: newData } = await httpFoodService.searchFoods({
          name: foodSlug,
          limit: 10,
          offset: currentState?.foods.length || 0
        });
        if (!currentState) return newData;
        return {
          hasMore: newData.hasMore,
          foods: [...currentState.foods, ...newData.foods]
        };
      }
    });
  }, [queryKey, foodSlug]);

  return {
    data: { foods: queryData?.foods || [], hasMore: queryData?.hasMore || true },
    isFetching,
    error,
    fetchMoreFoods
  };
}
