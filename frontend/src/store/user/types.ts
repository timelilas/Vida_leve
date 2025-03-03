import { UserProps } from "../../@core/entities/user/type";

export interface UserStoreState {
  isLogged: boolean;
  data: Omit<UserProps, "password" | "birthDate"> & {
    birthDate: string | null;
  };
}

export interface UserStoreActions {
  setUser(data: UserStoreState["data"]): void;
}

export type UserStore = UserStoreState & UserStoreActions;
