import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StockWatchlist = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
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

  const fetchChartData = async (symbol) => {
    setChartLoading(true);
    try {
      const mockData = [];
      const currentStock = stocks.find(s => s.symbol === symbol);
      const basePrice = parseFloat(currentStock?.price || 100);
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const variance = (Math.random() - 0.5) * 10;
        mockData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          open: basePrice + variance,
          high: basePrice + variance + Math.random() * 5,
          low: basePrice + variance - Math.random() * 5,
          close: basePrice + variance + (Math.random() - 0.5) * 3,
          volume: Math.floor(Math.random() * 1000000)
        });
      }
      
      setChartData(mockData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setChartLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(symbols);
    const interval = setInterval(() => fetchStocks(symbols), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchChartData(selectedStock.symbol);
    }
  }, [selectedStock]);

  const handleAddSymbol = () => {
    const trimmed = search.trim().toUpperCase();
    if (trimmed && !symbols.includes(trimmed)) {
      setSymbols([...symbols, trimmed]);
      setSearch('');
    }
  };

  const CandlestickChart = ({ data }) => {
    if (!data || data.length === 0) {
      return <div className="text-center text-gray-500 py-8 text-xs sm:text-sm">No chart data available</div>;
    }

    return (
      <div className="space-y-3 sm:space-y-4 h-full">
        <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 9 }}
                stroke="#9CA3AF"
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                tick={{ fontSize: 9 }}
                stroke="#9CA3AF"
                domain={['auto', 'auto']}
                width={45}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '11px',
                  padding: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs text-gray-500">Open</p>
            <p className="text-xs sm:text-sm md:text-base font-semibold mt-0.5">₹{data[data.length - 1]?.open.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">High</p>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-green-600 mt-0.5">₹{Math.max(...data.map(d => d.high)).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Low</p>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-red-600 mt-0.5">₹{Math.min(...data.map(d => d.low)).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Close</p>
            <p className="text-xs sm:text-sm md:text-base font-semibold mt-0.5">₹{data[data.length - 1]?.close.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      
      <div className={`w-full lg:w-2/5 xl:w-1/3 border-r border-gray-200 flex flex-col ${selectedStock ? 'hidden lg:flex' : 'flex'}`}>
        <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide bg-white">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === index
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSymbol()}
                placeholder="Add stock..."
                className="flex-1 bg-transparent outline-none text-xs sm:text-sm min-w-0"
              />
            </div>
            <button
              type="button"
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
              aria-label="Filter options"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg m-3">
            <p className="text-sm text-yellow-800">⚠️ {error}</p>
          </div>
        )}

        <div className="flex-1 divide-y divide-gray-100 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-120px)]">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm">Loading...</p>
            </div>
          ) : stocks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No stocks found.</div>
          ) : (
            stocks.map((stock, index) => (
              <div
                key={index}
                onClick={() => setSelectedStock(stock)}
                className={`p-2.5 sm:p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer ${
                  selectedStock?.symbol === stock.symbol ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                      {stock.symbol}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {stock.exchange}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm whitespace-nowrap">
                      ₹{stock.price}
                    </p>
                    <p
                      className={`text-xs mt-0.5 font-medium whitespace-nowrap flex items-center justify-end gap-0.5 ${
                        stock.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stock.isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                      {stock.change} ({stock.changePercent}%)
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
      {selectedStock ? (
        <div className="w-full lg:w-3/5 xl:w-2/3 p-3 sm:p-4 lg:p-6 bg-gray-50 flex flex-col h-screen lg:h-auto overflow-y-auto">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                {selectedStock.symbol}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Exchange: {selectedStock.exchange}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">₹{selectedStock.price}</span>
                <span className={`text-xs sm:text-sm font-medium flex items-center gap-1 ${
                  selectedStock.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedStock.isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                  {selectedStock.change} ({selectedStock.changePercent}%)
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedStock(null)}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition lg:hidden flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6 flex-1 min-h-0">
            {chartLoading ? (
              <div className="flex items-center justify-center h-full min-h-[250px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-4">Loading chart...</p>
                </div>
              </div>
            ) : (
              <CandlestickChart data={chartData} />
            )}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex w-3/5 xl:w-2/3 items-center justify-center bg-gray-50">
          <div className="text-center text-gray-400 p-6">
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
            <p className="text-base sm:text-lg font-medium">Select a stock to view chart</p>
            <p className="text-xs sm:text-sm mt-2">Click on any stock from the list</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockWatchlist;