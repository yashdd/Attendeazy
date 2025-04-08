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

function App() {
  return (
    <Router>
      {/* The navbar stays on every page */}
      <Navbar />

      {/* Route definitions go inside <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hostLogin" element={<HostLogin />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
