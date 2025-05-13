import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    myTickets: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    savedEvents: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/session`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Session Data:", data);
        if (data.isUser) {
          setAuthorized(true);
          setUserData({
            ...(data.user || { name: "User" }),
            _id: data.userId,
          });
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check failed", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!userData || !userData._id) return;
      
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/users/stats`, {
          credentials: "include",
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch user stats", err);
      }
    };

    fetchUserStats();
  }, [userData]);

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
                <span className="font-bold">{userData?.name?.charAt(0) || "U"}</span>
              </div>
              <span className="font-medium text-sm">{userData?.name || "User"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pt-16 pb-12 px-4 max-w-7xl mx-auto">
        {/* Greeting and Navigation Tabs */}
        <div className="mb-6 pt-6">
          <h1 className="text-2xl font-bold text-gray-800">{greeting}, {userData?.name}!</h1>
          <p className="text-gray-600 mb-6">Find and manage your upcoming events.</p>
          
          {/* Navigation Tabs */}
          {/* <div className="bg-white rounded-xl shadow mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <Link to="/user/dashboard" className="px-6 py-4 font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link to="/user/dashboard/my-tickets" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                My Tickets
              </Link>
              <Link to="/user/dashboard/events" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Events
              </Link>

              <Link to="/user/dashboard/profile" className="px-6 py-4 font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>
            </div>
          </div> */}
        </div>
            
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex items-center transition hover:shadow-md">
            <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">My Tickets</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.myTickets}</h3>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Past Events</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.pastEvents}</h3>
            </div>
          </div>
          
     
        </div>
          
        {/* Main Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">My Tickets</h3>
              </div>
              
              <p className="text-blue-100 mb-6 flex-grow">
                View and manage all your ticket purchases for upcoming events.
              </p>
              
              <Link
                to="/user/dashboard/my-tickets"
                className="bg-white text-blue-700 font-medium py-2 px-4 rounded-lg inline-block text-center hover:bg-blue-50 transition w-full"
              >
                View Tickets
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Find Events</h3>
              </div>
              
              <p className="text-teal-100 mb-6 flex-grow">
                Discover and explore exciting new events in your area.
              </p>
              
              <Link
                to="/events"
                className="bg-white text-teal-600 font-medium py-2 px-4 rounded-lg inline-block text-center hover:bg-teal-50 transition w-full"
              >
                Browse Events
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
  <div className="p-6 flex flex-col h-full">
    <div className="flex items-center mb-4">
      <div className="rounded-full bg-white/20 p-3 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white">My Events</h3>
    </div>

    <p className="text-blue-100 mb-6 flex-grow">
      See the events you've attended and shared feedback on.
    </p>

    <Link
      to="/users/dashboard/my-events"
      className="bg-white text-blue-700 font-medium py-2 px-4 rounded-lg inline-block text-center hover:bg-blue-50 transition w-full"
    >
      View My Events
    </Link>
  </div>
</div>

          
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">My Profile</h3>
              </div>
              
              <p className="text-rose-100 mb-6 flex-grow">
                Update your personal information and preferences.
              </p>
              
              <Link
                to="/user/dashboard/profile"
                className="bg-white text-rose-600 font-medium py-2 px-4 rounded-lg inline-block text-center hover:bg-rose-50 transition w-full"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Your Upcoming Events</h3>
            <Link to="/user/dashboard/my-tickets" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats.upcomingEvents > 0 ? (
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-600">Loading your upcoming events...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">You don't have any upcoming events</p>
                <Link to="/events" className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Outlet for child routes */}
      <div className="px-4 max-w-7xl mx-auto pb-12">
        <Outlet />
      </div>
    </div>
  );
}