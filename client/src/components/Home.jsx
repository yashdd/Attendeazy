import React, { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Music");
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    // Check login status
    fetch(`${import.meta.env.VITE_BASE_URL}/session`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.isUser || data.isHost || data.isAdmin) {
          setIsLoggedIn(true);
        }
      });
    
    // Check if user is new (using localStorage)
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      setIsNewUser(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

   useEffect(() => {
      const fetchHighlights = async () => {
        try {
          const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
          
          
          // Step : Fetch events
          const res = await fetch(`${baseURL}/events`);
          const data = await res.json();
          
          if (res.ok) {
            setHighlights(data.highlights);
          } else {
            console.error("Error fetching events:", data.message);
          }
        } catch (err) {
          console.error("Server error:", err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchHighlights();
    }, []);
    console.log(highlights.map(i => i.image))
    
  const handleLoginRequired = (url) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    window.location.href = url;
  };

  return (
    <div className="pt-16">
      {/* New User Banner - Only shows for first-time visitors */}
      {isNewUser && (
        <div className="bg-blue-500 text-white p-3 text-center">
          <span className="font-medium">Welcome to AttendEazy!</span> Your journey to amazing events starts here.
          <button 
            onClick={() => setIsNewUser(false)}
            className="ml-3 text-sm bg-white text-blue-500 px-2 py-1 rounded hover:bg-blue-50"
          >
            Got it
          </button>
        </div>
      )}
      
      {/* Hero Section with Animation */}
      <section className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-20 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3 relative">
          Explore Events Around the Globe
        </h1>
        <p className="text-base md:text-lg max-w-2xl text-center mb-6 relative">
          Find and share events that match your passion. AttendEazy brings people together.
        </p>
        <div className="flex gap-4 relative">
          <a
            href="/events"
            className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-8 rounded-lg text-sm font-medium transform hover:scale-105 transition-transform"
          >
            Browse Events
          </a>
          <button
            onClick={() => handleLoginRequired("/create-event")}
            className="bg-white hover:bg-gray-100 text-gray-900 py-3 px-8 rounded-lg text-sm font-medium transform hover:scale-105 transition-transform"
          >
            Host an Event
          </button>
        </div>
      </section>
      
      {/* Featured Section with Hover Effects */}
      <section className="bg-white py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose AttendEazy?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div 
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => window.location.href = "/discover"}
          >
            <div className="h-3 bg-blue-500"></div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Global Platform</h3>
              <p className="text-sm text-gray-600">
                Discover events anywhere, from music festivals to tech conferences.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div 
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => window.location.href = "/how-it-works"}
          >
            <div className="h-3 bg-teal-500"></div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Effortless Sign-up</h3>
              <p className="text-sm text-gray-600">
                Quick registration, easy checkouts, and digital tickets that just work.
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div 
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleLoginRequired("/host-dashboard")}
          >
            <div className="h-3 bg-purple-500"></div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Host with Confidence</h3>
              <p className="text-sm text-gray-600">
                Seamlessly create, manage, and promote events with real-time analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Category Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Explore More
          </h2>
          
          {/* Category Selector */}
          {/* <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Music", "Tech", "Food", "Sports", "Arts"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div> */}
          
          {/* Event Cards for Selected Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* These would be dynamic based on the selected category */}
            {highlights.map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => window.location.href = `/events/${i._id}`}
              >
            <div  className="h-40 relative" style={{ backgroundImage: `url('${baseURL}${i.image}')` }} >
               <div className="absolute bottom-0 right-0 m-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                    {i.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">
                    {/* {activeCategory} Event {i} */}
                    {i.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{i.date}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-medium text-blue-500">${i.price}</span>
                    <button 
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoginRequired(`/events/${i._id}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section with CountUp Animation */}
      <section className="bg-blue-500 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">5,000+</div>
            <div className="text-sm md:text-base">Events Hosted</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">120+</div>
            <div className="text-sm md:text-base">Countries</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">1M+</div>
            <div className="text-sm md:text-base">Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
            <div className="text-sm md:text-base">Satisfaction</div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="bg-teal-50 py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-base text-gray-600 mb-8">
              Start exploring and hosting events with ease. Sign up for free!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/register"
                className="inline-block bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Create Account
              </a>
              <a
                href="/login"
                className="inline-block bg-white border border-gray-300 text-gray-800 py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Login
              </a>
            </div>
          </div>
        </section>
      )}
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .absolute {
          animation: float infinite linear;
        }
      `}</style>
    </div>
  );
}