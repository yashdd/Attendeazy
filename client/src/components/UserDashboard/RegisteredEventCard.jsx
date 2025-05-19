// Removed duplicate imports

// export default function RegisteredEventCard({ event, loggedInUserId }) {
//   const userEntry = event.registeredUsers?.find(
//     (entry) => entry.userId === loggedInUserId || entry.userId?._id === loggedInUserId
// Removed duplicate function definition
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function RegisteredEventCard({ event, quantity, attended, userId }) {
  const [showReview, setShowReview] = useState(false);
  const eventDatePassed = new Date(event.date) < new Date();
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const qrValue = `attendeazy|event:${event._id}|user:${userId}|qty:${quantity}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
      {/* Card Header */}
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={`${import.meta.env.VITE_BASE_URL}${event.image}`}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>

        {/* Attendance Status Badge */}
        {attended && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full shadow-sm flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Attended
            </span>
          </div>
        )}

        {/* Title Section */}
        <div className="absolute bottom-0 left-0 p-5 w-full">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{event.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <span className="flex items-center mr-3">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(event.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Event Location & Tickets */}
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-700">{event.location}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="text-sm font-medium text-indigo-600">
                {quantity} {quantity === 1 ? 'Ticket' : 'Tickets'}
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="text-xs text-gray-500 mb-2">Scan to check in:</span>
            <div className="bg-white p-2 rounded shadow-sm">
              <QRCode value={qrValue} size={80} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap gap-2 justify-between items-center">
          <button 
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors"
            onClick={() => navigate(`/events/${event._id}`)}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Event Details
          </button>

          {attended && eventDatePassed && (
            <button
              className="flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowReview(true);
              }}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Leave a Review
            </button>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowReview(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Review {event.title}</h3>
            </div>

            {/* Review form would go here */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none">
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea 
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Share your experience..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowReview(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}