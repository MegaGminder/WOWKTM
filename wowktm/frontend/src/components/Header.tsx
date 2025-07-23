import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [location, setLocation] = useState('Grand Prairie, 75052 - Grand Prairie Sup...');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
    // Add search logic here (e.g., redirect or API call)
  };

  return (
    <header className="bg-wowktm-primary text-white p-2 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl font-bold">🌟</span>
          <span className="ml-2 text-xl font-bold">WoWKTM</span>
        </div>
        <div className="relative">
          <select
            className="bg-white text-wowktm-primary p-2 rounded-full text-sm focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Pickup or delivery?</option>
            <option>Grand Prairie, 75052 - Grand Prairie Sup...</option>
            <option>Another Location</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSearch} className="flex-1 mx-4">
        <div className="flex items-center bg-white rounded-full p-2">
          <input
            type="text"
            placeholder="Search everything at WoWKTM online and in-store"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-black p-2 rounded-full focus:outline-none"
          />
          <button type="submit" className="ml-2 text-wowktm-primary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="flex items-center space-x-4">
        <Link to="/reorder" className="text-white hover:underline">
          Reorder
        </Link>
        <Link to="/my-items" className="text-white hover:underline">
          My Items
        </Link>
        <Link to="/login" className="text-white hover:underline">
          Account
        </Link>
        <Link to="/cart" className="relative text-white hover:underline">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;