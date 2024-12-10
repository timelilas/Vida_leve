import { UserProps } from "../../@core/user/user";

export interface UserStoreState {
  isLogged: boolean;
  status: "idle" | "loading" | "fulfilled";
  data: Omit<UserProps, "password" | "birthDate"> & {
    birthDate: string | null;
  };
}

export interface UserStoreActions {
  setUser(data: UserStoreState["data"]): void;
}

export type UserStore = UserStoreState & UserStoreActions;
