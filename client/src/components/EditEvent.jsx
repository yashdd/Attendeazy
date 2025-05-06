import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event } = state || {};

  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    price: event?.price || 0,
    category: event?.category || "",
    isHighlight: event?.isHighlight || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preview && !imageFile) {
        toast.error("Please upload an image.");
        return;
      }
    const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
    const payload = new FormData();
  
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
    if (imageFile) payload.append("image", imageFile);
  
    const loadingToast = toast.loading("Updating your event...");
    
    const res = await fetch(`${baseURL}/events/edit/${event._id}`, {
      method: "PATCH",
      credentials: "include",
      body: payload,
    });
  
    toast.dismiss(loadingToast);
    const result = await res.json();
  
    if (!res.ok) {
      toast.error(result.message || "Failed to update event");
    } else {
      toast.success("Event updated successfully!");
      navigate("/hosts/dashboard/my-events");
    }
  };
  

  const nextStep = () => {
    if (step === 1 && (!formData.title || !formData.description || !formData.category)) {
      toast.error("Please fill all required fields");
      return;
    }
    if (step === 2 && (!formData.date || !formData.time || !formData.location)) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const categoryIcons = {
    Music: "🎵",
    Tech: "💻",
    Education: "📚",
    Sports: "🏆",
    Health: "💪",
    Art: "🎨",
    Travel: "✈️",
    Food: "🍔",
    Hangout: "🧍‍♂️"
  };

  useEffect(() => {
    if (event?.image) {
      setPreview(`${import.meta.env.VITE_BASE_URL}${event.image}`);
    }
  }, [event]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
            Edit Event
          </h1>
          <p className="text-gray-600">Share your amazing events with the world</p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'
            } font-bold`}>
              1
            </div>
            <div className={`h-1 w-10 ${step >= 2 ? 'bg-violet-600' : 'bg-gray-200'}`}></div>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'
            } font-bold`}>
              2
            </div>
            <div className={`h-1 w-10 ${step >= 3 ? 'bg-violet-600' : 'bg-gray-200'}`}></div>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'
            } font-bold`}>
              3
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300"
          encType="multipart/form-data"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tell us about your event</h2>
              
              <div>
                <label className="block font-medium mb-1 text-gray-700">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Give your event a catchy title"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1 text-gray-700">Description</label>
                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what makes your event special..."
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1 text-gray-700">Category</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(categoryIcons).map(([cat, icon]) => (
                    <div 
                      key={cat}
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${
                        formData.category === cat 
                          ? 'border-violet-500 bg-violet-50 shadow-md' 
                          : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl mb-2">{icon}</span>
                      <span className={formData.category === cat ? "font-medium text-violet-700" : "text-gray-700"}>
                        {cat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">When and where?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-1 text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-medium mb-1 text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where will your event take place?"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label className="block font-medium mb-1 text-gray-700">Price (USD)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full border border-gray-300 p-3 pl-8 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter 0 for free events</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a stunning image</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all hover:border-violet-400 bg-gray-50">
                {preview ? (
                  <div>
                    <img 
                      src={preview} 
                      alt="Event preview" 
                      className="mx-auto max-h-64 rounded-lg object-cover mb-4" 
                    />
                    <button 
                      onClick={() => {setImageFile(null); setPreview(null);}} 
                      className="text-red-500 underline"
                      type="button"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-gray-600">Drag and drop an image or click to browse</p>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`w-full ${preview ? 'hidden' : 'opacity-0 absolute inset-0 cursor-pointer h-full'}`}
                  
                />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
                <h3 className="font-medium text-lg text-gray-800 mb-4">Event Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-medium">{formData.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{formData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{formData.date} at {formData.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{formData.location}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">${formData.price || '0.00'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3">
                        <input
                        type="checkbox"
                        name="isHighlight"
                        checked={formData.isHighlight || false}
                        onChange={(e) =>
                            setFormData((prev) => ({
                            ...prev,
                            isHighlight: e.target.checked,
                            }))
                        }
                        className="w-5 h-6 text-violet-600 border-gray-300 rounded"
                        />
                        <label htmlFor="isHighlight" className="text-gray-700">
                        Mark as Highlight Event
                        </label>
                    </div>
                   </div>


                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition font-medium text-lg shadow-lg flex items-center justify-center"
              >
                <span>Launch Your Event</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
            )}
            
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className={`ml-auto flex items-center justify-center px-6 py-2 bg-violet-600 rounded-lg text-white hover:bg-violet-700 transition font-medium ${step === 1 && 'ml-auto'}`}
              >
                Continue
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}