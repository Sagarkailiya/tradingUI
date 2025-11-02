import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import logoImage from '../assets/logoImage.png'

const NavBar = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => setIsOpen(!isOpen);
  
  const handleItemClick = () => {
    setIsOpen(false);
    if (onNavClick) {
      onNavClick();
    }
  };

  const handleNavClick = () => {
    if (onNavClick) {
      onNavClick();
    }
  };

  return (
    <div className="flex sticky top-0 z-50 bg-white justify-between items-center w-full p-2 border-b border-gray-200">
      
      <Link to="/" onClick={handleNavClick}>
        <img src={logoImage} alt="logo" className="w-10 h-auto" />
      </Link>

     
      <ul className="hidden sm:flex items-center gap-10 text-sm font-medium pr-6">
        <li>
          <Link to="/dashboard" onClick={handleNavClick} className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={handleNavClick} className="hover:text-blue-600 transition-colors">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/portfolio" onClick={handleNavClick} className="hover:text-blue-600 transition-colors">
            Positions
          </Link>
        </li>
        <li>
          <Link to="/bids" onClick={handleNavClick} className="hover:text-blue-600 transition-colors">
            Bids
          </Link>
        </li>
        <li>
          <Link to="/funds" onClick={handleNavClick} className="hover:text-blue-600 transition-colors">
            Funds
          </Link>
        </li>
        <li>
          <Link to="/user" onClick={handleNavClick} className="hover:text-blue-600 transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </li>
      </ul>

      
      <button className="sm:hidden text-3xl cursor-pointer" onClick={handleMenuClick}>
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      
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

        <ul className="flex flex-col gap-4 mt-16 text-lg font-semibold">
          <li>
            <Link to="/dashboard" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Watchlist
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Positions
            </Link>
          </li>
          <li>
            <Link to="/bids" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Bids
            </Link>
          </li>
          <li>
            <Link to="/funds" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Funds
            </Link>
          </li>
          <li>
            <Link to="/user" onClick={handleItemClick} className="block py-2 hover:text-blue-600">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;