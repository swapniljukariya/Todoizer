import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
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
              <input type="checkbox" checked={todo.completed} readOnly />
              <label>{todo.text}</label>
            </div>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <footer className="App-footer">
      <div className="filters">
        <h4>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</h4>
       
          <h4 onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>All</h4>
          <h4 onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>Active</h4>
          <h4 onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>Completed</h4>
        
        <h4 onClick={clearCompleted}>Clear completed</h4>
        </div>
      </footer>
    </div>
  );
}

export default App;
 