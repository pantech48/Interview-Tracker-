import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Tech Interview Tracker
          </Link>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800 mx-4">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
                >
                  <User size={18} className="mr-1" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;