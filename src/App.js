import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Home from "./Components/Home";
import SignInModal from "./Components/SigninModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const Tags = ["Work", "Personal", "Urgent"]; // You can add more tags here
  const Labels = ["Work", "Personal", "Urgent"]; // You can add more labels here

  // On initial load, fetch todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);

    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  // Add a new todo and save it to localStorage
  const addTodo = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <Router>
      <div className="relative">
        {userDetails && (
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            Tags={Tags}
            Labels={Labels}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        )}
        <Header
          userDetails={userDetails}
          setIsModalOpen={setIsModalOpen}
          onSignOut={() => {
            setUserDetails(null); // Clear user details
            localStorage.removeItem("userDetails"); // Remove user details from localStorage
            setIsSidebarVisible(false); // Hide the sidebar immediately after sign out
          }}
          toggleSidebar={toggleSidebar}
        />
        <main className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                userDetails ? (
                  <Home
                    Tags={Tags}
                    Labels={Labels}
                    todos={todos}
                    addTodo={addTodo}
                    userDetails={userDetails}
                  />
                ) : (
                  <UnauthenticatedMessage setIsModalOpen={setIsModalOpen} />
                )
              }
            />
          </Routes>
        </main>
        {isModalOpen && (
          <SignInModal
            setUserDetails={(details) => {
              setUserDetails(details);
              localStorage.setItem("userDetails", JSON.stringify(details));
              setIsModalOpen(false);
            }}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
}

export default App;

const UnauthenticatedMessage = ({ setIsModalOpen }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
    <div className="max-w-md bg-white rounded-lg shadow-xl p-8 text-center transform transition duration-300 hover:scale-105">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 tracking-wider drop-shadow-md">
        Welcome to <span className="text-yellow-500">Todoist</span> 🎉
      </h2>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Please <span className="text-indigo-600 font-semibold">sign in</span> to manage your tasks and stay organized.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Sign In
      </button>
    </div>

    <footer className="mt-8 text-gray-500 text-sm italic">
      Your productivity starts here. 🚀
    </footer>
  </div>
);
