import React, { createContext, useContext, useState } from "react";
import { api, getSessionUser, setSession, clearSession, onAuthChange } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSessionUser());

  if (!AuthProvider._subscribed) {
    AuthProvider._subscribed = true;
    onAuthChange(() => setUser(getSessionUser()));
  }

  async function login(credentials) {
    const data = await api.post("/auth/login", credentials);
    setSession(data);
    return data.user;
  }

  function logout() {
    clearSession();
  }

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
