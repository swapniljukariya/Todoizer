import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeTodoIndex, setActiveTodoIndex] = useState(null);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [showSubTodoInput, setShowSubTodoInput] = useState(false);
  const [showPictureInput, setShowPictureInput] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const updatedTodos = [...todos, { text: newTodo, description: '', picture: '', completed: false, subTodos: [] }];
      setTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const addSubTodo = (index, newSubTodoText) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          subTodos: [...todo.subTodos, { text: newSubTodoText, completed: false }]
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
          return { ...todo, subTodos: updatedSubTodos };
        }
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index, subIndex = null) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        if (subIndex !== null) {
          const updatedSubTodos = todo.subTodos.filter((_, j) => j !== subIndex);
          return { ...todo, subTodos: updatedSubTodos };
        }
        return null;
      }
      return todo;
    }).filter(todo => todo !== null);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.map(todo => ({
      ...todo,
      subTodos: todo.subTodos.filter(subTodo => !subTodo.completed)
    })).filter(todo => !todo.completed);
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
            <div onClick={() => setActiveTodoIndex(index === activeTodoIndex ? null : index)}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(index)} />
              <label>{todo.text}</label>
            </div>
            {activeTodoIndex === index && (
              <div>
                <button onClick={() => setShowSubTodoInput(!showSubTodoInput)}>Add Sub-todo</button>
                {showSubTodoInput && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const subTodoText = e.target.elements.subTodoText.value;
                      if (subTodoText.trim()) {
                        addSubTodo(index, subTodoText);
                        e.target.elements.subTodoText.value = '';
                        setShowSubTodoInput(false);
                      }
                    }}
                  >
                    <input
                      type="text"
                      name="subTodoText"
                      placeholder="Add sub-todo"
                    />
                    <button type="submit">Add</button>
                  </form>
                )}
                <button onClick={() => setShowDescriptionInput(!showDescriptionInput)}>Add Description</button>
                {showDescriptionInput && (
                  <div>
                    <input
                      type="text"
                      value={todo.description}
                      onChange={(e) => updateDescription(index, e.target.value)}
                      placeholder="Add description"
                      className='description'
                    />
                  </div>
                )}
                <button onClick={() => setShowPictureInput(!showPictureInput)}>Add Photo</button>
                {showPictureInput && (
                  <div>
                    <input
                      type="text"
                      value={todo.picture}
                      onChange={(e) => updatePicture(index, e.target.value)}
                      placeholder="Add picture URL"
                      className='picture'
                    />
                  </div>
                )}
              </div>
            )}
            <button onClick={() => deleteTodo(index)}>Delete</button>
            {todo.picture && <img src={todo.picture} alt="todo" className="todo-picture" />}
            {todo.subTodos && (
              <ul className="sub-todos">
                {todo.subTodos.map((subTodo, subIndex) => (
                  <li key={subIndex} className={subTodo.completed ? 'completed' : ''}>
                    <div onClick={() => toggleTodo(index, subIndex)}>
                      <input type="checkbox" checked={subTodo.completed} onChange={() => toggleTodo(index, subIndex)} />
                      <label>{subTodo.text}</label>
                    </div>
                    <button onClick={() => deleteTodo(index, subIndex)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
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
