import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Initialize todos from local storage or set to empty array if not found
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter(todo => !todo.completed).length;

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
            <div onClick={() => toggleTodo(index)}>
              <input type="checkbox" checked={todo.completed} onChange={() => {}} />
              <label>{todo.text}</label>
            </div>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <footer className="App-footer">
        <div className="filters">
          <span>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</span>
          <button onClick={() => setFilter('all')} className="selected">All</button>
          <button onClick={() => setFilter('active')} className="selected">Active</button>
          <button onClick={() => setFilter('completed')} className="selected">Completed</button>
          <button onClick={clearCompleted} className='selected'>Clear completed</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
