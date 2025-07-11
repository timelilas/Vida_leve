import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateMealParams, UpdateMealParams } from "./types";
import { httpMealService } from "../../services/meal";
import { useCallback } from "react";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { queryClient } from "../../libs/react-query/queryClient";
import { calculateMealCalories } from "../../@core/entities/meal/helpers";
import { MealType } from "../../@core/entities/@shared/mealType/type";
import { invalidateCalorieStatistics } from "../../libs/react-query/helpers";

interface UseMealParams {
  date?: Date;
  meals?: {
    refetchOnMount?: boolean;
  };
}

export function useMeal(params?: UseMealParams) {
  const isoDate = (params?.date || new Date()).toISOString().split("T")[0];

  const mealsQuery = useQuery({
    queryKey: QueryKeys.API.MEALS(isoDate),
    refetchOnMount: params?.meals?.refetchOnMount,
    retry: 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await httpMealService.getMeals(isoDate);
      return data.meals;
    }
  });

  const createMealMutation = useMutation({
    mutationFn: async (params: CreateMealParams) => {
      const { data: CreatedMeal } = await httpMealService.createMeal(params);
      return CreatedMeal;
    },
    onSuccess: (createdMeal) => {
      invalidateCalorieStatistics(createdMeal.date);
      const isoDate = createdMeal.date.split("T")[0];
      queryClient.invalidateQueries({
        queryKey: QueryKeys.API.MEALS(isoDate)
      });
    }
  });

  const updateMealMutaiton = useMutation({
    mutationFn: async (params: UpdateMealParams) => {
      const { data: updatedMeal } = await httpMealService.updateMeal({
        id: params.mealId,
        foods: params.foods
      });
      return updatedMeal;
    },
    onSuccess: (updatedMeal) => {
      invalidateCalorieStatistics(updatedMeal.date);
      const isoDate = updatedMeal.date.split("T")[0];
      queryClient.invalidateQueries({
        queryKey: QueryKeys.API.MEALS(isoDate)
      });
    }
  });

  const createMeal = useCallback(
    async (params: CreateMealParams) => {
      const createdMeal = await createMealMutation.mutateAsync(params);
      return createdMeal;
    },
    [createMealMutation]
  );

  const updateMeal = useCallback(
    async (params: UpdateMealParams) => {
      const updatedMeal = await updateMealMutaiton.mutateAsync(params);
      return updatedMeal;
    },
    [updateMealMutaiton]
  );

  const calculateDailyConsumption = () => {
    const dailyConsumption: Record<MealType | "total", number> = {
      "cafe-da-manha": 0,
      lanche: 0,
      almoco: 0,
      jantar: 0,
      outro: 0,
      total: 0
    };

    for (const meal of mealsQuery.data || []) {
      const caloiresConsumed = calculateMealCalories(meal.foods);
      dailyConsumption[`${meal.type}`] += caloiresConsumed;
      dailyConsumption.total += caloiresConsumed;
    }

    return dailyConsumption;
  };

  const fetchMeals = async () => {
    await mealsQuery.refetch();
  };

  return {
    meals: mealsQuery.data || [],
    dailyConsumption: calculateDailyConsumption(),
    isLoading: mealsQuery.isLoading,
    isFetching: mealsQuery.isFetching,
    isCreatingMeal: createMealMutation.isPending,
    isUpdatingMeal: updateMealMutaiton.isPending,
    isMealCreated: createMealMutation.isSuccess,
    isMealUpdated: updateMealMutaiton.isSuccess,
    error: mealsQuery.error,
    createMeal,
    updateMeal,
    fetchMeals
  };
}
