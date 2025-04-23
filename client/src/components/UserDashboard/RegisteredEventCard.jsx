import React from "react";
import QRCode from "react-qr-code";

export default function RegisteredEventCard({ event }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-indigo-700 mb-2">{event.title}</h2>
      <p className="text-gray-600">📅 {event.date}</p>
      <p className="text-gray-600">📍 {event.location}</p>

      <div className="mt-4">
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          Registered
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-1">Scan your ticket QR:</p>
        <QRCode
          value={`attendeazy-event-ticket-${event._id}`}
          size={100}
        />
      </div>
    </div>
  );
}
