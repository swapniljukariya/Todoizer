import React, { useState } from 'react';

function Modal({ todo, onClose, onSave }) {
  const [updatedTodo, setUpdatedTodo] = useState({ ...todo });

  const handleSave = () => {
    onSave(updatedTodo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4">Edit Task</h2>

        <div className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title:
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={updatedTodo.text}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, text: e.target.value })
              }
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Description:
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
              value={updatedTodo.description}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, description: e.target.value })
              }
              placeholder="Add a brief description of your task."
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date:
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={updatedTodo.dueDate || ''}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, dueDate: e.target.value })
              }
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority:
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={updatedTodo.priority}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, priority: e.target.value })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={updatedTodo.category || ''}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, category: e.target.value })
              }
              placeholder="E.g., Work, Personal"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
