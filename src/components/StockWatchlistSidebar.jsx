import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

const StockWatchlistSidebar = ({ onStockSelect, selectedStock }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [symbols, setSymbols] = useState([
    'HDFCBANK.BO',
    'INFY.NS',
    'TCS.BO',
    'ONGC.NS',
    'HINDUNILVR.BO',
    'GOLDBEES.NS'
  ]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ['Watchlist 1', 'Watchlist 2', 'Watchlist 3', 'Watchlist 4'];

  const getMockStocks = () => [
    {
      symbol: 'HDFCBANK.BO',
      exchange: 'BSE',
      price: '1645.50',
      change: '+12.30',
      changePercent: '+0.75',
      isPositive: true
    },
    {
      symbol: 'INFY.NS',
      exchange: 'NSE',
      price: '1425.80',
      change: '-8.20',
      changePercent: '-0.57',
      isPositive: false
    },
    {
      symbol: 'TCS.BO',
      exchange: 'BSE',
      price: '3245.60',
      change: '+15.40',
      changePercent: '+0.48',
      isPositive: true
    },
    {
      symbol: 'ONGC.NS',
      exchange: 'NSE',
      price: '185.75',
      change: '-2.15',
      changePercent: '-1.14',
      isPositive: false
    },
    {
      symbol: 'HINDUNILVR.BO',
      exchange: 'BSE',
      price: '2456.30',
      change: '+18.90',
      changePercent: '+0.78',
      isPositive: true
    },
    {
      symbol: 'GOLDBEES.NS',
      exchange: 'NSE',
      price: '58.45',
      change: '+0.35',
      changePercent: '+0.60',
      isPositive: true
    }
  ];

  const fetchStocks = async (symbolsList) => {
    setLoading(true);
    setError(null);

    try {
      const query = symbolsList.join(',');
      const corsProxy = 'https://corsproxy.io/?';
      const apiUrl = `https://nse-api-khaki.vercel.app/stock/list?symbols=${query}&res=num`;
      const url = corsProxy + encodeURIComponent(apiUrl);

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data && data.stocks) {
        const mappedStocks = data.stocks.map((stock) => ({
          ...stock,
          price: stock.last_price ?? stock.price ?? '0',
          changePercent: stock.percent_change ?? 0,
          isPositive: (stock.change ?? 0) >= 0
        }));

        setStocks(mappedStocks.slice(0, 6));
      } else {
        setStocks(getMockStocks());
      }
    } catch (error) {
      console.error('Error fetching stocks:', error);
      setError('Failed to load stocks. Showing mock data.');
      setStocks(getMockStocks());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(symbols);
    const interval = setInterval(() => fetchStocks(symbols), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAddSymbol = () => {
    const trimmed = search.trim().toUpperCase();
    if (trimmed && !symbols.includes(trimmed)) {
      setSymbols([...symbols, trimmed]);
      setSearch('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
     
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSymbol()}
              placeholder="Add stock..."
              className="flex-1 bg-transparent outline-none text-sm min-w-0"
            />
          </div>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
            aria-label="Filter options"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      
      {error && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg m-3">
          <p className="text-sm text-yellow-800">⚠️ {error}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm">Loading...</p>
          </div>
        ) : stocks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No stocks found.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stocks.map((stock, index) => (
              <div
                key={index}
                onClick={() => onStockSelect(stock)}
                className={`p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer ${
                  selectedStock?.symbol === stock.symbol ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {stock.symbol}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {stock.exchange}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                      ₹{stock.price}
                    </p>
                    <p
                      className={`text-xs mt-0.5 font-medium whitespace-nowrap flex items-center justify-end gap-0.5 ${
                        stock.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stock.isPositive ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      {stock.change} ({stock.changePercent}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockWatchlistSidebar;