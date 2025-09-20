import React, { createContext, useContext, useEffect, useState } from "react";
import API from "@/api/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Save user + token in localStorage after login
  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token); // 🔥 use consistent key
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Clear session
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  // ✅ Fetch user from backend if token exists
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await API.get("/me"); // interceptor attaches token automatically
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("auth_user", JSON.stringify(res.data.user));
      } else {
        logout();
      }
    } catch (err) {
      console.error("Auth fetchUser error:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load user from localStorage or API on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
