
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
