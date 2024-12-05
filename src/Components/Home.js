import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import TodoModal from "./TodoModal"; // Import the Modal component
import { IoLockOpenOutline } from "react-icons/io5";
import { RxLockClosed } from "react-icons/rx";




const Home = ({ Tags, Labels, todos, addTodo, userDetails }) => {
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [todoInput, setTodoInput] = useState(""); // Quick input field
  const [expandedTodoIndex, setExpandedTodoIndex] = useState(null); // Track the expanded todo

  const handleSaveTodo = (newDetails) => {
    const updatedTodos = [...todos];
    updatedTodos[selectedTodoIndex] = {
      ...updatedTodos[selectedTodoIndex],
      ...newDetails,
    };
    addTodo(updatedTodos);
    setIsModalOpen(false);
    setSelectedTodoIndex(null);
  };

  const handleAddTodo = () => {
    if (!todoInput.trim()) return;
    addTodo([...todos, { text: todoInput, completed: false }]);
    setTodoInput(""); // Clear the input field
  };

  const handleOpenModal = (index) => {
    setSelectedTodoIndex(index);
    setIsModalOpen(true);
  };

  const handleToggleExpand = (index) => {
    // Toggle the expanded todo
    if (expandedTodoIndex === index) {
      setExpandedTodoIndex(null); // Collapse if it's already expanded
    } else {
      setExpandedTodoIndex(index); // Expand the selected todo
    }
  };

  const handleClearAll = () => {
    addTodo([]); // Clear all todos
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  // Calculate remaining todos count
  const remainingTodosCount = todos.filter((todo) => !todo.completed).length;



  const handleCheckboxChange = (index) => {
    // Play sound
    const audio = new Audio("/sounds/check-sound.mp3");
    audio.play();
  
    // Toggle the completion status
    const updatedTodos = todos.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    addTodo(updatedTodos);
  };
  

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-indigo-50 to-white min-h-screen py-12">
      {/* Welcome Message */}
      {userDetails && (
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center">
            Welcome, <span className="text-indigo-600">{userDetails.name}!</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mt-2 italic">
            Plan your day with <span className="font-bold">Todoist</span> 📝
          </p>
        </div>
      )}

      {/* Quick Add Input */}
      <div className="flex items-center w-2/4 justify-center mb-8">
        <input
          type="text"
          placeholder="Add a quick todo here..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="p-5 w-full max-w-6xl border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xl"
        />
        <button
          onClick={handleAddTodo}
          className="ml-4 px-8 py-4 bg-yellow-400 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-all font-semibold text-xl"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}

      {/* Filter Section */}
<div className="flex items-center justify-between w-full max-w-5xl mb-8 px-4">
  {/* Remaining Tasks Text */}
  <div className="text-lg font-semibold text-gray-800 flex-1 text-left">
    {remainingTodosCount > 0
      ? `${remainingTodosCount} Todo${remainingTodosCount > 1 ? 's' : ''} remaining`
      : "All todos are completed!"}
  </div>

  {/* Filter Buttons */}
  <div className="flex-1 flex justify-center space-x-4">
    {["All", "Active", "Completed"].map((type) => (
      <button
        key={type}
        className={`px-6 py-3 text-xl font-semibold rounded-full transition-all ${
          filter === type
            ? "bg-indigo-600 text-white shadow-lg transform scale-105"
            : "bg-gray-200 text-gray-700 hover:bg-indigo-200 hover:text-indigo-800"
        }`}
        onClick={() => setFilter(type)}
      >
        {type}
      </button>
    ))}
  </div>

  {/* Clear All Button */}
  <div className="flex-1 flex justify-end">
    <button
      onClick={handleClearAll}
      className="px-6 py-3 text-xl font-semibold bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
    >
      Clear All
    </button>
  </div>
</div>



      









      {/* Todo List */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
        {filteredTodos.length > 0 ? (
          <ul className="space-y-6">
            {filteredTodos.map((todo, index) => (
              <li
                key={index}
                className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-2xl font-medium ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>

                  <div className="flex items-center space-x-6">
                    {/* Edit Button */}
                    <button
                      className="text-green-600 hover:text-green-800 transition-all"
                      onClick={() => handleOpenModal(index)}
                    >
                      <FaPlus size={22} />
                    </button>

                    {/* Delete Button */}
                    <button
                      className="text-red-600 hover:text-red-800 transition-all"
                      onClick={() => addTodo(todos.filter((_, i) => i !== index))}
                    >
                      <MdDeleteOutline size={26} />
                    </button>

                    {/* Checkbox */}
                    <input
  type="checkbox"
  checked={todo.completed}
  onChange={() => {
    // Play sound when toggling completion
    const audio = new Audio(require("./sound.mp3")); // Adjust the path if necessary
    audio.play();

    // Update the todos
    const updatedTodos = todos.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    addTodo(updatedTodos);
  }}
  className="h-6 w-6 text-indigo-500 focus:ring-indigo-400 rounded"
/>





                
                  </div>
                </div>

                {/* Expand/Collapse Details */}
                {expandedTodoIndex === index && (
                  <div className="mt-6 p-6 border-t-2 border-gray-300 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg">
                    {/* Todo Text */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-indigo-600">Todo:</h3>
                      <p className="text-xl text-gray-700">{todo.text}</p>
                    </div>

                    {/* Description */}
                    {todo.description && (
                      <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-indigo-600">Description:</h3>
                        <p className="text-xl text-gray-700">{todo.description}</p>
                      </div>
                    )}

                    {/* Priority, Tags, and Labels */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                      <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Priority:</h3>
                        <p className="text-xl text-gray-700">{todo.priority || "No priority set."}</p>
                      </div>
                      <div className="bg-yellow-200 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Tags:</h3>
                        <p className="text-xl text-gray-700">{todo.tags?.join(", ") || "No tags."}</p>
                      </div>
                      <div className="bg-green-200 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Labels:</h3>
                        <p className="text-xl text-gray-700">{todo.labels?.join(", ") || "No labels."}</p>
                      </div>
                    </div>

                    {/* Sub-todos */}
                    {todo.subTodos && todo.subTodos.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-indigo-600">Sub-todos:</h3>
                        <div className="space-y-4 mt-4">
                          {todo.subTodos.map((subTodo, subIndex) => (
                            <div key={subIndex} className="bg-indigo-100 p-6 rounded-lg shadow-lg">
                              <span className="text-xl">{subTodo}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* File Attachments */}
                    {todo.files && todo.files.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-indigo-600">Attached Files:</h3>
                        <div className="space-y-4 mt-4">
                          {todo.files.map((file, fileIndex) => (
                            <div key={fileIndex} className="bg-yellow-100 p-6 rounded-lg shadow-lg">
                              <a
                                href={file.url}
                                className="text-blue-600 hover:text-blue-800"
                                download
                              >
                                {file.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleToggleExpand(index)}
                  className="mt-4 text-xl text-indigo-600 hover:text-indigo-800 transition-all"
                >
                  {expandedTodoIndex === index ? <IoLockOpenOutline size={30} /> : <RxLockClosed size={30} />}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-600">No todos to display ✨</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TodoModal
          todo={todos[selectedTodoIndex]}
          Tags={Tags}
          Labels={Labels}
          onSave={handleSaveTodo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
