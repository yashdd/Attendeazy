import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isHost, setIsHost] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [interests, setInterests] = useState({
    music: false,
    tech: false,
    art: false,
    sports: false,
    others: false,
  });

  const handleHostChange = (e) => {
    setIsHost(e.target.checked);
  };

  const handleOrgNameChange = (e) => {
    setOrgName(e.target.value);
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
    const selectedInterests = Object.keys(interests).filter(key => interests[key]);

    const formData = {
      fullName,
      email,
      password,
      confirmPassword,
      interests: selectedInterests,
      isHost,
      organizationName: isHost ? orgName : "",
    };

    try {
      const endpoint = isHost
        ? `${baseURL}/hosts/register`
        : `${baseURL}/users/register`;        

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }
  
      // If success
      if (isHost) {
        navigate("/hostLogin");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card with simple design */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-2 bg-purple-600"></div>
            
            <div className="p-8">
              {/* Logo/Icon */}
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-purple-600 p-3 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
                Create an Account
              </h2>
              <p className="text-center text-gray-500 mb-6">Join our event platform today</p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-4">
                  <label className="flex mb-1 text-gray-700 text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="flex mb-1 text-gray-700 text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="flex mb-1 text-gray-700 text-sm font-medium">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="flex mb-1 text-gray-700 text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <label className="flex mb-1 text-gray-700 text-sm font-medium">Interests</label>
                  <div className="flex flex-wrap gap-3 mt-1 p-3 border border-gray-300 rounded-lg">
                    {Object.keys(interests).map((key) => (
                      <label
                        key={key}
                        className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-purple-600 transition"
                      >
                        <input
                          type="checkbox"
                          name={key}
                          checked={interests[key]}
                          onChange={handleInterestChange}
                          className="rounded text-purple-600 focus:ring-purple-500"
                        />
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Are you a host? */}
                <div className="mb-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isHost"
                      checked={isHost}
                      onChange={handleHostChange}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-medium">Register as an event host</span>
                  </label>
                </div>

                {/* Organization Name - only if isHost is true */}
                {isHost && (
                  <div className="mb-4">
                    <label className="flex mb-1 text-gray-700 text-sm font-medium">Organization Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                        placeholder="Your Organization"
                        value={orgName}
                        onChange={handleOrgNameChange}
                        required={isHost}
                      />
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition mt-6
                    ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-purple-700 shadow-md hover:shadow-lg"}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-600 hover:underline font-medium">
                      Log In
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    <a href="/hostLogin" className="text-gray-600 hover:text-gray-800">
                      Host Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}