"use client";

import { createContext, useContext } from "react";

import { CurrentUser } from "@/types/auth";

interface UserContextType {
  user: CurrentUser;
}

const UserContext =
  createContext<UserContextType | null>(null);

interface Props {
  user: CurrentUser;
  children: React.ReactNode;
}

export function UserProvider({
  user,
  children,
}: Props) {
  return (
    <UserContext.Provider
      value={{ user }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser harus digunakan di dalam UserProvider."
    );
  }

  return context;
}