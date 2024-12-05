import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = ({ userDetails, setIsModalOpen, onSignOut, toggleSidebar }) => {
  const handleSignInClick = () => {
    setIsModalOpen(true); // Open the sign-in modal
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 shadow-lg flex flex-col items-center space-y-4 relative">
      {/* Centered Todoist Title */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white tracking-widest drop-shadow-lg">
          Todo<span className="text-yellow-300">ist</span>
        </h1>
        <h2 className="text-lg font-semibold text-gray-200 mt-2 italic shadow-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h2>
      </div>

      {/* Hamburger Menu Icon - Visible only if user is signed in */}
      {userDetails ? (
        <button
          className="absolute left-6 top-6 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
          onClick={toggleSidebar} // Toggles sidebar visibility
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      ) : null}

      {/* Sign In / Sign Out Button */}
      <div className="absolute top-6 right-6">
        {userDetails ? (
          <button
            onClick={onSignOut}
            className="bg-yellow-800 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md flex items-center space-x-2 transition-all duration-300"
          >
            <span className="font-medium tracking-wide">Sign Out</span>
          </button>
        ) : (
          <button
            onClick={handleSignInClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md text-lg font-medium transition-all duration-300"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
