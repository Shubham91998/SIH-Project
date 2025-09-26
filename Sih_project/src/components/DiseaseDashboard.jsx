import React, { useState, useEffect } from 'react';
import Header from './Header';

const DiseaseDashboard = () => {
  const [diseaseData, setDiseaseData] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('COVID-19');
  const [loading, setLoading] = useState(true);

  // Mock data - in a real application, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDiseaseData([
        {
          id: 1,
          name: 'COVID-19',
          cases: 65200,
          deaths: 660,
          recovered: 6200,
          active: 1830,
          riskLevel: 'Medium',
          lastUpdated: '2023-03-15'
        },
        {
          id: 2,
          name: 'Influenza',
          cases: 10000,
          deaths: 60,
          recovered: 990,
          active: 1000,
          riskLevel: 'Low',
          lastUpdated: '2023-03-10'
        },
        {
          id: 3,
          name: 'Monkeypox',
          cases: 8500,
          deaths: 92,
          recovered: 800,
          active: 1908,
          riskLevel: 'Medium',
          lastUpdated: '2023-03-12'
        },
        {
          id: 4,
          name: 'Dengue',
          cases: 3900,
          deaths: 250,
          recovered: 38000,
          active: 200,
          riskLevel: 'High',
          lastUpdated: '2023-03-08'
        }
      ]);

      setNewsArticles([
        {
          id: 1,
          title: 'New COVID-19 Variant Detected in Several Countries',
          summary: 'Health officials are monitoring a new variant that appears to be more contagious but less severe.',
          source: 'World Health Organization',
          date: '2023-03-14',
          disease: 'COVID-19',
          url: '#'
        },
        {
          id: 2,
          title: 'Influenza Season Peaking Earlier Than Expected',
          summary: 'This year\'s flu season has arrived early with higher than normal hospitalization rates.',
          source: 'CDC',
          date: '2023-03-10',
          disease: 'Influenza',
          url: '#'
        },
        {
          id: 3,
          title: 'Monkeypox Cases Decline Globally',
          summary: 'The WHO reports a significant decrease in monkeypox cases following vaccination campaigns.',
          source: 'Global Health News',
          date: '2023-03-08',
          disease: 'Monkeypox',
          url: '#'
        },
        {
          id: 4,
          title: 'Dengue Outbreak in Tropical Regions',
          summary: 'Several countries are reporting unusually high numbers of dengue cases this season.',
          source: 'Tropical Disease Bulletin',
          date: '2023-03-05',
          disease: 'Dengue',
          url: '#'
        },
        {
          id: 5,
          title: 'COVID-19 Booster Shots Recommended for Elderly',
          summary: 'Health authorities now recommend additional booster shots for vulnerable populations.',
          source: 'Health Ministry',
          date: '2023-03-03',
          disease: 'COVID-19',
          url: '#'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = newsArticles.filter(
    article => article.disease === selectedDisease
  );

  const selectedDiseaseData = diseaseData.find(d => d.name === selectedDisease) || {};

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading disease data...</p>
      </div>
    );
  }

  const getRiskLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50">
   

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Diseases</h2>
              <ul className="space-y-3">
                {diseaseData.map(disease => (
                  <li
                    key={disease.id}
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${
                      selectedDisease === disease.name 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDisease(disease.name)}
                  >
                    <span className="font-medium text-gray-700">{disease.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(disease.riskLevel)}`}>
                      {disease.riskLevel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">India's Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Cases</span>
                  <span className="font-bold text-gray-800">
                    {diseaseData.reduce((acc, curr) => acc + curr.cases, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Deaths</span>
                  <span className="font-bold text-red-600">
                    {diseaseData.reduce((acc, curr) => acc + curr.deaths, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Recovered</span>
                  <span className="font-bold text-green-600">
                    {diseaseData.reduce((acc, curr) => acc + curr.recovered, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">India's Weekly Report</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">First Weekly</span>
                  <a
                    href="https://drive.google.com/file/d/1B5ZdauvY2SeiibVpxINDjD3kZsqAvveC/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View PDF
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Second Weekly</span>
                  <a
                    href="https://drive.google.com/file/d/1KaAgKr4LpVgb4ZMQl_G6DAsKOccaeiDW/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View PDF
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Third Weekly</span>
                  <a
                    href="https://drive.google.com/file/d/1tlrLJPqaYQCfVjL36cRmljjaJi1ASjAB/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedDisease} Overview</h2>
                <p className="text-sm text-gray-500">Last updated: {selectedDiseaseData.lastUpdated}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Cases</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedDiseaseData.cases?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Deaths</h3>
                  <div className="text-2xl font-bold text-red-600">
                    {selectedDiseaseData.deaths?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Recovered</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {selectedDiseaseData.recovered?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Active Cases</h3>
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedDiseaseData.active?.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">About {selectedDisease}</h3>
                <p className="text-gray-600">
                  {selectedDisease} is a contagious disease that affects people worldwide. Stay informed with the latest
                  updates, prevention tips, and news about outbreaks and research developments.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest News about {selectedDisease}</h2>
              
              {filteredArticles.length > 0 ? (
                <div className="space-y-6">
                  {filteredArticles.map(article => (
                    <div key={article.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                        <a href={article.url}>{article.title}</a>
                      </h3>
                      <p className="text-gray-600 mb-3">{article.summary}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          <span className="font-medium">{article.source}</span> • <span>{article.date}</span>
                        </div>
                        <a href={article.url} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                          Read full article
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600">No news articles available for {selectedDisease}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Disease Tracker & News • Data for demonstration purposes only</p>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} Powered by Team Scriptheist.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default DiseaseDashboard;