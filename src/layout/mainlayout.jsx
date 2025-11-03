import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import NavBar from './NavBar';
import StockWatchlistSidebar from '../components/stockWatchlist/StockWatchlistSidebar';
import StockChart from '../components/stockChart/stockchart';
import Footer from './footer';

const MainLayout = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [showMobileWatchlist, setShowMobileWatchlist] = useState(false);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setShowChart(true);
    // Close mobile watchlist when stock is selected
    setShowMobileWatchlist(false);
  };

  const handleNavClick = () => {
    setShowChart(false);
    setShowMobileWatchlist(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <NavBar onNavClick={handleNavClick} />
      
      <div className="flex-1 flex relative">
        
        <button
          onClick={() => setShowMobileWatchlist(!showMobileWatchlist)}
          className="sm:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {showMobileWatchlist ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        
        <div className={`
          ${showMobileWatchlist ? 'fixed inset-0 z-50 bg-white' : 'hidden'}
          sm:block sm:relative sm:w-80 lg:w-96 border-r border-gray-200 bg-white h-[calc(100vh-64px)] sm:sticky sm:top-16
        `}>
         
          {showMobileWatchlist && (
            <div className="sm:hidden flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Watchlist</h2>
              <button
                onClick={() => setShowMobileWatchlist(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <StockWatchlistSidebar 
            onStockSelect={handleStockSelect}
            selectedStock={selectedStock}
          />
        </div>
        
        
        <div className="flex-1 bg-gray-50 overflow-auto w-full">
          {showChart && selectedStock ? (
            <StockChart 
              stock={selectedStock} 
              onClose={() => setShowChart(false)} 
            />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default MainLayout;