// src/pages/Events.jsx

import React from "react";

export default function Events() {
  // Dummy data for events
  const highlights = [
    {
      id: 1,
      title: "Mega Music Fest",
      date: "June 25, 2025",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Startup Conference 2025",
      date: "July 10, 2025",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Annual Art Expo",
      date: "August 2, 2025",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  const categories = [
    {
      name: "Music",
      events: [
        {
          id: 4,
          title: "Jazz Night Downtown",
          date: "June 29, 2025",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 5,
          title: "Rock & Roll Reunion",
          date: "July 5, 2025",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      name: "Tech",
      events: [
        {
          id: 6,
          title: "AI & Robotics Summit",
          date: "June 20, 2025",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 7,
          title: "Cloud Computing Bootcamp",
          date: "July 15, 2025",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      name: "Art",
      events: [
        {
          id: 8,
          title: "Modern Sculpture Gallery",
          date: "June 18, 2025",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 9,
          title: "Watercolor Workshop",
          date: "July 22, 2025",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
  ];

  return (
    <div className="pt-16">
      {/* Because navbar is fixed, offset content by ~4rem (16) */}
      
      {/* ===== Highlights Section ===== */}
      <section className="bg-gray-100 py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Event Highlights
        </h2>
        <div className="max-w-6xl mx-auto overflow-x-auto">
          {/* We’ll do a horizontal scroll container in small screens */}
          <div className="flex space-x-4">
            {highlights.map(event => (
              <div
                key={event.id}
                className="min-w-[300px] bg-white shadow-md rounded-md overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-700">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Categories Section ===== */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Browse by Category
          </h2>

          {categories.map((category) => (
            <div key={category.name} className="mb-10">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.events.map((event) => (
                  <div key={event.id} className="bg-gray-50 shadow-md rounded-md">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-t-md"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-md text-gray-800">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500">{event.date}</p>
                      <button className="mt-3 inline-block bg-gray-900 text-white py-1 px-3 rounded hover:bg-gray-800 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
