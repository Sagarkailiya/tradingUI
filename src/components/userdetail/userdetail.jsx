import React, { useState } from 'react';
import { 
  Bell, 
  IndianRupee, 
  Lock, 
  User, 
  Settings, 
  Package, 
  LogOut,
  Heart,
  ShoppingBag,
  Briefcase,
  Gavel,
  ChevronDown
} from 'lucide-react';
import {handleLogout} from '../../pages/signOut/signout'
import { useNavigate } from 'react-router-dom';


export default function Userdetail() {
  const [privacyMode, setPrivacyMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const userInfo = {
    name: "Sagar Kailiya",
    code: "YTC784",
    email: "palsagar033@gmail.com",
    initials: "SK"
  };

 

  const menuItems = [
    { icon: IndianRupee, label: "Funds", path: "funds" },
    { icon: Lock, label: "App Code", path: "/app-code" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Package, label: "Connected apps", path: "/connected-apps" },
    { icon: LogOut, label: "Logout", path: "/logout", isLogout: true }
  ];

  const bottomNav = [
    { icon: Heart, label: "Watchlist", key: "watchlist" },
    { icon: ShoppingBag, label: "Orders", key: "orders" },
    { icon: Briefcase, label: "Portfolio", key: "portfolio" },
    { icon: Gavel, label: "Bids", key: "bids" },
    { icon: User, label: userInfo.code, key: "profile", isActive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          
          <div className="flex items-center gap-2">
            
             <button
      onClick={() => handleLogout(navigate)}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Log Out
    </button>

          </div>
        </div>
        
      </div>

      
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <h1 className="text-xl font-semibold text-gray-800">{userInfo.name}</h1>
        <Bell className="w-6 h-6 text-gray-600" />
      </div>

      
      <div className="bg-white mx-4 mt-4 rounded-xl shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{userInfo.code}</h2>
            <p className="text-sm text-gray-500">{userInfo.email}</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-light text-blue-400">{userInfo.initials}</span>
          </div>
        </div>

        
        <div className="mt-6 flex items-center justify-between">
          <span className="text-base font-medium text-gray-700">Privacy mode</span>
          <button
            onClick={() => setPrivacyMode(!privacyMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              privacyMode ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                privacyMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      
      <div className="mt-6 px-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3 px-2">Account</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <button
                onClick={() => item.isLogout ? alert('Logout clicked') : null}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className={`text-base ${item.isLogout ? 'text-gray-700' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                <item.icon className="w-5 h-5 text-gray-400" />
              </button>
              {index < menuItems.length - 1 && <div className="border-b border-gray-100 mx-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-6 px-4 mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3 px-2">Console</h3>
        <div className="bg-white rounded-xl shadow-sm px-4 py-4 flex items-center justify-between">
          <span className="text-base text-gray-700">Console</span>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

       
       {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          {bottomNav.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className="flex flex-col items-center gap-1 py-2 px-3 min-w-[60px]"
            >
              {item.isActive ? (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <item.icon 
                  className={`w-6 h-6 ${
                    activeTab === item.key ? 'text-blue-500' : 'text-gray-600'
                  }`} 
                />
              )}
              <span 
                className={`text-xs ${
                  item.isActive || activeTab === item.key ? 'text-blue-500' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>  */}
    </div>
  );
}