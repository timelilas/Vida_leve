import { useMutation, useQuery } from "@tanstack/react-query";
import { CalorieConsumptionQueryState, CreateMealParams } from "./types";
import { httpMealService } from "../../services/meal";
import { useCallback } from "react";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { queryClient } from "../../libs/react-query/queryClient";
import { convertDateToLocalDateData } from "../../utils/helpers";

interface UseMealParams {
  calorieConsumption?: {
    date?: Date;
    refetchOnMount?: boolean;
  };
}

const initialData: CalorieConsumptionQueryState = {
  "cafe-da-manha": 0,
  lanche: 0,
  almoco: 0,
  jantar: 0,
  outro: 0,
  total: 0,
};

export function useMeal(params?: UseMealParams) {
  const { year, month, day } = convertDateToLocalDateData(
    params?.calorieConsumption?.date || new Date()
  );
  const localDatetime = new Date(year, month, day);
  const isoDate = localDatetime.toISOString().split("T")[0];

  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.DATABASE.CALORIE_CONSUMPTION(isoDate),
    enabled: params?.calorieConsumption?.date ? true : false,
    refetchOnMount: params?.calorieConsumption?.refetchOnMount,
    retry: false,
    queryFn: async () => {
      if (!params?.calorieConsumption?.date) return { ...initialData };
      return (await httpMealService.getDailyCalorieConsumption(isoDate)).data;
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
        queryKey: QueryKeys.DATABASE.CALORIE_CONSUMPTION(isoDate),
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

  return {
    dailyCalorieConsumption: {
      data: data || initialData,
      isLoading,
      error,
    },
    createMeal,
  };
}
