 
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

 const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL}/session`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSession(data))
      .catch((err) => console.error("Session fetch failed", err));
      console.log("Session data:", session)
  }, []);
  
  const handleLogout = async () => {
    try {
      const res = await fetch(`${baseURL}/users/logout`, {
        method: "POST",
        credentials: "include", //  
      });
  
      if (res.ok) {
        alert("Logged out successfully!");
        setSession(null); 
        navigate("/login"); 
      } else {
        const err = await res.json();
        alert(err.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  };
  
  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="font-bold text-lg md:text-xl">
          AttendEazy
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="/" className="hover:text-gray-300 transition">Home</a></li>
          <li><a href="/events" className="hover:text-gray-300 transition">Events</a></li>
          <li><a href="/about" className="hover:text-gray-300 transition">About</a></li>
          <li><a href="/contact" className="hover:text-gray-300 transition">Contact</a></li>
        </ul>

        {/* Right-side actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
        {session?.email ? (
            <>
              <span className="text-gray-300 text-sm">
                {session.isUser ? "User" : "Host"}: {session.email}
              </span>
              <a href={session.isHost ? "/hosts/dashboard" : "/users/dashboard"}
                className="py-1 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition">
                Dashboard  </a>
              <button
                onClick={handleLogout}
                className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-gray-300 transition">Log In</a>
              <a
                href="/register"
                className="py-1 px-3 bg-teal-500 text-gray-900 rounded hover:bg-teal-400 transition"
              >
                Sign Up
              </a>
              <a
                href="/hostLogin"
                className="py-1 px-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
              >
                Host
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <ul className="flex flex-col space-y-1 p-4">
            <li><a href="#home" className="block hover:text-gray-300">Home</a></li>
            <li><a href="#events" className="block hover:text-gray-300">Events</a></li>
            <li><a href="#about" className="block hover:text-gray-300">About</a></li>
            <li><a href="#contact" className="block hover:text-gray-300">Contact</a></li>
          </ul>
          <div className="flex flex-col px-4 space-y-2 border-t border-gray-700 py-4">
          {session?.email ? (
              <>
                <span className="text-sm text-gray-300">
                  {session.isUser ? "User" : "Host"}: {session.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-1 rounded hover:bg-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="hover:text-gray-300">Log In</a>
                <a
                  href="/register"
                  className="py-1 px-3 bg-teal-500 text-gray-900 rounded hover:bg-teal-400 text-center"
                >
                  Sign Up
                </a>
                <a
                  href="/hostLogin"
                  className="py-1 px-3 bg-gray-700 text-white rounded hover:bg-gray-600 text-center"
                >
                  Host
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
