import React, { useState } from 'react';
import { Notebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const tabs = ['Orders', 'GTT', 'Baskets', 'SIP', 'Alerts'];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('Orders');

  return (
    <div className="min-h-screen bg-white">
      
      <div className="flex flex-wrap border-b px-4 pt-4 gap-4 sm:gap-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 ${
              activeTab === tab
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-6 sm:px-4">
        <Notebook className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-4" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
          You haven't placed any orders today
        </h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-2 text-sm sm:text-base">
          Get started
        </button>
        <Link
          to="/orders/history"
          className="text-blue-600 text-sm hover:underline"
        >
          View history
        </Link>
      </div>
    </div>
  );
}