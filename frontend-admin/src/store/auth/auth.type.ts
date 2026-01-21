// stores/auth/auth.types.ts
export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setAuth: (payload: User) => void;
  logout: () => void;
}

export type AuthStore = AuthState & AuthActions;
