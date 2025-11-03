import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StockChart = ({ stock, onClose }) => {
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  const fetchChartData = async (symbol) => {
    setChartLoading(true);
    try {
      const mockData = [];
      const basePrice = parseFloat(stock?.price || 100);
      
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
    if (stock) {
      fetchChartData(stock.symbol);
    }
  }, [stock]);

  if (!stock) return null;

  return (
    <div className="h-full p-6 bg-gray-50">
      <div className="h-full bg-white rounded-lg shadow-lg p-6 flex flex-col">
        
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {stock.symbol}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Exchange: {stock.exchange}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-3xl font-bold">₹{stock.price}</span>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                stock.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.isPositive ? 
                  <TrendingUp className="w-4 h-4" /> : 
                  <TrendingDown className="w-4 h-4" />
                }
                {stock.change} ({stock.changePercent}%)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex-1">
          {chartLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-4">Loading chart...</p>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <ResponsiveContainer width="100%" height="70%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11 }}
                    stroke="#9CA3AF"
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    stroke="#9CA3AF"
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px',
                      padding: '10px'
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

              
              <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Open</p>
                  <p className="text-sm font-semibold mt-1">
                    ₹{chartData[chartData.length - 1]?.open.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">High</p>
                  <p className="text-sm font-semibold text-green-600 mt-1">
                    ₹{Math.max(...chartData.map(d => d.high)).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Low</p>
                  <p className="text-sm font-semibold text-red-600 mt-1">
                    ₹{Math.min(...chartData.map(d => d.low)).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Close</p>
                  <p className="text-sm font-semibold mt-1">
                    ₹{chartData[chartData.length - 1]?.close.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChart;