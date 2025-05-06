import { useEffect, useState } from "react";
import EventCard from "../EventCard";
export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/users/my-registered-events`, {
          credentials: "include",
        });
        console.log(res)

        const data = await res.json();
        if (res.ok) {
          setEvents(data.events || []);
        } else {
          console.error(data.message || "Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading your events...</div>;
  }

  if (events.length === 0) {
    return <div>No events registered yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-25">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
