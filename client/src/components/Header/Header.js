import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Link to="/" className="flex items-center">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"></path>
            </svg>
            <span className="ml-2 text-xl font-semibold">YouTube Clone</span>
          </Link>
        </div>
        
        <form onSubmit={handleSearch} className="flex-grow max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </form>
        
        <div>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">{user.username}</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt={user.username}
                className="w-8 h-8 rounded-full ml-2"
              />
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;