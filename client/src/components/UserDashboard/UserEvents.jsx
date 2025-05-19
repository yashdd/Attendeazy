import { useEffect, useState } from "react";
import RegisteredEventCard from "./RegisteredEventCard";


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

  const now = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= now);
  const attendedEvents = events.filter((event) => new Date(event.date) < now);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="flex items-center">
          <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin mr-3"></div>
          <p>Loading your events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No events yet</h3>
        <p className="text-gray-500 text-sm">You haven't registered for any events yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4 pb-8">
      {/* Page Title */}
      <div className="mb-6 mt-8">
        <h1 className="text-xl font-semibold text-gray-800">My Events</h1>
        <p className="text-gray-500 text-sm">Your upcoming and past event registrations</p>
      </div>
      
      {/* Upcoming Events Section */}
      <div>
        <h2 className="flex items-center text-lg font-medium text-gray-800 mb-4">
          <span className="text-blue-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          Upcoming Events 
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {upcomingEvents.length}
          </span>
        </h2>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => (
              <RegisteredEventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
            <p className="text-gray-500 text-sm">You don't have any upcoming events.</p>
          </div>
        )}
      </div>

      {/* Attended Events Section */}
      <div>
        <h2 className="flex items-center text-lg font-medium text-gray-800 mb-4">
          <span className="text-green-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          Attended Events
          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {attendedEvents.length}
          </span>
        </h2>
        
        {attendedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {attendedEvents.map((event) => (
              <RegisteredEventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
            <p className="text-gray-500 text-sm">No attended events yet. Join some events!</p>
          </div>
        )}
      </div>
    </div>
  );
}