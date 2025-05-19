import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useLocation } from "react-router-dom";

export default function Events() {
  const [highlights, setHighlights] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  if (categoryParam) {
    setSelectedCategory(categoryParam);
  }
}, [location.search]);

  useEffect(() => {
    const fetchSessionAndEvents = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        
        // Step 1: Get session info
        const sessionRes = await fetch(`${baseURL}/session`, {
          credentials: "include",
        });
        const sessionData = await sessionRes.json();
        if (sessionRes.ok) {
          setIsHost(sessionData.isHost === true);
          setIsUser(sessionData.isUser === true);
        }
        
        // Step 2: Fetch events
        const res = await fetch(`${baseURL}/events`);
        const data = await res.json();
        
        if (res.ok) {
          setHighlights(data.highlights);
          setCategories(data.categories);
        } else {
          console.error("Error fetching events:", data.message);
        }
      } catch (err) {
        console.error("Server error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSessionAndEvents();
  }, []);

  const getFilteredCategories = () => {
    if (selectedCategory === "all" && !searchTerm) {
      return categories;
    }
    
    return categories.map(category => {
      if (selectedCategory !== "all" && selectedCategory !== category.name) {
        return { ...category, events: [] };
      }
      
      // Filter events by search term if one exists
      const filteredEvents = searchTerm 
        ? category.events.filter(event => 
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        : category.events;
        
      return { ...category, events: filteredEvents };
    });
  };

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing events for you...</p>
        </div>
      </div>
    );
  }
