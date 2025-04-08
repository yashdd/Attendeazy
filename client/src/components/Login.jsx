import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // if you want to redirect after login
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

export default function UserLogin() {
  const navigate = useNavigate(); // only if you want redirect ability
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Firebase login success:", userCredential.user);
        // alert("Login successful!");
        // If you want to redirect:
        navigate("/");
      })
      .catch((error) => {
        console.error("Firebase login error:", error);
        alert(error.message || "Login failed");
      });
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Wave shape at the top */}
      <div className="absolute top-0 left-0 w-full h-[200px] overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradientColor)"
            fillOpacity="1"
            d="M0,32L30,37.3C60,42,120,53,180,80C240,107,300,149,360,154.7C420,160,480,128,540,106.7C600,85,660,75,720,112C780,149,840,235,900,256C960,277,1020,235,1080,202.7C1140,171,1200,149,1260,165.3C1320,181,1380,235,1410,261.3L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9F7AEA" />
              <stop offset="100%" stopColor="#ED64A6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="pt-40 pb-20 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            User Login
          </h2>

          {/* onSubmit triggers handleLogin */}
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
