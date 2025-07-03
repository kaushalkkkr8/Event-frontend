import { createContext, useContext, useState } from "react";
import api from "@/lib/axios";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);


  const allEvents = async ({ search = "", date = "", page = 1, limit = 5 } = {}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      throw new Error("Authentication token missing");
    }

    const res = await api.get("/event", {
      params: { search, date, page, limit },
      headers: { Authorization: `Bearer ${token}` },
    });

    setEvents(res.data.events); 
    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Failed to fetch events";
  }
};


  const addEvent = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        throw new Error("Authentication token missing");
      }
      const res = await api.post("/event", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  };
  const getEventById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const res = await api.get(`/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.event;
    } catch (err) {
      throw err?.response?.data?.message || "Failed to fetch event";
    }
  };

  const register = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token missing");
      }

      const res = await api.post(`/event/register/${id}`, null, {
        headers: { authorization: `Bearer ${token}` },
      });
     
    } catch (err) {
      throw err?.response?.data?.message;
    }
  };

  return <EventContext.Provider value={{ allEvents, events, addEvent, getEventById, register }}>{children}</EventContext.Provider>;
};
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useAuth must be used within EventProvider");
  return context;
};
