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
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import EditUserProfile from "./components/UserDashboard/EditUserProfile.jsx";
import MyTickets from "./components/UserDashboard/MyTickets.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import UserEvents from "./components/UserDashboard/UserEvents.jsx";
import Tp from "./components/tp.jsx";
import EditEvent from "./components/EditEvent.jsx";
import HostQRScanner from "./components/HostScanner.jsx";
import PageWrapper from "./components/PageWrapper.jsx";

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
            <Route path="/about" element={<PageWrapper background="bg-gradient-to-b from-blue-50 to-indigo-100">    <About />    </PageWrapper>    }/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hostLogin" element={<HostLogin />} />
            <Route path="/hosts/dashboard" element={<HostDashboard />} />
            <Route path="/hosts/dashboard/add" element={<AddEvent />} />
            <Route path="/hosts/dashboard/my-events" element={<MyEvents />} />
            <Route path="/hosts/dashboard/my-events/:id" element={<EventDetails />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/users/dashboard" element={<UserDashboard />} />
            <Route path="/users/dashboard/edit-profile" element={<EditUserProfile />} />
            <Route path="/users/dashboard/my-tickets" element={<MyTickets />} />  
            <Route path="/users/dashboard/userevents" element={<UserEvents />} />
            <Route path="/tp" element={<Tp />} />
            <Route path="/hosts/dashboard/edit/:id"  element={<EditEvent />} />
            <Route path="/hosts/dashboard/my-events/attendance/:eventId" element={<HostQRScanner />} />



            
          </Routes>
        </main>

        <Footer visible={showFooter} />
      </div>
    </Router>
  );
} 
export default App;
