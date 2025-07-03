import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

const EventList = ({ user, onSelect }) => {
  const { register, allEvents } = useEvent();

  const [registeredIds, setRegisteredIds] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(null);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const EVENTS_PER_PAGE = 5;

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryDate = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";

      const res = await allEvents({
        search,
        date: queryDate,
        page,
        limit: EVENTS_PER_PAGE,
      });
      setEvents(res.events);
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, date, page]);

  const eventDates = events.map((e) => new Date(e.date));

  const handleRegister = async (eventId) => {
    try {
      await register(eventId);
      setRegisteredIds((prev) => [...prev, eventId]);
      fetchData();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Upcoming Events</h1>

      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-60 bg-white"
        />
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setPage(1);
            setDate(d);
          }}
          className="rounded-md border transform scale-[0.85] origin-top"
          modifiers={{ highlighted: eventDates }}
          modifiersClassNames={{
            highlighted: "bg-emerald-400 text-white font-bold rounded-full",
          }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {loading ? (
          <div className="col-span-2 flex justify-center items-center h-48">
            <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600 col-span-2">No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event?._id} className="border p-3 rounded-lg shadow-md bg-white/90 backdrop-blur-sm flex flex-col justify-between text-sm">
              {event?.image?.imageURL && <img alt={event?.image?.originalName || "event-image"} src={event?.image?.imageURL} className="w-full h-40 object-cover rounded-md mb-3" />}

              <div>
                <h2 className="text-md font-semibold">{event?.title}</h2>
                <p className="text-xs text-gray-600 mt-1">{event?.about}</p>
                <div className="text-xs text-gray-500 mt-2">
                  📍 {event?.location} | 📅 {new Date(event?.date).toLocaleDateString("en-IN")}
                </div>
              </div>

              <div className="flex justify-between mt-3">
                <Button variant="outline" size="sm" onClick={() => onSelect(event?._id)}>
                  Details
                </Button>

                {(() => {
                  const isRegistered = event?.attendees?.some((att) => att._id === user?._id);

                  return (
                    <Button
                      size="sm"
                      className={isRegistered ? "cursor-not-allowed opacity-50" : "cursor-pointer bg-green-600 hover:bg-green-700 text-white"}
                      disabled={isRegistered}
                      onClick={() => handleRegister(event?._id)}
                    >
                      {isRegistered ? "Already Registered" : "Register"}
                    </Button>
                  );
                })()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button variant="outline" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span className="self-center text-gray-700">Page {page}</span>
        <Button variant="outline" onClick={() => setPage((prev) => prev + 1)} disabled={page >= totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default EventList;
