import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("escrow_admin_token");
    if (token) {
      setIsAuthenticated(true);
      setUser({ email: localStorage.getItem("escrow_admin_email") });
    }
  }, []);

  const login = (email, password) => {
    // Simulate login validation
    if (
      /\S+@\S+\.\S+/.test(email) &&
      typeof password === "string" && password.length >= 8
    ) {
      localStorage.setItem("escrow_admin_token", "mock-token");
      localStorage.setItem("escrow_admin_email", email);
      setIsAuthenticated(true);
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("escrow_admin_token");
    localStorage.removeItem("escrow_admin_email");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

