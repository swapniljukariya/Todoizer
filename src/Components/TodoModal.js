import React, { useState } from "react";

const TodoModal = ({ onClose, onSave, Tags, Labels }) => {
  const [todoText, setTodoText] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [files, setFiles] = useState([]);
  const [subTodos, setSubTodos] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const fileArray = Array.from(fileList);
    setFiles(fileArray);

    // Extract the file names for display
    const fileNamesArray = fileArray.map(file => file.name);
    setFileNames(fileNamesArray);
  };

  const handleSave = () => {
    const newTodoDetails = {
      text: todoText,
      priority,
      tags,
      dueDate,
      files,
      subTodos,
    };
    onSave(newTodoDetails);
  };

  const handleAddSubTodo = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setSubTodos([...subTodos, e.target.value]);
      e.target.value = ""; // clear input
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add/Edit Todo</h3>
        
        {/* Todo Text */}
        <div className="mb-4">
          <label className="block font-semibold">Todo Text</label>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter todo text"
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block font-semibold">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block font-semibold">Tags</label>
          <select
            multiple
            value={tags}
            onChange={(e) => setTags([...e.target.selectedOptions].map(option => option.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block font-semibold">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Sub-todos */}
        <div className="mb-4">
          <label className="block font-semibold">Sub-todos</label>
          <input
            type="text"
            onKeyDown={handleAddSubTodo}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Press Enter to add a sub-todo"
          />
          <ul className="mt-2">
            {subTodos.length > 0 && (
              subTodos.map((subTodo, index) => (
                <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                  <span>{subTodo}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block font-semibold">Attach Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {fileNames.length > 0 && (
            <div className="mt-2">
              <strong>Files:</strong>
              <ul className="list-disc ml-4">
                {fileNames.map((fileName, index) => (
                  <li key={index} className="text-sm text-gray-600">{fileName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Save and Close Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
