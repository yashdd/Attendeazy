// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center md:justify-between">
        {/* Left side (brand / copyright) */}
        <div className="mb-4 md:mb-0">
          <span className="font-semibold text-lg">AttendEazy</span> &copy; {new Date().getFullYear()}
        </div>

        {/* Right side (links) */}
        <div className="space-x-4">
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
          <a href="#privacy" className="hover:text-gray-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
