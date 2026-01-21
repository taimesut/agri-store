// stores/auth/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore } from "./auth.types";
import { AuthApi } from "@/apis/auth/auth.api";

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
