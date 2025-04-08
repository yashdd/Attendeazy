// src/pages/Home.jsx

export default function Home() {
    return (
      <div className="pt-16">
        {/* Because navbar is fixed and ~4rem high, offset content by 16 */}
        
        {/* Hero / Intro Section */}
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-20 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Explore Events Around the Globe
          </h1>
          <p className="text-base md:text-lg max-w-2xl text-center mb-6">
            Find and share events that match your passion. AttendEazy brings people together.
          </p>
          <a
            href="/register"
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-6 rounded-md text-sm font-medium"
          >
            Get Started
          </a>
        </section>
  
        {/* Featured / Info Section */}
        <section className="bg-white py-12 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose AttendEazy?
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="shadow-md rounded p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Global Platform</h3>
              <p className="text-sm text-gray-600">
                Discover events anywhere, from music festivals to tech conferences.
              </p>
            </div>
            {/* Card 2 */}
            <div className="shadow-md rounded p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Effortless Sign-up</h3>
              <p className="text-sm text-gray-600">
                Quick registration, easy checkouts, and digital tickets that just work.
              </p>
            </div>
            {/* Card 3 */}
            <div className="shadow-md rounded p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Host with Confidence</h3>
              <p className="text-sm text-gray-600">
                Seamlessly create, manage, and promote events with real-time analytics.
              </p>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="bg-teal-50 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              Start exploring and hosting events with ease. Sign up for free!
            </p>
            <a
              href="/register"
              className="inline-block bg-gray-900 text-white py-2 px-6 rounded hover:bg-gray-800"
            >
              Create Account
            </a>
          </div>
        </section>
      </div>
    );
  }
  