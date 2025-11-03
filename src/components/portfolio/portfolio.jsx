import React, { useState } from 'react';
import { Notebook } from 'lucide-react';
import { Link } from 'react-router-dom';

// const tabs = ['Orders', 'GTT', 'Baskets', 'SIP', 'Alerts'];

export default function Orders() {


  return (
    <div className="min-h-screen bg-white">
      
<h2 className='flex justify-center items-center'>Portfolio</h2>
     
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-6 sm:px-4">
        <Notebook className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-4" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
          You don't have any positions yet
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