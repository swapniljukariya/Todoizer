import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, CalendarIcon, GiftIcon } from "@heroicons/react/24/outline";

const Sidebar = ({
  isSidebarVisible,
  toggleSidebar,
  Tags,
  Labels,
  userDetails,
  setUserDetails,
}) => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "https://via.placeholder.com/150");

  useEffect(() => {
    const savedDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (savedDetails) setUserDetails(savedDetails);
  }, [setUserDetails]);

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setProfilePic(imageData);
        localStorage.setItem("profilePic", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white p-6 shadow-lg flex flex-col items-start transition-all duration-300 ease-in-out z-30 ${
        isSidebarVisible ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: '250px' }}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        <span className="sr-only">Close Sidebar</span> ✕
      </button>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <label htmlFor="profile-upload" className="relative w-24 h-24 mb-4 cursor-pointer">
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            className="hidden"
          />
        </label>
        <h2 className="text-xl font-semibold text-gray-800">{userDetails?.name || "Guest"}</h2>
        <p className="text-gray-500 text-sm">{userDetails?.email || "Please sign in"}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 w-full">
        <NavLink to="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <HomeIcon className="w-6 h-6 mr-3" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/today" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <CalendarIcon className="w-6 h-6 mr-3" />
          <span>Today</span>
        </NavLink>
        <NavLink to="/upcoming" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <span>Upcoming</span>
        </NavLink>
        <NavLink to="/birthday" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <GiftIcon className="w-6 h-6 mr-3" />
          <span>Birthday</span>
        </NavLink>
        <NavLink to="/my-projects" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
          <span>My Projects</span>
        </NavLink>
      </nav>

      {/* Tags Section */}
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-2 mt-4">
          {Tags.map((tag, index) => (
            <span key={index} className="bg-indigo-200 text-indigo-800 rounded-full px-4 py-1">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            const newTag = prompt("Enter a new tag:");
            if (newTag) Tags.push(newTag);
          }}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
        >
          Add Tag
        </button>
      </div>

      {/* Labels Section */}
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold">Labels</h3>
        <div className="flex flex-wrap gap-2 mt-4">
          {Labels.map((label, index) => (
            <span key={index} className="bg-yellow-200 text-yellow-800 rounded-full px-4 py-1">
              {label}
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            const newLabel = prompt("Enter a new label:");
            if (newLabel) Labels.push(newLabel);
          }}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Add Label
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
