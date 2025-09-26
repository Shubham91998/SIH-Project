import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
import Header from "./Header";

const ReportPage = () => {
  const [timeRange, setTimeRange] = useState("week");
  
  const caseData = [
    { date: "2025-09-10", cases: 120 },
    { date: "2025-09-11", cases: 150 },
    { date: "2025-09-12", cases: 90 },
    { date: "2025-09-13", cases: 200 },
    { date: "2025-09-14", cases: 160 },
    { date: "2025-09-15", cases: 170 },
  ];

  const vaccineData = [
    { name: "Pfizer", value: 45 },
    { name: "Moderna", value: 30 },
    { name: "AstraZeneca", value: 15 },
    { name: "Johnson & Johnson", value: 10 },
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  const regionData = [
    { name: "North Region", cases: 320 },
    { name: "South Region", cases: 280 },
    { name: "East Region", cases: 195 },
    { name: "West Region", cases: 245 },
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitoring public health trends and statistics</p>
        </header>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                timeRange === "day" 
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setTimeRange("day")}
            >
              Day
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                timeRange === "week" 
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setTimeRange("week")}
            >
              Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                timeRange === "month" 
                  ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setTimeRange("month")}
            >
              Month
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Cases" 
            value="1,234" 
            subtitle="last 7 days" 
            trend="up"
            trendValue="12%"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <StatCard 
            title="Vaccinated" 
            value="8,765" 
            subtitle="completed doses" 
            trend="up"
            trendValue="23%"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard 
            title="Hospitals Active" 
            value="42" 
            subtitle="near you" 
            trend="stable"
            trendValue="0%"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cases Trend Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg text-gray-900">Cases Trend (Last 7 Days)</h3>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 py-1 px-2 rounded-full">Updated today</span>
            </div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={caseData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vaccine Distribution Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-6">Vaccine Distribution</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vaccineData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {vaccineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Regional Cases */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-900 mb-6">Cases by Region</h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="cases" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg text-gray-900">Recent Alerts</h3>
              <span className="text-xs font-medium text-red-600 bg-red-50 py-1 px-2 rounded-full">3 new</span>
            </div>
            <ul className="space-y-4">
              <li className="p-4 border border-gray-200 rounded-xl flex justify-between items-start hover:bg-gray-50 transition-colors duration-200">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      Vaccine stock low — Center A
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Running low on Pfizer stock — consider restock.
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">Sep 15, 2025</div>
              </li>
              <li className="p-4 border border-gray-200 rounded-xl flex justify-between items-start hover:bg-gray-50 transition-colors duration-200">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      Increased influenza cases
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Spike in influenza-like illness reported in district 3.
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">Sep 14, 2025</div>
              </li>
              <li className="p-4 border border-gray-200 rounded-xl flex justify-between items-start hover:bg-gray-50 transition-colors duration-200">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      New vaccination center opened
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Center B now offering all vaccine types.
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">Sep 13, 2025</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

function StatCard({ title, value, subtitle, trend, trendValue, icon }) {
  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    stable: "text-gray-600 bg-gray-50"
  };

  const trendIcons = {
    up: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    down: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    stable: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    )
  };

  return (
    <>
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500 font-medium">{title}</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50">
          {icon}
        </div>
      </div>
      <div className={`mt-4 inline-flex items-center text-xs font-medium py-1 px-2 rounded-full ${trendColors[trend]}`}>
        {trendIcons[trend]}
        <span className="ml-1">{trendValue} {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : 'change'}</span>
      </div>
    </div>
    
    </>
  );
}

export default ReportPage;