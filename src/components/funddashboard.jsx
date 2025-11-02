import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function FundsDashboard() {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-8">
      
      <div className="bg-yellow-100 text-gray-700 text-sm p-3 rounded mb-4">
        Funds added between 12:00AM and 7:30 AM will be visible after 7:30AM.
      </div>

      <h2 className="text-xl font-semibold mb-6">Hi, Sagar</h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
       
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Equity</h3>
          <div className="text-3xl font-bold text-gray-900">0</div>
          <p className="text-sm text-gray-500">Margin available</p>
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>Margins used: 0</p>
            <p>Opening balance: 0</p>
            <Link to="/statement/equity" className="text-blue-600 hover:underline">
              View statement
            </Link>
          </div>
        </div>

       
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Commodity</h3>
          <div className="text-3xl font-bold text-gray-900">0</div>
          <p className="text-sm text-gray-500">Margin available</p>
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>Margins used: 0</p>
            <p>Opening balance: 0</p>
            <Link to="/statement/commodity" className="text-blue-600 hover:underline">
              View statement
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center px-4">
        <Briefcase className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-sm text-gray-500 mb-2">
          You don’t have any stocks in your DEMAT yet. Get started with absolutely free equity investments.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
          Start investing
        </button>
      </div>
    </div>
  );
}