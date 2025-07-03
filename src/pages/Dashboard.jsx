import { useState, useEffect } from "react";
import { LogOut, CalendarPlus, LayoutList } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventCard";
import EventDetail from "@/components/EventDetail"; 
import { Navigate } from "react-router-dom";

import bg2 from "@/assets/bg2.jpg"

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { events, allEvents } = useEvent();
  const [view, setView] = useState("events");
  const [selectedEventId, setSelectedEventId] = useState(null); 

  useEffect(() => {
    allEvents();
  }, []);
  
    const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }


  return (
    <div className="flex min-h-screen" style={{
        backgroundImage: `url(${bg2})`}} >
      <div className="w-64  backdrop-blur-sm border-r px-4 py-6 space-y-8 shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name?.toUpperCase() || "User")}`} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{user?.name?.toUpperCase()}</p>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-base font-semibold text-gray-700">🎉 Event Panel</h1>
        </div>

        <div className="space-y-2 text-sm font-medium">
          <button
            className={`flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 transition ${view === "events" && !selectedEventId ? "bg-gray-200 font-semibold" : ""}`}
            onClick={() => {
              setSelectedEventId(null);
              setView("events");
            }}
          >
            <LayoutList size={18} className="mr-3" />
            All Events
          </button>

          <button
            className={`flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 transition ${view === "add-event" ? "bg-gray-200 font-semibold" : ""}`}
            onClick={() => {
              setSelectedEventId(null);
              setView("add-event");
            }}
          >
            <CalendarPlus size={18} className="mr-3" />
            Add Event
          </button>

          <button onClick={logout} className="flex items-center w-full px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 mt-10">
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {selectedEventId ? <EventDetail id={selectedEventId} /> : view === "events" ? <EventList  onSelect={(id) => setSelectedEventId(id)} /> : <EventForm />}
      </div>
    </div>
  );
}
