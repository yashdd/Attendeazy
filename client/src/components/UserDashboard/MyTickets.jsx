import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RegisteredEventCard from "./RegisteredEventCard";
import { Link } from "react-router-dom";

export default function MyTickets() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStripeRedirect = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      const eventId = params.get("eventId");  
      const quantity = params.get("quantity");

      if (sessionId && eventId && quantity) {
        try {
          const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
          const res = await fetch(`${baseURL}/users/register-event`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId, quantity }),
          });

          const data = await res.json();
          if (res.ok) {
            toast.success("Ticket booked successfully! 🎟️");
            // localStorage.removeItem("eventId"); // Optional cleanup if you want
            navigate("/users/dashboard/my-tickets", { replace: true }); // Remove session_id from URL
          } else {
            toast.error(data.message || "Failed to register event");
          }
        } catch (err) {
          console.error("Registration after payment error:", err);
          toast.error("Server error during event registration");
        }
      }
    };

    handleStripeRedirect();
  }, [location, navigate]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        // const res = await fetch(`${baseURL}/users/my-registered-events`, {
        //   credentials: "include",
        // });
        const res = await fetch(`${baseURL}/tickets/my`, {
          credentials: "include",
        });
        
        const data = await res.json();
        console.log("Data fetched:", data); // Debugging line
        if (res.ok) {
            setEvents(data); 
          } else {
          console.error("Failed to fetch registered events:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading your tickets...</div>;
  }

  return (
    <div className="pt-20 px-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">My Tickets</h1>

      {events.length === 0 ? (
        <div className="text-center text-gray-600">No events registered yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {events.map((ticket, idx) => {
  const { event, quantity, attended, userId } = ticket;
  return (
    // <Link to={`/events/${event._id}`} key={event._id || idx}>
      <RegisteredEventCard
        event={event}
        quantity={quantity}
        attended={attended}
        userId={userId}
      />
    // </Link>
      );
      })}
        </div>
      )}
    </div>
  );
}
