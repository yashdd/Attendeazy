import React from "react";

export default function EventCard({ event, onEdit, onDelete, showControls = false }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        <div className="h-56 overflow-hidden relative">
          <img 
            src={`${import.meta.env.VITE_BASE_URL}${event.image}`}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        </div>

        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
            {event.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <span className="mr-3">📅 {formatDate(event.date)}</span>
            <span>🕒 {event.time}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-700">{event.location}</span>
            </div>
            <div className="font-medium text-lg text-green-600">${event.price}</div>
          </div>

          {showControls && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit && onEdit(event)}
                className="flex items-center justify-center px-3 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(event._id)}
                className="flex items-center justify-center px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
