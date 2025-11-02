import React, { useState } from 'react';
import { Search } from 'lucide-react';

const tabs = ['IPO', 'Govt. securities', 'Auctions', 'Corporate actions', 'SSE'];

const ipoData = [
  {
    name: 'STUDDS',
    company: 'Studds Accessories',
    offerStart: '30th Oct',
    offerEnd: '3rd Nov',
    price: '₹557 - ₹585',
    minAmount: '₹14,625',
    action: 'Apply',
  },
  {
    name: 'LENSKART',
    company: 'Lenskart Solutions',
    offerStart: '31st Oct',
    offerEnd: '4th Nov',
    price: '₹382 - ₹402',
    minAmount: '₹15,075',
    action: 'Apply',
  },
  {
    name: 'GROWW',
    company: 'Groww (Billionbrains Garage Ventures)',
    offerStart: '1st Nov',
    offerEnd: '7th Nov',
    price: '₹160 - ₹166',
    minAmount: '₹14,940',
    action: 'Pre-apply',
  },
  {
    name: 'SHETH',
    company: 'Sheth Infra',
    offerStart: '30th Oct',
    offerEnd: '1st Nov',
    price: '₹120 - ₹126',
    minAmount: '₹15,000',
    action: 'Upcoming',
  },
  {
    name: 'ORKLANDIA',
    company: 'Orkila India',
    offerStart: '29th Oct',
    offerEnd: '31st Oct',
    price: '₹160',
    minAmount: '₹14,400',
    action: 'Upcoming',
  },
];

export default function IPODashboard() {
  const [activeTab, setActiveTab] = useState('IPO');

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b pb-2 mb-4 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification */}
      <div className="bg-yellow-100 text-gray-700 text-sm p-3 rounded mb-4">
        Funds added between 12:00AM and 7:30 AM will be visible after 7:30AM.
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search IPOs"
          className="w-full border rounded px-4 py-2 pr-10 text-sm"
        />
        <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
      </div>

      {/* IPO List */}
      <div className="space-y-6">
        {ipoData.map((ipo, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold">{ipo.name}</h3>
                <p className="text-sm text-gray-500">{ipo.company}</p>
              </div>
              <button
                className={`px-3 py-1 rounded text-sm font-medium ${
                  ipo.action === 'Apply'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : ipo.action === 'Pre-apply'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-600 cursor-default'
                }`}
              >
                {ipo.action}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600">
              <p><span className="font-medium">Offer:</span> {ipo.offerStart} – {ipo.offerEnd}</p>
              <p><span className="font-medium">Price:</span> {ipo.price}</p>
              <p><span className="font-medium">Min. Amount:</span> {ipo.minAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}