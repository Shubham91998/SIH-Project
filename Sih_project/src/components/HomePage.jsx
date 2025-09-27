import React, { useState } from 'react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">VaxCare AI</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="/hospitals-and-vaccines" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Vaccination
                </a>
                <a href="/reports" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Certificate
                </a>
                <a href="/feedback-reports" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Resources
                </a>
                <a href="/diseasereport" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Disease Report
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a
                  href="/register"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Smart Vaccination Platform</h1>
          <p className="text-xl mb-8">Schedule vaccinations and get AI-powered health assistance</p>
          <div className="flex justify-center space-x-4">
            <a
              href="/vaccine-scheduler"
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-200"
            >
              Book Vaccination Slot
            </a>
            <a
              href="/chatbot"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 transition duration-200 border border-white"
            >
              Chat with AI Assistant
            </a>
          </div>
        </div>
      </div>

      {/* Search Vaccination Center */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Your Nearest Vaccination Center</h2>
        <p className="text-gray-600 mb-6">Get a preview list of the nearest centers and check availability of vaccination slots</p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-700 font-medium">Login to book your slot</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your State</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Choose State</option>
              <option>State 1</option>
              <option>State 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your District</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Choose District</option>
              <option>District 1</option>
              <option>District 2</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <a
            href="//hospitals-and-vaccines"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Search Centers
          </a>
        </div>
      </div>

      {/* 3 Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Get Vaccinated in 3 Easy Steps</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Book an Appointment</h3>
            <p className="text-gray-600 mb-4">Schedule your vaccination appointment through our platform or walk into any vaccination center.</p>
            <a href="/hospitals-and-vaccines" className="text-indigo-600 font-medium hover:text-indigo-800">How to book your appointment →</a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Get Your Vaccination</h3>
            <p className="text-gray-600 mb-4">Visit the vaccination center at your scheduled time and receive your vaccine safely.</p>
            <a href="/feedback-reports" className="text-indigo-600 font-medium hover:text-indigo-800">Do's and Don'ts for vaccination →</a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Download Certificate</h3>
            <p className="text-gray-600 mb-4">Access and download your vaccination certificate after each dose for your records.</p>
            <a href="/reports" className="text-indigo-600 font-medium hover:text-indigo-800">Download your certificate →</a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Report Side Effects</h3>
              <p className="text-gray-600">Report any side effects after vaccination using your registered account.</p>
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 mt-2 inline-block">Report Now →</a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Certificate Management</h3>
              <p className="text-gray-600">Merge certificates, add passport details, and manage your vaccination records.</p>
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 mt-2 inline-block">Manage Certificates →</a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 text-purple-800 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Health Assistant</h3>
              <p className="text-gray-600">Get answers to your vaccination questions with our intelligent chatbot.</p>
              <a href="/chatbot" className="text-indigo-600 font-medium hover:text-indigo-800 mt-2 inline-block">Chat Now →</a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Raise an Issue</h3>
              <p className="text-gray-600">Get solutions to account and certificate related issues instantly.</p>
              <a href="/reports" className="text-indigo-600 font-medium hover:text-indigo-800 mt-2 inline-block">Get Support →</a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <button 
            className={`px-4 py-2 rounded-full ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeTab === 'registration' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('registration')}
          >
            Registration
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeTab === 'scheduling' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('scheduling')}
          >
            Scheduling
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeTab === 'certificate' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('certificate')}
          >
            Certificate
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Where can I register for vaccination?</h3>
            <p className="text-gray-600 mt-2">You can register directly on our platform by creating an account and providing your basic information.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Is online registration mandatory for vaccination?</h3>
            <p className="text-gray-600 mt-2">While online registration is recommended for a smoother experience, walk-in vaccinations are also available at most centers.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">How can I download my vaccination certificate?</h3>
            <p className="text-gray-600 mt-2">After each dose, your certificate will be available in your account dashboard for download.</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">View all FAQs →</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Vaccination Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Register Members</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Search Vaccination Centers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Book Vaccination Slots</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">How To Get Vaccinated</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Vaccination Guidelines</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Overview</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Frequently Asked Questions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Certificate Corrections</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">Helpline: +91-XXX-XXXX-XXXX</li>
                <li className="text-gray-300">Technical Support: XXXX-XXXXXX</li>
                <li className="text-gray-300">Email: support@vaxcareai.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 VaxCare AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
