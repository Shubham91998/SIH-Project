import React, { useState } from "react";
import Header from "./Header";

const FeedbackReportPage = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const feedbacks = [
    {
      id: 1,
      user: "Asha R.",
      rating: 5,
      comment: "Very helpful staff, quick process. I was in and out within 15 minutes!",
      date: "2025-09-12",
      category: "praise",
      sentiment: "positive",
      hospital: "City Health Center"
    },
    {
      id: 2,
      user: "Rohit S.",
      rating: 4,
      comment: "Vaccines available but waiting time was longer than expected. Staff was apologetic though.",
      date: "2025-09-13",
      category: "waiting",
      sentiment: "neutral",
      hospital: "North Hospital"
    },
    {
      id: 3,
      user: "Meera P.",
      rating: 2,
      comment: "Center closed early without notice. Wasted my time traveling there.",
      date: "2025-09-11",
      category: "operations",
      sentiment: "negative",
      hospital: "East Clinic"
    },
    {
      id: 4,
      user: "Vikram J.",
      rating: 5,
      comment: "Excellent experience! The nurse was very gentle and explained everything clearly.",
      date: "2025-09-10",
      category: "praise",
      sentiment: "positive",
      hospital: "West Medical Center"
    },
    {
      id: 5,
      user: "Priya M.",
      rating: 3,
      comment: "Clean facility but parking was a challenge. Maybe valet service would help?",
      date: "2025-09-09",
      category: "facility",
      sentiment: "neutral",
      hospital: "South Community Hospital"
    },
    {
      id: 6,
      user: "Arun K.",
      rating: 1,
      comment: "Website showed available slots but when I arrived, they said they were out of vaccines. Very frustrating!",
      date: "2025-09-08",
      category: "operations",
      sentiment: "negative",
      hospital: "Central Vaccination Hub"
    },
  ];

  const categories = [
    { id: "all", label: "All Feedback" },
    { id: "praise", label: "Praise" },
    { id: "waiting", label: "Waiting Time" },
    { id: "operations", label: "Operations" },
    { id: "facility", label: "Facility" },
  ];

  const filteredFeedbacks = selectedCategory === "all" 
    ? feedbacks 
    : feedbacks.filter(f => f.category === selectedCategory);

  const avgRating = (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1);
  const positiveCount = feedbacks.filter(f => f.sentiment === "positive").length;
  const negativeCount = feedbacks.filter(f => f.sentiment === "negative").length;
  const neutralCount = feedbacks.filter(f => f.sentiment === "neutral").length;

  const ratingDistribution = [0, 0, 0, 0, 0]; // For 1-5 stars
  feedbacks.forEach(f => {
    ratingDistribution[f.rating - 1]++;
  });

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Feedback Report</h1>
          <p className="text-gray-600 mt-2">Collected feedback from recent visits across all centers</p>
        </header>

        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                timeRange === "week" 
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setTimeRange("week")}
            >
              This Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                timeRange === "month" 
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setTimeRange("month")}
            >
              This Month
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                timeRange === "quarter" 
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setTimeRange("quarter")}
            >
              This Quarter
            </button>
          </div>
          
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Export Report
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-sm text-gray-500 font-medium">Average Rating</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{avgRating}<span className="text-xl text-gray-500">/5</span></div>
            <div className="mt-2 flex">
              {renderStars(Number(avgRating))}
            </div>
            <div className="text-xs text-gray-400 mt-1">Based on {feedbacks.length} reviews</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-sm text-gray-500 font-medium">Positive Feedback</div>
            <div className="mt-2 text-3xl font-bold text-green-600">{positiveCount}</div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(positiveCount/feedbacks.length)*100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{Math.round((positiveCount/feedbacks.length)*100)}% of total</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-sm text-gray-500 font-medium">Neutral Feedback</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">{neutralCount}</div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(neutralCount/feedbacks.length)*100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{Math.round((neutralCount/feedbacks.length)*100)}% of total</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-sm text-gray-500 font-medium">Critical Feedback</div>
            <div className="mt-2 text-3xl font-bold text-red-600">{negativeCount}</div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(negativeCount/feedbacks.length)*100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{Math.round((negativeCount/feedbacks.length)*100)}% of total</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Rating Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Rating Distribution</h3>
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center mb-3">
                <div className="w-10 text-sm text-gray-600">{stars} star</div>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${(ratingDistribution[5-stars]/feedbacks.length)*100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-10 text-right text-sm text-gray-600">
                  {ratingDistribution[5-stars]}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg text-gray-900">Recent Feedback</h3>
              
              <div className="flex space-x-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredFeedbacks.map((f) => (
                <FeedbackCard key={f.id} feedback={f} />
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Insights */}
        <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Feedback Insights & Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Strengths</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Staff friendliness and professionalism consistently praised</li>
                <li>Clean and hygienic facilities noted by many visitors</li>
                <li>Vaccination process efficiency appreciated</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Areas for Improvement</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Waiting time management needs attention</li>
                <li>Better communication about closures and stock availability</li>
                <li>Parking facilities need expansion at some centers</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Suggested Actions</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Extend operating hours at busy centers to reduce wait times</li>
              <li>Implement real-time queue management system with notifications</li>
              <li>Provide accurate real-time stock updates on website and app</li>
              <li>Add valet parking service at locations with parking challenges</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

function FeedbackCard({ feedback }) {
  const sentimentColors = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-yellow-100 text-yellow-800",
    negative: "bg-red-100 text-red-800"
  };
  
  const sentimentIcons = {
    positive: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    neutral: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    negative: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">{feedback.user.charAt(0)}</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{feedback.user}</div>
            <div className="text-xs text-gray-500 mt-1">{feedback.hospital} • {feedback.date}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentColors[feedback.sentiment]}`}>
            {sentimentIcons[feedback.sentiment]}
            <span className="ml-1 capitalize">{feedback.sentiment}</span>
          </div>
          <div className="flex items-center">{renderStars(feedback.rating)}</div>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-700">{feedback.comment}</div>
      
      <div className="mt-4 flex space-x-2">
        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Reply
        </button>
        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Save
        </button>
        <button className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 flex items-center ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Flag
        </button>
      </div>
    </div>
  );
}

function renderStars(n) {
  const arr = Array.from({ length: 5 }, (_, i) => i < n);
  return (
    <>
    <div className="flex space-x-0.5">
      {arr.map((on, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${on ? "text-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  
      </>
  );
}

export default FeedbackReportPage;