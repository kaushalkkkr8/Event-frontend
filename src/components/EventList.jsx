import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";

const EventList = ({  onSelect }) => {
  const { events, register,allEvents } = useEvent();

  
    const { user } = useAuth();
 const [registeredIds, setRegisteredIds] = useState([]);

  if (!events || events.length === 0) {
    return <p className="text-center text-gray-600">No events found.</p>;
  }

  const handleRegister = async (eventId) => {
    try {
      await register(eventId);
      setRegisteredIds((prev) => [...prev, eventId]);
      await allEvents(); 
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };


  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      {events?.map((event) => (
        <div key={event?._id} className="border p-4 rounded-xl shadow-md bg-white/90 backdrop-blur-sm flex flex-col justify-between">
          {event?.image?.imageURL &&
           <img  alt={event?.image?.originalName || "event-image"} src={event?.image?.imageURL} className="w-full h-48 object-cover rounded-lg mb-4" />}

          <div>
            <h2 className="text-lg font-semibold">{event?.title}</h2>
            <p className="text-sm text-gray-600">{event?.description}</p>
            <div className="text-xs text-gray-500 mt-2">
              📍 {event?.location} | 📅{" "}
              {new Date(event?.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => onSelect(event?._id)}>
              Details
            </Button>
          <Button
            className={event?.attendees?.includes(user?._id) ? "cursor-not-allowed opacity-50" : "mt-4 bg-green-600 hover:bg-green-700 text-white"}
            disabled={event?.attendees?.includes(user?._id)}
            onClick={() => handleRegister(event?._id)}
          >
            {event?.attendees?.includes(user?._id) ? "Already Registered" : "Register"}
          </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
