import React, { useState} from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Diseases News & Report");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsMenuOpen(false);
  };

  
  return (
    <div>
      <header className="header-container bg-gradient-to-r from-blue-600 to-indigo-700 text-white pb-5 shadow-lg overflow-hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo and brand */}
            <a href="#" className="flex items-center space-x-2 group">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold group-hover:text-blue-200 transition-colors">
                VaccineTracker
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
  {[
    { label: "Diseases News & Report", path: "/diseasereport" },
    { label: "Your Report", path:"/feedback-reports" },
    { label: "Available Vaccine and Hospital", path: "/hospitals-and-vaccines" },
    { label: "User Feedback Report", path: "/reports" },
  ].map((tab) =>
    tab.path ? (
      // Use Link for routes
      <Link
        key={tab.label}
        to={tab.path}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          activeTab === tab.label
            ? "bg-white text-blue-700 shadow-md"
            : "text-blue-100 hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => handleTabClick(tab.label)}
      >
        {tab.label}
      </Link>
    ) : (
      // Use button for normal tab switching
      <button
        key={tab.label}
        onClick={() => handleTabClick(tab.label)}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          activeTab === tab.label
            ? "bg-white text-blue-700 shadow-md"
            : "text-blue-100 hover:bg-blue-500 hover:text-white"
        }`}
      >
        {tab.label}
      </button>
    )
  )}
</nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/registration"
                className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Sign in
              </Link>
              
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-white hover:bg-blue-500 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 bg-blue-500 rounded-lg">
              <nav className="flex flex-col space-y-2 p-2">
                {[
                  "Diseases News & Report",
                  "Your Report",
                  "Available Vaccine and Hospital",
                  "User Feedback Report",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-4 py-3 rounded-lg font-medium text-left transition-all ${
                      activeTab === tab
                        ? "bg-white text-blue-700"
                        : "text-white hover:bg-blue-400"
                    }`}
                  >
                    {tab}
                  </button>
                ))}

                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                    Sign in
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-colors">
                    Sign up
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
