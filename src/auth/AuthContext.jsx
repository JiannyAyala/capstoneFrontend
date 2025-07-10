import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const register = async (credentials) => {
    try {
      const response = await fetch(API + "/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json(); // will break if backend sends raw token
      console.log("REGISTER RESPONSE:", result);

      if (!response.ok) throw Error(result.error || "Failed to register");

      setToken(result.token); // might be undefined if backend is still sending string
    } catch (err) {
      console.error("Register Error:", err.message);
      throw err;
    }
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Failed to login");

    setToken(result.token);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, register, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {token && <NavigateOnAuth token={token} />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

function NavigateOnAuth({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/workouts");
    }
  }, [token]);

  return null;
}
