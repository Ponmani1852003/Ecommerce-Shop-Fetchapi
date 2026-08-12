import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { LoginPayload, LoginResponse } from "../types/User";
import { loginUser } from "../services/api";
import { getFromStorage, saveToStorage } from "../utils/localStorage";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    getFromStorage<string | null>("token", null)
  );

  async function login(payload: LoginPayload) {
    const response: LoginResponse = await loginUser(payload);
    setToken(response.token);
    saveToStorage("token", response.token);
  }

  function logout() {
    setToken(null);
    saveToStorage("token", null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}