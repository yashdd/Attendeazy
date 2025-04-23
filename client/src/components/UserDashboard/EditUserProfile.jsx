import React, { useState, useEffect } from "react";

export default function EditUserProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    interests: {
      music: false,
      tech: false,
      art: false,
      sports: false,
      others: false,
    },
    organizationName: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHost, setIsHost] = useState(false); // Just to show organization field
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/users/profile`, { credentials: "include" });
        const data = await res.json();
 
        if (res.ok) {
          setFormData({
            fullName: data.fullName || "",
            email: data.email || "",
             organizationName: data.organizationName || "",
          });
          setIsHost(data.isHost || false);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: checked,
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
      const payload = {
        ...formData,
        password: password || undefined,  
      };
      const res = await fetch(`${baseURL}/users/update-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Server error. Please try again later.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading your profile...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />
        </div>

        

        {/* Organization Name (only if host) */}
        {isHost && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">Organization Name</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
        )}

        {/* Change Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank if no change"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Leave blank if no change"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
