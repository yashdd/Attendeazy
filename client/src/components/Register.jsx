import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import.meta.env

export default function Register() {
  const [isHost, setIsHost] = useState(false);
  const [orgName, setOrgName] = useState(""); // new state for organization name

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

    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
    console.log(baseURL)
    const selectedInterests = Object.keys(interests).filter(key => interests[key]);

    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      interests: selectedInterests,
      isHost,
      organizationName: isHost ? orgName : "",
    };
    console.log("Form data:", formData);
    try {
        console.log("Went to try")
        const endpoint = isHost
        ? `${baseURL}/hosts/register`
        : `${baseURL}/users/register`;        

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
          alert(data.message || "Registration failed.");
          return;
        }
    
        // If success
        console.log("Registration successful:", data);
        if (isHost) {
            navigate("/hostLogin");
          } else {
            navigate("/login");
          }      } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again later.");
      }
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
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="flex mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="flex mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="flex mb-1 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                placeholder="********"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="flex mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                placeholder="********"
                required
              />
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label className="flex mb-1 text-gray-700">Interests</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {Object.keys(interests).map((key) => (
                  <label
                    key={key}
                    className="flex items-center gap-1 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      name={key}
                      checked={interests[key]}
                      onChange={handleInterestChange}
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Are you a host? */}
            <div className="mb-4">
              <label className="flex items-center gap-1 text-lg text-gray-600">
                <input
                  type="checkbox"
                  name="isHost"
                  checked={isHost}
                  onChange={handleHostChange}
                />
                Are you a host?
              </label>
            </div>

            {/* Organization Name - only if isHost is true */}
            {isHost && (
              <div className="mb-4">
                <label className="flex mb-1 text-gray-700">Organization Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none"
                  placeholder="Your Organization"
                  value={orgName}
                  onChange={handleOrgNameChange}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};