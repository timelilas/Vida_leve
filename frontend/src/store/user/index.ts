import { create } from "zustand";
import { UserStore, UserStoreState } from "./types";

const userStoreInitialState: UserStoreState = {
  isLogged: false,
  status: "idle",
  data: {
    id: 0,
    email: "",
    name: null,
    birthDate: null,
    gender: null,
    phone: null,
  },
};

export const useUserStore = create<UserStore>((set) => ({
  ...userStoreInitialState,
  setUser: (data) => set(() => ({ data, status: "fulfilled", isLogged: true })),
}));
