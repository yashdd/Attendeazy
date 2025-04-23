// src/components/user-dashboard/Sidebar.jsx

import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-6 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-8">My Account</h2>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/users/dashboard/my-tickets"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold"
              : "text-gray-600 hover:text-indigo-500"
          }
        >
          🎟️ My Tickets
        </NavLink>

        <NavLink
          to="/users/dashboard/edit-profile"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold"
              : "text-gray-600 hover:text-indigo-500"
          }
        >
          📝 Edit Profile
        </NavLink>
      </nav>
    </div>
  );
}
