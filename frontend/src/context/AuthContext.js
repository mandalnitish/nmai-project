import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER ON REFRESH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .getMe()
      .then((res) => {
        if (res.success) {
          setUser(res.data);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= LOGIN ================= */
  const login = async (credentials) => {
    try {
      const res = await authAPI.login(credentials);

      if (res.success) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      }

      return res;
    } catch (err) {
      return {
        success: false,
        message: err.message || "Login failed",
      };
    }
  };

  /* ================= REGISTER ================= */
  const register = async (data) => {
    try {
      const res = await authAPI.register(data);

      if (res.success) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      }

      return res;
    } catch (err) {
      return {
        success: false,
        message: err.message || "Registration failed",
      };
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
