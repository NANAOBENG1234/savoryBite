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
    const u = data.user || {};
    if (u.role !== "admin") {
      clearSession();
      const err = new Error("Access denied: admin credentials required");
      err.status = 403;
      throw err;
    }
    setSession(data);
    return u;
  }

  function logout() {
    clearSession();
  }

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, isAdmin: !!(user && user.role === "admin"), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
