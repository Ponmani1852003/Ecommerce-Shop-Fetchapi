import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { LoginPayload, RegisterPayload } from "../types/User";
import { getFromStorage, saveToStorage } from "../utils/localStorage";

interface StoredUser {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface AuthContextType {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    getFromStorage<string | null>("token", null)
  );
  const [username, setUsername] = useState<string | null>(() =>
    getFromStorage<string | null>("username", null)
  );

  async function register(payload: RegisterPayload) {
    const users = getFromStorage<StoredUser[]>("registeredUsers", []);

    const alreadyExists = users.some((u) => u.username === payload.username);
    if (alreadyExists) {
      throw new Error("Username already taken. Please choose another.");
    }

    const newUser: StoredUser = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
      firstname: payload.name.firstname,
      lastname: payload.name.lastname,
    };

    saveToStorage("registeredUsers", [...users, newUser]);
  }

  async function login(payload: LoginPayload) {
    const users = getFromStorage<StoredUser[]>("registeredUsers", []);

    const matchedUser = users.find(
      (u) => u.username === payload.username && u.password === payload.password
    );

    const isDemoUser = payload.username === "mor_2314" && payload.password === "83r5^_";

    if (!matchedUser && !isDemoUser) {
      throw new Error("Invalid username or password.");
    }

    const fakeToken = `token-${payload.username}-${Date.now()}`;
    setToken(fakeToken);
    saveToStorage("token", fakeToken);
    setUsername(payload.username);
    saveToStorage("username", payload.username);
  }

  function logout() {
    setToken(null);
    saveToStorage("token", null);
    setUsername(null);
    saveToStorage("username", null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated, register, login, logout }}>
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