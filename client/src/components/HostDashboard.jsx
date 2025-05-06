import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HostDashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [hostData, setHostData] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
    avgRating: 0
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkHostSession = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/hosts/session`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Session Data:", data);
        if (data.isHost) {
          setAuthorized(true);
          setHostData({
            ...(data.host || { name: "Event Organizer" }),
            _id: data.hostId, // ✅ now works!
          });

        } else {
          navigate("/hostLogin");
        }
      } catch (err) {
        console.error("Auth check failed", err);
        navigate("/hostLogin");
      } finally {
        setLoading(false);
      }
    };
    
    checkHostSession();
  }, [navigate]);
  
  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/events/stats`, {
        credentials: "include",
      });
      const data = await res.json();
      setStats(data);
    };
  
    fetchStats();
  }, []);

  useEffect(() => {
    if (!hostData || !hostData._id) return;
    const fetchavgrating = async () => {
      console.log("Fetching average rating for host:", hostData._id);
    //   const sessionRes = await fetch(`${import.meta.env.VITE_BASE_URL}/session`, {
    //     credentials: "include",
    //   });
    //   const sessionData = await sessionRes.json();
    //  console.log("Session Data:", sessionData);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/hosts/${hostData._id}/average-rating`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Average Rating Data:", data);
      setStats((prevStats) => ({ ...prevStats, avgRating: data.averageRating }));
    }
    fetchavgrating();
  }, [hostData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!authorized) return null; // already redirected
  
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greeting;
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl text-blue-600">AttendEazy</h2>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                <span className="font-bold">{hostData?.name?.charAt(0) || "H"}</span>
              </div>
              <span className="font-medium text-sm">{hostData?.name || "Host"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pt-16 pb-12 px-4 max-w-7xl mx-auto">
        {/* Greeting and Navigation Tabs */}
        <div className="mb-6 pt-6">
          <h1 className="text-2xl font-bold text-gray-800">{greeting}, Your Event Magic Awaits!</h1>
          <p className="text-gray-600 mb-6">Here's what's happening with your events today.</p>
          
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <Link to="/hosts/dashboard" className="px-6 py-4 font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link to="/hosts/dashboard/my-events" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Events
              </Link>
              <Link to="/hosts/dashboard/add" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </Link>
              <Link to="/hosts/dashboard/scan-tickets" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Scan Tickets
              </Link>
              <Link to="/hosts/dashboard/analytics" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Link>
            </div>
          </div>
        </div>
            
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex items-center transition hover:shadow-md">
            <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Events</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalEvents}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex items-center transition hover:shadow-md">
            <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Upcoming Events</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.upcomingEvents}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex items-center transition hover:shadow-md">
            <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Attendees</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalAttendees}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex items-center transition hover:shadow-md">
            <div className="rounded-full bg-yellow-100 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Average Rating</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.avgRating}/5</h3>
            </div>
          </div>
        </div>
          
        {/* Main Actions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Create New Event</h3>
              </div>
              
              <p className="text-blue-100 mb-6 flex-grow">
                Create and configure a new event for your attendees. Set up tickets, schedules, and more.
              </p>
              
              <Link
                to="/hosts/dashboard/add"
                className="bg-white text-blue-700 font-medium py-2 px-4 rounded-lg inline-block text-center hover:bg-blue-50 transition w-full sm:w-auto"
              >
                Create Event
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Manage Events</h3>
              </div>
              
              <p className="text-teal-100 mb-6 flex-grow">
                View, edit, or manage your existing events. Check registrations and see attendance reports.
              </p>
              
              <Link
                to="/hosts/dashboard/my-events"
                className="bg-white text-teal-600 font-medium py-2 px-4 rounded-lg inline-block text-center hover:bg-teal-50 transition w-full sm:w-auto"
              >
                Manage Events
              </Link>
            </div>
          </div>
        </div>
          
        {/* Quick Access Tools */}
        {/* <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Tools</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/hosts/dashboard/scan-tickets" className="p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex flex-col items-center justify-center text-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600 mb-2 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Scan Tickets</span>
            </Link>
            
            <Link to="/hosts/dashboard/analytics" className="p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex flex-col items-center justify-center text-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Analytics</span>
            </Link>
            
            <Link to="/hosts/dashboard/promotions" className="p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex flex-col items-center justify-center text-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Promotions</span>
            </Link>
            
            <Link to="/hosts/dashboard/settings" className="p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex flex-col items-center justify-center text-center transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </Link>
          </div>
        </div>
           */}
        {/* Upcoming Events Preview - You can uncomment this if needed */}
        {/* <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Events</h3>
            <Link to="/hosts/dashboard/my-events" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-500 text-center py-8">Your upcoming events will appear here.</p>
          </div>
        </div> */}
      </div>
      
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Link to="/hosts/dashboard/add" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}