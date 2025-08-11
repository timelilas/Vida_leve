import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../constants/reactQueryKeys";
import { httpUserService } from "../../services/api/user";
import { UpdateUserProfileParams, SetProfileImageParams, UserQueryState } from "./types";
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
  imageUrl: null,
  registrationDate: ""
};

export function useUser(params?: UseUserParams) {
  const { data, isLoading, error, refetch } = useQuery<UserQueryState>({
    queryKey: QueryKeys.API.USER,
    enabled: params?.enabled,
    refetchOnMount: params?.refetchOnMount,
    refetchOnWindowFocus: false,
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

  const setProfileImageMutation = useMutation({
    mutationFn: async (params: SetProfileImageParams) => {
      const { data } = await httpUserService.setProfileImage({ data: params.data });
      return data.imageUrl;
    },
    onSuccess: (imageUrl) => {
      queryClient.setQueryData<UserQueryState>(QueryKeys.API.USER, (old) => {
        return old ? { ...old, imageUrl } : old;
      });
    }
  });

  const deleteProfileImageMutation = useMutation({
    mutationFn: async () => {
      await httpUserService.deleteProfileImage();
    },
    onSuccess: () => {
      queryClient.setQueryData<UserQueryState>(QueryKeys.API.USER, (old) => {
        return old ? { ...old, imageUrl: null } : old;
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

  const setProfileImage = useCallback(
    async (params: SetProfileImageParams) => {
      await setProfileImageMutation.mutateAsync(params);
    },
    [setProfileImageMutation]
  );

  const deleteProfileImage = useCallback(async () => {
    await deleteProfileImageMutation.mutateAsync();
  }, [deleteProfileImageMutation]);

  const getUserProfile = useCallback(async () => {
    const user = await refetch({ throwOnError: true });
    return user.data;
  }, [refetch]);

  return {
    getUserProfile,
    setProfileImage,
    updateUserProfile,
    deleteProfileImage,
    user: data || initialData,
    isLoading,
    error,
    isUpdatingProfile: updateUserProfileMutation.isPending,
    isDeletingProfileImage: deleteProfileImageMutation.isPending,
    isSettingProfileImage: setProfileImageMutation.isPending
  };
}
