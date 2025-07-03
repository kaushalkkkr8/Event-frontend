import { useEffect, useState } from "react";
import { useEvent } from "@/context/EventContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function EventDetail({ id }) {
  const { getEventById, register } = useEvent();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);

        const registered = data.attendees?.some((att) => att._id === user?._id);
        setIsRegistered(registered);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, user?._id]);

  const handleRegister = async () => {
    try {
      await register(event._id);
      setIsRegistered(true); 
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div className="w-full h-full">
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden">
        {event?.image?.imageURL && (
          <img
            src={event.image.imageURL}
            alt={event.image.originalName || "Event Image"}
            className="w-full h-64 object-cover"
          />
        )}

        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-700">
          <p>{event.description}</p>
          <p>
            📍 <strong>Location:</strong> {event.location}
          </p>
          <p>
            📅 <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>

          <div className="text-sm text-gray-600">
            👤 <strong>Created By:</strong> {event.createdBy?.name} ({event.createdBy?.email})
          </div>

          <div className="text-sm text-gray-700">
            🙋‍♂️ <strong>Attendees:</strong>
            {event.attendees?.length > 0 ? (
              <ul className="list-disc ml-6 mt-1">
                {event.attendees.map((attendee) => (
                  <li key={attendee._id}>
                    {attendee.name} ({attendee.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ml-1 text-gray-500">No attendees yet.</p>
            )}
          </div>

          <Button
            className={`mt-4 text-white ${
              isRegistered
                ? "bg-gray-400 cursor-not-allowed"
                : "cursor-pointer bg-green-600 hover:bg-green-700"
            }`}
            disabled={isRegistered}
            onClick={handleRegister}
          >
            {isRegistered ? "Already Registered" : "Register"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
