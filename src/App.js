import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeTodo, setActiveTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const updatedTodos = [
        ...todos,
        { text: newTodo, description: '', picture: '', completed: false, subTodos: [], dueDate: null },
      ];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const addSubTodo = (index, newSubTodoText) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          subTodos: [...todo.subTodos, { text: newSubTodoText, completed: false }],
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleTodo = (index, subIndex = null) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        if (subIndex !== null) {
          const updatedSubTodos = todo.subTodos.map((subTodo, j) =>
            j === subIndex ? { ...subTodo, completed: !subTodo.completed } : subTodo
          );
          if (!todo.subTodos[subIndex].completed) {
            const audio = new Audio(`${process.env.PUBLIC_URL}/nottone.mp3`); // Use process.env.PUBLIC_URL
            audio.addEventListener('canplaythrough', () => {
              audio.play(); // Play only when the audio is fully loaded
            });
          }
          return { ...todo, subTodos: updatedSubTodos };
        }
        if (!todo.completed) {
          const audio = new Audio(`${process.env.PUBLIC_URL}/nottone.mp3`); // Use process.env.PUBLIC_URL
          audio.addEventListener('canplaythrough', () => {
            audio.play(); // Play only when the audio is fully loaded
          });
        }
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index, subIndex = null) => {
    const newTodos = todos
      .map((todo, i) => {
        if (i === index) {
          if (subIndex !== null) {
            const updatedSubTodos = todo.subTodos.filter((_, j) => j !== subIndex);
            return { ...todo, subTodos: updatedSubTodos };
          }
          return null;
        }
        return todo;
      })
      .filter((todo) => todo !== null);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos
      .map((todo) => ({
        ...todo,
        subTodos: todo.subTodos.filter((subTodo) => !subTodo.completed),
      }))
      .filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const updateDescription = (index, newDescription) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, description: newDescription } : todo
    );
    setTodos(newTodos);
  };

  const updatePicture = (index, newPicture) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, picture: newPicture } : todo
    );
    setTodos(newTodos);
  };

  const handlePictureUpload = (index, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      updatePicture(index, reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openModal = (index) => {
    setActiveTodo(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setActiveTodo(null);
    setShowModal(false);
  };

  // Handle date update
  const updateDueDate = (index, newDate) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, dueDate: newDate } : todo
    );
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="App">
      <header className="App-header">
        <h1>todos</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </header>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <div
              className="todo-content"
              onClick={() => openModal(index)}
            >
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <label>{todo.text}</label>
              </div>
              <button onClick={(e) => {
                e.stopPropagation();
                deleteTodo(index);
              }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal
          todo={todos[activeTodo]}
          onClose={closeModal}
          onUpdateDescription={(desc) => updateDescription(activeTodo, desc)}
          onAddSubTodo={(subTodoText) => addSubTodo(activeTodo, subTodoText)}
          onUpdatePicture={(event) => handlePictureUpload(activeTodo, event)}
          onDeleteSubTodo={(subIndex) => deleteTodo(activeTodo, subIndex)}
          onToggleSubTodo={(subIndex) => toggleTodo(activeTodo, subIndex)}
          onUpdateDueDate={(newDate) => updateDueDate(activeTodo, newDate)} // Pass the date update handler
        />
      )}
      <footer className="App-footer">
        <div className="filters">
          <span>
            {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
          </span>
          <button onClick={() => setFilter('all')} 
          className="filter-item"
            >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className="filter-item"
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className='filter-item'
          >
            Completed
          </button>
          <button className="filter-item" onClick={clearCompleted}>Clear completed</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
