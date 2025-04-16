import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventCard from "./EventCard";

export default function Events() {
  const [highlights, setHighlights] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

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

  // Filter events based on search term and selected category
  const getFilteredCategories = () => {
    if (selectedCategory === "all" && !searchTerm) {
      return categories;
    }
    
    return categories.map(category => {
      // If a specific category is selected, only show events from that category
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

  const filteredCategories = getFilteredCategories();
  const allCategoryNames = ["all", ...categories.map(c => c.name)];

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Banner with Parallax Effect */}
      {/* Hero Banner with Improved Aesthetics */}
{/* Hero Banner with Improved Aesthetics */}
<section className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16 px-4 overflow-hidden">
  {/* Subtle Decorative Elements */}
  <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
  <div className="hidden md:block absolute -top-10 right-10 w-64 h-64 bg-white opacity-10 rounded-full"></div>
  <div className="hidden md:block absolute -bottom-20 left-10 w-80 h-80 bg-white opacity-10 rounded-full"></div>
  
  <div className="max-w-6xl mx-auto relative z-10">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Discover Incredible <span className="text-teal-200">Events</span>
        </h1>
        <p className="text-lg opacity-90 mb-6 max-w-lg">
          Find the perfect events that match your interests and connect with like-minded people
        </p>
        
        {/* Improved Search Bar */}
        <div className="relative max-w-md">
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
      
      <div className="hidden md:block">
        <img 
          src="/api/placeholder/600/400" 
          alt="Events illustration" 
          className="rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
        />
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
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                      View all
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.events.map((event) => (
                      <Link 
                        to={isHost ? `/hosts/dashboard/my-events/${event._id}` : `/events/${event._id}`} 
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

      {/* CTA Section with Background Pattern */}
      {(!isHost && !isUser) && (
        <section className="bg-gradient-to-r from-blue-500 to-teal-400 py-16 px-4 relative overflow-hidden">
          {/* Background Pattern */}
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
                href="/hostRegister"
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