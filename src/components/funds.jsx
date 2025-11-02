import React from 'react';
import { Link } from 'react-router-dom';

const metrics = [
  'Available margin',
  'Used margin',
  'Available cash',
  'Opening balance',
  'Payin',
  'Payout',
  'SPAN',
  'Delivery margin',
  'Exposure',
];

export default function FundsOverview() {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-8">
     
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-sm text-gray-700">
          Instant, zero-cost fund transfers with <span className="font-semibold">UPI</span>
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
            Add funds
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Withdraw
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Equity</h2>
            <div className="flex gap-4 text-sm text-blue-600">
              <Link to="/statement/equity" className="hover:underline">View statement</Link>
              <Link to="/help/equity" className="hover:underline">Help</Link>
            </div>
          </div>
          <div className="space-y-2">
            {metrics.map((label, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-600">
                <span>{label}</span>
                <span className="font-medium text-gray-900">0.00</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Commodity</h2>
            <div className="flex gap-4 text-sm text-blue-600">
              <Link to="/statement/commodity" className="hover:underline">View statement</Link>
              <Link to="/help/commodity" className="hover:underline">Help</Link>
            </div>
          </div>
          <div className="space-y-2">
            {metrics.map((label, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-600">
                <span>{label}</span>
                <span className="font-medium text-gray-900">0.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}