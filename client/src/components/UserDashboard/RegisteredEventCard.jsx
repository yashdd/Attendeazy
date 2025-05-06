import React from "react";
import QRCode from "react-qr-code";
import ReviewModal from "../ReviewModal";
import { useNavigate } from "react-router-dom";

// export default function RegisteredEventCard({ event, loggedInUserId }) {
//   const userEntry = event.registeredUsers?.find(
//     (entry) => entry.userId === loggedInUserId || entry.userId?._id === loggedInUserId
//   );

//   const ticketCount = userEntry?.quantity || 1;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//       <h2 className="text-xl font-bold text-indigo-700 mb-2">{event.title}</h2>
//       <p className="text-gray-600">📅 {event.date}</p>
//       <p className="text-gray-600">📍 {event.location}</p>

//       <div className="mt-4">
//         <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
//           Registered
//         </span>
//         <p className="text-gray-700 mt-2">
//           🎟️ Tickets Booked: <span className="font-semibold">{ticketCount}</span>
//         </p>
//       </div>

//       <div className="mt-4">
//         <p className="text-sm text-gray-500 mb-1">Scan your ticket QR:</p>
//         <QRCode value={`attendeazy-event-ticket-${event._id}`} size={100} />
//       </div>
//     </div>
//   );
// }


// export default function RegisteredEventCard({ event, quantity, attended }) {
//   const eventDatePassed = new Date(event.date) < new Date();

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//       <h2 className="text-xl font-bold text-indigo-700 mb-2">{event.title}</h2>
//       <p className="text-gray-600">📅 {event.date}</p>
//       <p className="text-gray-600">📍 {event.location}</p>

//       <div className="mt-2 text-sm text-gray-800">
//         🎟️ <span className="font-semibold">Tickets:</span> {quantity}
//       </div>

//       {attended && (
//         <div className="mt-2">
//           <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
//             Attended
//           </span>
//         </div>
//       )}

//       <div className="mt-4">
//         <p className="text-sm text-gray-500 mb-1">Scan your ticket QR:</p>
//         <QRCode
//           value={`attendeazy-event-ticket-${event._id}`}
//           size={100}
//         />
//       </div>

//       {attended && eventDatePassed && (
//         <div className="mt-4">
//           <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
//             Leave a Review
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";

export default function RegisteredEventCard({ event, quantity, attended, userId }) {
  const [showReview, setShowReview] = useState(false);
  const eventDatePassed = new Date(event.date) < new Date();
  const navigate = useNavigate();
  console.log(`QR: attendeazy|event:${event._id}|user:${userId}|qty:${quantity}`);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-2">{event.title}</h2>
      <p className="text-gray-600">📅 {event.date}</p>
      <p className="text-gray-600">📍 {event.location}</p>
      <p className="text-sm text-gray-800 mt-1">🎟️ Tickets: {quantity}</p>
      <button className="mt-4 text-indigo-600 text-sm underline" onClick={() => navigate(`/events/${event._id}`)} >  View Event Details  </button>

      {attended && (
        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 mt-2 rounded-full">
          Attended
        </span>
      )}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-1 pl-3">Scan your ticket QR:</p>
        <QRCode value={`attendeazy|event:${event._id}|user:${userId}|qty:${quantity}`} size={100} />
        </div>
      {attended && eventDatePassed && (
        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          onClick={(e) => {
            e.preventDefault();      
            e.stopPropagation();     
            setShowReview(true);     
          }}
        >
          Leave a Review
        </button>
      )}

      {showReview && (
        <ReviewModal eventId={event._id} onClose={() => setShowReview(false)} />
      )}
    </div>
  );
}
