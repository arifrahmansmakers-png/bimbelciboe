"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";

import { CurrentUser } from "@/types/auth";

interface UserContextValue {
  user: CurrentUser;
}

const UserContext =
  createContext<UserContextValue | null>(null);

interface UserProviderProps {
  user: CurrentUser;
  children: ReactNode;
}

export function UserProvider({
  user,
  children,
}: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context =
    useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser harus digunakan di dalam UserProvider."
    );
  }

  return context.user;
}