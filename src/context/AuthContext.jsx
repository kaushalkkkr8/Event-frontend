import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/pages/Dashboard";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate=useNavigate()


  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/auth/user_profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.status) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      logout(); // Clear invalid token
    }
  };

  // 👇 Automatically load user if token exists
  useEffect(() => {
    getProfile();
  }, []);

   const signUp = async (formData) => {
    try {
      const res = await api.post("/auth/signup", formData);
  
      navigate('/')
    } catch (err) {
      throw err?.response?.data?.message || "Signup failed";
    }
  };

  const logIn = async (formData) => {
    try {

    const res = await api.post("/auth/login", formData); 

    if (res?.data?.status) {
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      navigate("/eventPage");
    } else {
      throw "Login unsuccessful"; 
    }

  } catch (err) {
      throw err?.response?.data?.message || "Login failed";
    }
  };
    const logout = () => {
    localStorage.removeItem("token");   // Remove JWT
    setUser(null);                      // Clear user state
    navigate("/");                      // Redirect to login page
  };

  return <AuthContext.Provider value={{ user, signUp,logIn,logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
