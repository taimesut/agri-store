import { create } from "zustand";
import { AuthApi } from "../apis/auth.api";

interface CurrentUser {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}

interface CurrentUserStore {
  currentUser: CurrentUser | null;
  fetchCurrentUser: () => Promise<CurrentUser | null>;
  logout: () => Promise<void | null>;
}

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null,
  fetchCurrentUser: async () => {
    try {
      const res = await AuthApi.GetCurrentUser();
      const data: CurrentUser = res.data.user;
      set({ currentUser: data });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  logout: async () => {
    try {
      await AuthApi.Logout();
      set({ currentUser: null });
      return null;
    } catch (error) {
      console.log(error);
    }
  },
}));
