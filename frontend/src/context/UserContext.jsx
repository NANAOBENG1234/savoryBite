import React, { createContext, useState, useContext } from "react";
const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const login = (userData) => { setUser(userData); setIsAuthOpen(false); };
  const logout = () => setUser(null);
  return <UserContext.Provider value={{ user, setUser, isAuthOpen, setIsAuthOpen, login, logout }}>{children}</UserContext.Provider>;
}
export function useUserContext() { return useContext(UserContext); }
