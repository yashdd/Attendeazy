// src/components/Footer.jsx
import React from "react";

export default function Footer({ visible }) {
  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 shadow-inner z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
        <span>© {new Date().getFullYear()} AttendEazy</span>
        <div className="space-x-4">
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
          <a href="#privacy" className="hover:text-gray-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
