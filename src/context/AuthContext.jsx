import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLogin, setOpenLogin] = useState(false);

  // Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    api.get("auth/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (tokens) => {
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    const res = await api.get("auth/me/");
    setUser(res.data);

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout,openLogin, setOpenLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
