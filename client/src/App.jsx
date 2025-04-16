import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import React from "react";
import Events from "./components/Events";
import Login from "./components/Login";
import Register from "./components/Register";
import HostLogin from "./components/HostLogin";
import Footer from "./components/Footer";
import "./index.css";
import { useState, useEffect } from "react";
import HostDashboard from "./components/HostDashboard.jsx";
import AddEvent from "./components/AddEvents.jsx";
import { Toaster } from "react-hot-toast";
import MyEvents from "./components/MyEvents.jsx";
import EventDetails from "./components/EventDetails.jsx";

function App() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowFooter(nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hostLogin" element={<HostLogin />} />
            <Route path="/hosts/dashboard" element={<HostDashboard />} />
            <Route path="/hosts/dashboard/add" element={<AddEvent />} />
            <Route path="/hosts/dashboard/my-events" element={<MyEvents />} />
            <Route path="/hosts/dashboard/my-events/:id" element={<EventDetails />} />
            <Route path="/events/:id" element={<EventDetails />} />
            {/* Add more routes as needed */}


            
          </Routes>
        </main>

        <Footer visible={showFooter} />
      </div>
    </Router>
  );
} 
export default App;
