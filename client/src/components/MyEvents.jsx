import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const showControls = true
  const fetchMyEvents = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseURL}/events/host`, {
        credentials: "include",
        method: "GET",
      });
      console.log("Response from fetchMyEvents:", response);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to fetch events.");
        return;
      }

      setEvents(data.events);
    } catch (err) {
      console.error("Error fetching host events:", err);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${baseURL}/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Could not delete event.");
      } else {
        alert("Event deleted!");
        fetchMyEvents();
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">My Events</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading your events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any events yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link to={`/hosts/dashboard/my-events/${event._id}`} key={event._id}>
            <EventCard
              key={event._id}
              event={event}
              showControls={true}
              // onDelete={handleDelete}
              // onEdit={(e) => console.log("Edit clicked for:", e._id)} // placeholder for now
            />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
