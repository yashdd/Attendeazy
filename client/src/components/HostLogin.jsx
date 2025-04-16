import React, { useState } from "react";

export default function HostLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleHostLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const loginData = { email, password };
    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
    
    fetch(`${baseURL}/hosts/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || "Host login failed");
          return;
        }
        window.location.href = "/hosts/dashboard"; // Redirect to host dashboard
      })
      .catch((err) => {
        console.error("Host login error:", err);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col">
      {/* Top gradient bar - simpler approach */}
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card with simple design */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-2 bg-teal-500"></div>
            
            <div className="p-8">
              {/* Logo/Icon */}
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-gray-900 p-3 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">
                Host Login
              </h2>
              <p className="text-center text-gray-500 mb-6">Access your event management dashboard</p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleHostLogin}>
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
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                      placeholder="host@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Password */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-gray-700 text-sm font-medium">Password</label>
                    <a href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center transition
                    ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-gray-800 shadow-md hover:shadow-lg"}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging In...
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Don't have a host account yet?{" "}
                    <a href="/host-register" className="text-teal-600 hover:underline font-medium">
                      Register as a Host
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    <a href="/login" className="text-gray-600 hover:text-gray-800">
                      User Login
                    </a>
                    {" • "}
                    <a href="/register" className="text-gray-600 hover:text-gray-800">
                      Register as User
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alternative: Angled bottom decoration */}
    </div>
  );
}