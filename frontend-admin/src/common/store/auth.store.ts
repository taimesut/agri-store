// stores/auth/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/modules/user/schema";
import { AuthApi } from "@/modules/auth/api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (payload: User) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: async () => {
        await AuthApi.logout();
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // key localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
