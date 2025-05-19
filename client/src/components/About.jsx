import React from "react";
import { Calendar, Users, Award, MapPin, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-32 px-6 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700">About AttendEazy</h1>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              AttendEazy is a modern event management platform designed to connect
              hosts and attendees. From concerts to tech meetups, our platform
              simplifies event creation, ticketing, and discovery. We're passionate
              about enabling memorable experiences and seamless event participation
              for everyone.
            </p>
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-center">
              We believe great events should be accessible to everyone. Our mission is to break down barriers between event organizers and attendees through intuitive technology that makes event planning and participation effortless.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-5">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                <p className="text-gray-600">We strive for quality in everything we do</p>
              </div>
              
              <div className="p-5">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-gray-600">Building connections through shared experiences</p>
              </div>
              
              <div className="p-5">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                <p className="text-gray-600">Constantly improving how people experience events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Why Choose AttendEazy</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">All Events in One Place</h3>
                  <p className="text-gray-600">
                    Discover local events, concerts, conferences, and meetups all on a single platform. Filter by interests, location, and date to find the perfect event.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Effortless Management</h3>
                  <p className="text-gray-600">
                    Our platform makes it easy to create, promote, and manage events of any size. Handle ticketing, registrations, and attendee communications all in one place.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Community-Focused</h3>
                  <p className="text-gray-600">
                    Connect with like-minded individuals and build lasting relationships through our event communities. Share experiences, photos, and feedback with other attendees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section Teaser */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Meet Our Team</h2>
            <p className="text-gray-700 mb-6">
              AttendEazy is built by a passionate team of event enthusiasts and technology experts dedicated to creating the best event platform possible.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Meet the Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}