import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInModal = ({ setUserDetails, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSignIn = () => {
    if (email.trim() && name.trim()) {
      const user = { name, email };
      setUserDetails(user); // Set user details in parent state
      localStorage.setItem("userDetails", JSON.stringify(user)); // Persist in localStorage
      setIsModalOpen(false); // Close modal
      toast.success(`Welcome, ${name}!`, {
        position: "top-center",
      });
    } else {
      toast.error("Please fill in all fields.", {
        position: "top-center",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 rounded-lg shadow-xl p-8 relative">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Sign In
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-6 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <div className="flex justify-between space-x-4">
          <button
            onClick={handleCancel}
            className="w-1/2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSignIn}
            className="w-1/2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
