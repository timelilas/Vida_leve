import { create } from "zustand";
import { UserStore, UserStoreState } from "./types";

const initialState: UserStoreState = {
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
  ...initialState,
  setUser: (data) => set(() => ({ data, status: "fulfilled", isLogged: true })),
}));
