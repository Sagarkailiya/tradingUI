import React, { useState } from 'react';

export default function HoldingsPage() {
  const [activeTab, setActiveTab] = useState('equity');
  const [selectedFilter, setSelectedFilter] = useState('Smallcase');

  return (
    <div className="min-h-screen bg-white">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8 px-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 text-sm font-medium ${
              activeTab === 'all'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('equity')}
            className={`py-4 text-sm font-medium ${
              activeTab === 'equity'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Equity
          </button>
          <button
            onClick={() => setActiveTab('mutualfunds')}
            className={`py-4 text-sm font-medium ${
              activeTab === 'mutualfunds'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mutual funds
          </button>
        </div>
      </div>

      {/* Holdings Header */}
      <div className="px-8 py-6 flex items-center gap-4">
        <h1 className="text-2xl font-normal text-gray-800">Holdings</h1>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Smallcase</option>
          <option>Stocks</option>
          <option>ETFs</option>
        </select>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-32">
        {/* Briefcase Icon */}
        <svg
          className="w-32 h-32 text-gray-300 mb-8"
          viewBox="0 0 100 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="10" y="20" width="80" height="50" rx="4" />
          <path d="M30 20 L30 15 C30 10 32 8 37 8 L63 8 C68 8 70 10 70 15 L70 20" />
          <line x1="10" y1="35" x2="90" y2="35" />
          <path d="M45 35 L45 40 C45 42 46 43 48 43 L52 43 C54 43 55 42 55 40 L55 35" />
        </svg>

        {/* Message */}
        <p className="text-gray-500 text-base mb-8">
          You don't have any smallcases.
        </p>

        {/* Button */}
        <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors">
          Visit smallcase
        </button>
      </div>
    </div>
  );
}