const EventsIllustration = () => (
  <svg 
    viewBox="0 0 400 300" 
    className="w-full h-auto rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
  >
    {/* Background gradient */}
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f9ff" />
        <stop offset="100%" stopColor="#e0f2fe" />
      </linearGradient>
      <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="400" height="300" fill="url(#bgGradient)" rx="12" />
    
    {/* Floating decorative elements */}
    <circle cx="70" cy="50" r="3" fill="#06b6d4" opacity="0.3" />
    <circle cx="340" cy="80" r="2" fill="#0891b2" opacity="0.4" />
    <circle cx="60" cy="200" r="2.5" fill="#0e7490" opacity="0.3" />
    <circle cx="360" cy="220" r="3" fill="#06b6d4" opacity="0.2" />
    
    {/* Main calendar */}
    <rect x="80" y="60" width="120" height="140" fill="url(#calendarGradient)" rx="8" stroke="#e2e8f0" strokeWidth="1" />
    <rect x="80" y="60" width="120" height="30" fill="#0891b2" rx="8" />
    <rect x="80" y="85" width="120" height="5" fill="#0891b2" />
    
    {/* Calendar header */}
    <text x="140" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">December</text>
    
    {/* Calendar grid */}
    <line x1="95" y1="100" x2="95" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="110" y1="100" x2="110" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="125" y1="100" x2="125" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="140" y1="100" x2="140" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="155" y1="100" x2="155" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="170" y1="100" x2="170" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="185" y1="100" x2="185" y2="190" stroke="#e2e8f0" strokeWidth="0.5" />
    
    <line x1="80" y1="115" x2="200" y2="115" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="80" y1="130" x2="200" y2="130" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="80" y1="145" x2="200" y2="145" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="80" y1="160" x2="200" y2="160" stroke="#e2e8f0" strokeWidth="0.5" />
    <line x1="80" y1="175" x2="200" y2="175" stroke="#e2e8f0" strokeWidth="0.5" />
    
    {/* Calendar dates */}
    <text x="87" y="112" fontSize="8" fill="#64748b">S</text>
    <text x="102" y="112" fontSize="8" fill="#64748b">M</text>
    <text x="117" y="112" fontSize="8" fill="#64748b">T</text>
    <text x="132" y="112" fontSize="8" fill="#64748b">W</text>
    <text x="147" y="112" fontSize="8" fill="#64748b">T</text>
    <text x="162" y="112" fontSize="8" fill="#64748b">F</text>
    <text x="177" y="112" fontSize="8" fill="#64748b">S</text>
    
    {/* Some example dates */}
    <text x="87" y="127" fontSize="8" fill="#374151">1</text>
    <text x="102" y="127" fontSize="8" fill="#374151">2</text>
    <text x="117" y="127" fontSize="8" fill="#374151">3</text>
    <text x="132" y="127" fontSize="8" fill="#374151">4</text>
    <text x="147" y="127" fontSize="8" fill="#374151">5</text>
    
    {/* Highlighted event date */}
    <circle cx="140" cy="142" r="6" fill="#06b6d4" />
    <text x="140" y="147" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">15</text>
    
    {/* Event cards */}
    <rect x="220" y="40" width="140" height="50" fill="url(#cardGradient)" rx="6" stroke="#e2e8f0" strokeWidth="1" />
    <rect x="225" y="45" width="6" height="40" fill="#06b6d4" rx="3" />
    <text x="240" y="60" fontSize="11" fontWeight="bold" fill="#0f172a">Music Concert</text>
    <text x="240" y="74" fontSize="9" fill="#64748b">Dec 15, 7:00 PM</text>
    <circle cx="340" cy="65" r="8" fill="#06b6d4" opacity="0.2" />
    <text x="340" y="70" textAnchor="middle" fontSize="10" fill="#0891b2">♪</text>
    
    <rect x="220" y="110" width="140" height="50" fill="url(#cardGradient)" rx="6" stroke="#e2e8f0" strokeWidth="1" />
    <rect x="225" y="115" width="6" height="40" fill="#0891b2" rx="3" />
    <text x="240" y="130" fontSize="11" fontWeight="bold" fill="#0f172a">Tech Meetup</text>
    <text x="240" y="144" fontSize="9" fill="#64748b">Dec 18, 6:30 PM</text>
    <circle cx="340" cy="135" r="8" fill="#0891b2" opacity="0.2" />
    <text x="340" y="140" textAnchor="middle" fontSize="10" fill="#0891b2">⚡</text>
    
    <rect x="220" y="180" width="140" height="50" fill="url(#cardGradient)" rx="6" stroke="#e2e8f0" strokeWidth="1" />
    <rect x="225" y="185" width="6" height="40" fill="#0e7490" rx="3" />
    <text x="240" y="200" fontSize="11" fontWeight="bold" fill="#0f172a">Art Workshop</text>
    <text x="240" y="214" fontSize="9" fill="#64748b">Dec 22, 2:00 PM</text>
    <circle cx="340" cy="205" r="8" fill="#0e7490" opacity="0.2" />
    <text x="340" y="210" textAnchor="middle" fontSize="10" fill="#0e7490">🎨</text>
    
    {/* Connecting lines */}
    <path d="M 180 142 Q 200 142 220 120" stroke="#06b6d4" strokeWidth="2" fill="none" strokeDasharray="3,3" opacity="0.5" />
    
    {/* Additional decorative elements */}
    <rect x="30" y="120" width="30" height="30" fill="#ffffff" rx="6" stroke="#e2e8f0" strokeWidth="1" />
    <circle cx="45" cy="135" r="8" fill="#f0f9ff" />
    <text x="45" y="140" textAnchor="middle" fontSize="12" fill="#0891b2">📅</text>
    
    {/* Stars */}
    <path d="M 320 40 L 322 46 L 328 46 L 323 50 L 325 56 L 320 52 L 315 56 L 317 50 L 312 46 L 318 46 Z" fill="#06b6d4" opacity="0.3" />
    <path d="M 50 250 L 52 254 L 56 254 L 53 257 L 54 261 L 50 258 L 46 261 L 47 257 L 44 254 L 48 254 Z" fill="#0891b2" opacity="0.4" />
  </svg>
);
  const filteredCategories = getFilteredCategories();
  const allCategoryNames = ["all", ...categories.map(c => c.name)];

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
 <section className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
      <div className="hidden md:block absolute -top-10 right-10 w-64 h-64 bg-white opacity-10 rounded-full"></div>
      <div className="hidden md:block absolute -bottom-20 left-10 w-80 h-80 bg-white opacity-10 rounded-full"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="max-w-md">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Discover Incredible <span className="text-teal-200">Events</span>
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Find the perfect events that match your interests and connect with like-minded people
              </p>
              
              {/* Improved Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full px-4 py-3 pl-10 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <EventsIllustration />
          </div>
        </div>
      </div>
    </section>
      {/* Category Filters */}
      <section className="py-8 px-4 bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-700 font-medium">Categories:</span>
            {allCategoryNames.map((catName) => (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === catName
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {catName === "all" ? "All Categories" : catName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section with Carousel-like Scrolling */}
      {highlights.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-l-4 border-teal-500 pl-3">
                Event Highlights
              </h2>
              <div className="flex space-x-2">
                <button 
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-6 px-2">
                  {highlights.map((event) => (
                    <div
                      key={event._id}
                      className="min-w-[300px] md:min-w-[350px] bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}${event.image}`}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                          Featured
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                        <div className="mt-3 flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {event.location || "Online"}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-teal-600 font-medium">{event.price ? `$${event.price}` : "Free"}</span>
                          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shadow overlays to indicate more content */}
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section with Grid Layout */}
      <section className="py-12 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
      Browse Events by Category
    </h2>

    {filteredCategories.every(category => category.events.length === 0) ? (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20A8 8 0 104 12a8 8 0 008 8z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {searchTerm ? 
            `No events match your search for "${searchTerm}". Try different keywords or browse all events.` : 
            "No events available in this category at the moment."}
        </p>
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
          >
            Clear search
          </button>
        )}
      </div>
    ) : (
      filteredCategories.map((category) => (
        category.events.length > 0 && (
          <div key={category.name} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 border-l-4 border-teal-500 pl-3">
                {category.name}
              </h3>
              <Link
                to={`/events?category=${encodeURIComponent(category.name)}`}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
              >
                View all
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedCategory.toLowerCase() === "all"
                ? category.events.slice(0, 3)
                : category.events
              ).map((event) => (
                <Link to={isHost ? `/hosts/dashboard/my-events/${event._id}` : `/events/${event._id}`}
                  key={event._id}
                  className="block transform transition-all duration-300 hover:-translate-y-1"
                >
                  <EventCard
                    event={event}
                    showControls={isHost}
                  />
                </Link>
              ))}
            </div>
          </div>
        )
      ))
    )}
  </div>
</section>


      {(!isHost && !isUser) && (
        <section className="bg-gradient-to-r from-blue-500 to-teal-400 py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white"></div>
            <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-white"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center text-white relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to host your own events?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Create, manage, and promote your events with our easy-to-use platform. 
              Join thousands of hosts already using AttendEazy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/hostLogin"
                className="bg-white text-gray-800 hover:bg-gray-100 py-3 px-8 rounded-md text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login as Host
              </a>
              <a
                href="/register"
                className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-8 rounded-md text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Register as Host
              </a>
            </div>
          </div>
        </section>
      )}
      
     
    </div>
  );
}