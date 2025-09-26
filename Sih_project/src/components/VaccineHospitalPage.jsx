import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const VaccineHospitalPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "City Health Center",
      distance: "1.2 km",
      beds: 24,
      vaccine: "Covaxin (50)",
      rating: 4.7,
      reviews: 128,
      address: "123 Main Street",
      availability: "high",
      type: "government"
    },
    {
      id: 2,
      name: "North Hospital",
      distance: "3.8 km",
      beds: 56,
      vaccine: "Pfizer (120)",
      rating: 4.3,
      reviews: 256,
      address: "456 Oak Avenue",
      availability: "high",
      type: "private"
    },
    {
      id: 3,
      name: "East Clinic",
      distance: "5.1 km",
      beds: 8,
      vaccine: "Moderna (0)",
      rating: 4.1,
      reviews: 87,
      address: "789 Pine Road",
      availability: "none",
      type: "clinic"
    },
    {
      id: 4,
      name: "West Medical Center",
      distance: "2.5 km",
      beds: 42,
      vaccine: "Covishield (25), Pfizer (15)",
      rating: 4.9,
      reviews: 342,
      address: "101 Elm Boulevard",
      availability: "medium",
      type: "private"
    },
    {
      id: 5,
      name: "South Community Hospital",
      distance: "4.3 km",
      beds: 32,
      vaccine: "Covaxin (10), Moderna (5)",
      rating: 4.0,
      reviews: 194,
      address: "202 Maple Lane",
      availability: "low",
      type: "government"
    },
    {
      id: 6,
      name: "Central Vaccination Hub",
      distance: "0.8 km",
      beds: 12,
      vaccine: "Pfizer (80), Covishield (40)",
      rating: 4.5,
      reviews: 231,
      address: "303 Cedar Street",
      availability: "high",
      type: "government"
    },
  ];

  const filters = [
    { id: "all", label: "All Centers" },
    { id: "government", label: "Government" },
    { id: "private", label: "Private" },
    { id: "clinic", label: "Clinics" },
    { id: "high", label: "High Availability" },
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesFilter = selectedFilter === "all" || 
                          hospital.type === selectedFilter || 
                          hospital.availability === selectedFilter;
    
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.vaccine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vaccine & Hospital Finder</h1>
          <p className="text-gray-600 mt-2">Find nearby healthcare centers and vaccine availability</p>
        </header>

        {/* Search and Filters Section */}
        <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Available Vaccine & Hospital</h2>
              <p className="text-sm text-gray-600 mt-1">
                Browse {filteredHospitals.length} nearby hospitals and vaccine availability
              </p>
            </div>
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

        {/* Map Section */}
        <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Map View</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Use my location
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
            <div className="relative z-10 text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-indigo-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h4>
              <p className="text-gray-600 max-w-md mx-auto">
                Map integration would show the locations of healthcare centers with color-coded availability markers.
              </p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200">
                Enable Location Services
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">High Availability</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-600">Medium Availability</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Low Availability</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-sm text-gray-600">No Availability</span>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Search by hospital, vaccine or address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    
  );
}

function HospitalCard({ hospital }) {
  const availabilityColors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-orange-100 text-orange-800",
    none: "bg-red-100 text-red-800"
  };

  const typeIcons = {
    government: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    private: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    clinic: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    )
  };

  return (
    <>
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {typeIcons[hospital.type]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hospital.distance} • {hospital.beds} beds
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${availabilityColors[hospital.availability]}`}>
            {hospital.availability === "high" ? "High Availability" : 
             hospital.availability === "medium" ? "Medium Availability" : 
             hospital.availability === "low" ? "Low Availability" : "Out of Stock"}
          </div>
          <div className="flex items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-sm font-medium text-gray-900 ml-1">{hospital.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({hospital.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-1">Vaccines Available</div>
        <div className="text-sm text-gray-900">{hospital.vaccine}</div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {hospital.address}
      </div>

      <div className="flex space-x-3">
        <Link to="/vaccine" className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Book Slot
        </Link>
        <button className="px-4 py-2.5 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </button>
      </div>
    </div>
    
      </>
  );
}

export default VaccineHospitalPage;