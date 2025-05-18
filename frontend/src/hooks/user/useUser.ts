import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpUserService } from "../../services/user";
import { UpdateUserProfileParams, UserQueryState } from "./types";
import { queryClient } from "../../libs/react-query/queryClient";
import { useCallback } from "react";

interface UseUserParams {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

const initialData: UserQueryState = {
  id: 0,
  email: "",
  name: "",
  phone: "",
  birthDate: "",
  gender: null,
  registrationDate: ""
};

export function useUser(params?: UseUserParams) {
  const { data, isLoading, error, refetch } = useQuery<UserQueryState>({
    queryKey: QueryKeys.API.USER,
    enabled: params?.enabled,
    refetchOnMount: params?.refetchOnMount,
    queryFn: async () => {
      const { data } = await httpUserService.getProfile();
      return data;
    }
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: async (params: UpdateUserProfileParams) => {
      const { name, phone, gender, birthDate } = params;
      const { data: updatedUser } = await httpUserService.updateProfile({
        name,
        phone,
        gender,
        birthDate
      });
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserQueryState>(QueryKeys.API.USER, (old) => {
        return old ? { ...old, ...updatedUser } : updatedUser;
      });
    }
  });

  const updateUserProfile = useCallback(
    async (params: UpdateUserProfileParams) => {
      const updatedProfile = await updateUserProfileMutation.mutateAsync(params);
      return updatedProfile;
    },
    [updateUserProfileMutation]
  );

  const getUserProfile = useCallback(async () => {
    const user = await refetch({ throwOnError: true });
    return user.data;
  }, [refetch]);

  return {
    getUserProfile,
    updateUserProfile,
    user: data || initialData,
    isLoading,
    error,
    isUpdatingProfile: updateUserProfileMutation.isPending
  };
}
