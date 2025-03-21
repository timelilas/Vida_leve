import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateMealParams, UpdateMealParams } from "./types";
import { httpMealService } from "../../services/meal";
import { useCallback } from "react";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { queryClient } from "../../libs/react-query/queryClient";
import { calculateMealCalories } from "../../@core/entities/meal/helpers";
import { MealType } from "../../@core/entities/@shared/mealType/type";

interface UseMealParams {
  date?: Date;
  meals?: {
    refetchOnMount?: boolean;
    disabled?: boolean;
  };
}

export function useMeal(params?: UseMealParams) {
  const isoDate = (params?.date || new Date()).toISOString().split("T")[0];

  const mealsQuery = useQuery({
    queryKey: QueryKeys.DATABASE.MEALS(isoDate),
    enabled: !params?.meals?.disabled,
    refetchOnMount: params?.meals?.refetchOnMount,
    retry: false,
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await httpMealService.getMeals(isoDate);
      return data;
    },
  });

  const createMealMutation = useMutation({
    mutationFn: async (params: CreateMealParams) => {
      const { data: CreatedMeal } = await httpMealService.createMeal(params);
      return CreatedMeal;
    },
    onSuccess: (createdMeal) => {
      const isoDate = createdMeal.date.split("T")[0];
      queryClient.invalidateQueries({
        queryKey: QueryKeys.DATABASE.MEALS(isoDate),
      });
    },
  });

  const updateMealMutaiton = useMutation({
    mutationFn: async (params: UpdateMealParams) => {
      const { data: updatedMeal } = await httpMealService.updateMeal({
        id: params.mealId,
        foods: params.foods,
      });
      return updatedMeal;
    },
    onSuccess: (updatedMeal) => {
      const isoDate = updatedMeal.date.split("T")[0];
      queryClient.invalidateQueries({
        queryKey: QueryKeys.DATABASE.MEALS(isoDate),
      });
    },
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

  const calculateCalorieConsumption = () => {
    const calorieConsumption: Record<MealType | "total", number> = {
      "cafe-da-manha": 0,
      lanche: 0,
      almoco: 0,
      jantar: 0,
      outro: 0,
      total: 0,
    };

    for (const meal of mealsQuery.data || []) {
      const caloiresConsumed = calculateMealCalories(meal.foods);
      calorieConsumption[`${meal.type}`] += caloiresConsumed;
      calorieConsumption.total += caloiresConsumed;
    }

    return calorieConsumption;
  };

  return {
    meals: mealsQuery.data || [],
    isLoading: mealsQuery.isLoading,
    error: mealsQuery.error,
    calorieConsumption: calculateCalorieConsumption(),
    createMeal,
    updateMeal,
  };
}
