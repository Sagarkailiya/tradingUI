import React, { useState, useRef, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { ShoppingCart, Bell, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoImage.png';

const NavBar = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showNotifPopup, setShowNotifPopup] = useState(false);
  const cartRef = useRef(null);
  const notifRef = useRef(null);

  // Sample data
  const cartItems = [
    { id: 1, name: 'RELIANCE', qty: 10, price: 2450.5 },
    { id: 2, name: 'TCS', qty: 5, price: 3650.25 },
    { id: 3, name: 'INFY', qty: 15, price: 1580.0 },
  ];

  const notifications = [
    { id: 1, title: 'Order Executed', message: 'Your buy order for RELIANCE has been executed', time: '2 min ago', unread: true },
    { id: 2, title: 'Price Alert', message: 'TCS has reached your target price of ₹3650', time: '1 hour ago', unread: true },
    { id: 3, title: 'Market Update', message: 'NIFTY 50 closed at 25735.30 (+0.05%)', time: '3 hours ago', unread: false },
  ];

  const marketData = {
    nifty: { price: '25735.30', change: '+13.20', changePercent: '0.05%', isPositive: true },
    sensex: { price: '58090.25', change: '+313.90', changePercent: '0.54%', isPositive: true },
  };

  const handleMenuClick = () => setIsOpen(!isOpen);
  const handleItemClick = () => setIsOpen(false);
  const handleNavClick = () => onNavClick && onNavClick();

  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setShowCartPopup(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifPopup(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex sticky top-0 z-50 bg-white justify-between items-center w-full p-2 border-b border-gray-200">
      {/* Logo */}
      <Link to="/" onClick={handleNavClick}>
        <img src={logoImage} alt="logo" className="w-10 h-auto" />
      </Link>

      {/* Market Indices - Desktop */}
      <div className="hidden lg:flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">NIFTY 50</span>
          <span className="text-sm font-bold text-gray-900">{marketData.nifty.price}</span>
          <span className={`text-xs ${marketData.nifty.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {marketData.nifty.change} ({marketData.nifty.changePercent})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">NIFTY BANK</span>
          <span className="text-sm font-bold text-gray-900">{marketData.sensex.price}</span>
          <span className={`text-xs ${marketData.sensex.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {marketData.sensex.change} ({marketData.sensex.changePercent})
          </span>
        </div>
      </div>

      {/* Desktop Navigation + Icons */}
      <div className="hidden sm:flex items-center gap-6 pr-4">
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li><Link to="/dashboard" onClick={handleNavClick} className="hover:text-blue-600">Dashboard</Link></li>
          <li><Link to="/orders" onClick={handleNavClick} className="hover:text-blue-600">Orders</Link></li>
          <li><Link to="/holdings" onClick={handleNavClick} className="hover:text-blue-600">Holdings</Link></li>
          <li><Link to="/portfolio" onClick={handleNavClick} className="hover:text-blue-600">Positions</Link></li>
          <li><Link to="/bids" onClick={handleNavClick} className="hover:text-blue-600">Bids</Link></li>
          <li><Link to="/funds" onClick={handleNavClick} className="hover:text-blue-600">Funds</Link></li>
        </ul>

        {/* Cart Icon */}
        <div className="relative" ref={cartRef}>
          <button
            onClick={() => {
              setShowCartPopup(!showCartPopup);
              setShowNotifPopup(false);
            }}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {showCartPopup && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Cart ({cartItems.length})</h3>
                <button onClick={() => setShowCartPopup(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:underline">Edit</button>
                      <button className="text-xs text-red-600 hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    ₹{cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifPopup(!showNotifPopup);
              setShowCartPopup(false);
            }}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {notifications.filter((n) => n.unread).length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNotifPopup && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button onClick={() => setShowNotifPopup(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notif.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{notif.title}</p>
                          {notif.unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notif.message}</p>
                        <p className="text-xs text-gray-400">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-600 hover:underline font-medium">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <Link to={'user'}>
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          
           <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">YTC784</span>
          
        </div>
         </Link>
          
         
      </div>
     

      {/* Mobile Menu Button */}
      <button className="sm:hidden text-3xl cursor-pointer" onClick={handleMenuClick}>
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-white shadow-lg p-4 z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } sm:hidden`}
      >
        <div className="flex justify-between items-center">
          <Link to="/" onClick={handleItemClick}>
            <img src={logoImage} alt="logo" className="w-24 h-auto" />
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-3xl cursor-pointer">
            <HiX />
          </button>
        </div>

        {/* Market Indices - Mobile */}
        <div className="flex flex-col gap-3 mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-700">NIFTY 50</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{marketData.nifty.price}</span>
              <span className={`text-xs ${marketData.nifty.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {marketData.nifty.change}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-700">NIFTY BANK</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{marketData.sensex.price}</span>
              <span className={`text-xs ${marketData.sensex.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {marketData.sensex.change}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col gap-4 mt-8 text-lg font-semibold">
          <li><Link to="/dashboard" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Dashboard</Link></li>
          <li><Link to="/" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Watchlist</Link></li>
          <li><Link to="/orders" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Orders</Link></li>
          <li><Link to="/holding" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Holdings</Link></li>
          <li><Link to="/portfolio" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Positions</Link></li>
          <li><Link to="/bids" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Bids</Link></li>
          <li><Link to="/funds" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Funds</Link></li>
          <li><Link to="/user" onClick={handleItemClick} className="block py-2 hover:text-blue-600">Profile</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
