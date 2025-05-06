import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EventDetails({}) {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [isHost, setisHost] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/session`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsUser(data.isUser);
        setisHost(data.isHost);
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };
  
    fetchSession();
  }, []);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        
        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/events/event/${id}`);
        console.log(res)
        const data = await res.json();

        if (res.ok) {
          setEvent(data.event);
          // setRelatedEvents(data.relatedEvents || []); // optional: load related events
        } else {
          console.error("Error fetching event:", data.message);
          navigate("/events");
        }
      } catch (err) {
        console.error("Error:", err);
        navigate("/events");
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setTicketQuantity(value);
    }
  };

  const handleCheckout = async () => {
    if (!event || !event._id) {
      alert("Event data is not loaded properly!");
      return;
    }
    if (typeof event.price !== "number" || isNaN(event.price)) {
      alert("Event price is not loaded properly!");
      return
    }
    
    setIsProcessing(true);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/checkout/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          eventId: event._id,
          quantity: ticketQuantity

        }),
      });
  
      const session = await response.json();
      console.log("Chhdeout session:", session);
      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Invalid session response');
      }
  
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero Section with Image */}
      <div className="relative h-96 w-full">
        <img 
          src={`${import.meta.env.VITE_BASE_URL}${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
        
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        {/* Category badge */}
        <div className="absolute top-6 right-6">
          <span className="px-4 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
            {event.category}
          </span>
        </div>
        
        {/* Event title overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex flex-wrap items-center text-white/90 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>
            
            {/* Event Details */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Date and Time</h3>
                    <p className="text-gray-600">{formatDate(event.date)} at {event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                    {event.venueDetails && <p className="text-gray-600">{event.venueDetails}</p>}
                  </div>
                </div>
                
                {event.organizer && (
                  <div className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Organizer</h3>
                      <p className="text-gray-600">{event.organizer}</p>
                    </div>
                  </div>
                )}
                
                {event.additionalInfo && (
                  <div className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Additional Information</h3>
                      <p className="text-gray-600">{event.additionalInfo}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Map placeholder */}
            {event.location && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map would be displayed here</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Ticket Purchase */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Tickets</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Price per ticket</span>
                  <span className="text-2xl font-bold text-green-600">${event.price}</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Number of tickets</label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => ticketQuantity > 1 && setTicketQuantity(ticketQuantity - 1)}
                      className="w-10 h-10 rounded-l bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={ticketQuantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 border-t border-b border-gray-300 text-center text-gray-700"
                    />
                    <button 
                      onClick={() => ticketQuantity < 10 && setTicketQuantity(ticketQuantity + 1)}
                      className="w-10 h-10 rounded-r bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2 text-gray-700">
                  <span>Subtotal</span>
                  <span>${(event.price * ticketQuantity).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2 text-gray-700">
                  <span>Service fee</span>
                  <span>${(event.price * ticketQuantity * 0.05).toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-gray-200 my-4"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${(event.price * ticketQuantity * 1.05).toFixed(2)}</span>
                </div>
                
                {isUser ? (
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium ${
                      isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white transition-colors`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Checkout with Stripe
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </>
                    )}
                  </button>
                ) : isHost ? (
                  <p className="text-red-600 text-sm mt-4 text-center font-semibold">
                    Hosts cannot register for events.
                  </p>
                ) : (
                  <p className="text-red-500 text-sm mt-4 text-center">
                    Please <a href="/login" className="text-indigo-600 underline">log in</a> to proceed with checkout.
                  </p>
                )}


                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By clicking "Checkout," you agree to AttendEazy's terms and conditions and privacy policy.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
                <svg className="h-8" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.2894 5.89331H7.92756V19.1136H12.2894V5.89331Z" fill="#6772E5"/>
                  <path d="M8.63353 3.10776C8.63353 4.1993 9.5121 5.05462 10.617 5.05462C11.7219 5.05462 12.6004 4.1993 12.6004 3.10776C12.6004 2.01623 11.7219 1.16089 10.617 1.16089C9.5121 1.16089 8.63353 2.01623 8.63353 3.10776Z" fill="#6772E5"/>
                  <path d="M24.0941 10.4347L24.769 7.30103C24.769 7.30103 23.0714 6.43506 21.3328 6.43506C19.5941 6.43506 14.4481 7.4753 14.4481 12.6544C14.4481 17.8335 20.3372 17.6397 20.3372 15.0622C20.3372 12.4847 16.7242 12.8334 16.7242 11.0252C16.7242 9.21697 19.515 8.89819 20.6199 9.17708C21.7249 9.45599 24.0941 10.4347 24.0941 10.4347Z" fill="#6772E5"/>
                  <path d="M33.7611 6.66296H30.3682C30.3682 6.66296 30.5792 5.22272 30.5792 5.13336C30.5792 5.04399 30.4727 4.91483 30.2617 4.91483H27.0333C26.8223 4.91483 26.7158 5.08878 26.7158 5.21794L25.151 18.7649C25.151 18.9973 25.2575 19.1264 25.4675 19.1264H28.3845C28.5955 19.1264 28.702 18.9973 28.702 18.8681L29.4194 13.4858C29.4194 13.4858 32.4429 13.5752 33.2899 13.4858C34.1369 13.3965 37.5914 12.7213 37.5914 9.55682C37.5914 6.39233 33.7611 6.66296 33.7611 6.66296ZM33.4436 10.4079C33.0561 10.9637 32.2687 10.9637 31.6028 10.9637H30.607L31.0665 7.94623H32.1104C32.7763 7.94623 33.4436 7.94623 33.8311 8.45319C34.2196 8.96016 33.8311 9.8519 33.4436 10.4079Z" fill="#6772E5"/>
                  <path d="M48.2621 6.66296H45.0748C44.8228 6.66296 44.6953 6.83149 44.6118 6.99167L42.1361 10.6146L41.1337 7.06038C41.0707 6.84766 40.9016 6.66296 40.6496 6.66296H37.5309C37.3414 6.66296 37.2534 6.85688 37.2534 7.01707L39.7921 13.8889L37.3829 17.1326C37.2139 17.3453 37.3624 17.6325 37.615 17.6325H40.8022C41.0542 17.6325 41.1822 17.4731 41.2657 17.313L48.5141 7.15895C48.6831 6.93704 48.5136 6.66296 48.2621 6.66296Z" fill="#6772E5"/>
                </svg>
                <span className="text-xs text-gray-500">Secured by Stripe</span>
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}