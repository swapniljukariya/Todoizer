import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './Modal.css';

function Modal({
  todo,
  onClose,
  onUpdateDescription,
  onAddSubTodo,
  onUpdatePicture,
  onDeleteSubTodo,
  onToggleSubTodo
}) {
  const [subTodoText, setSubTodoText] = useState('');

  const handleAddSubTodo = (e) => {
    e.preventDefault();
    if (subTodoText.trim()) {
      onAddSubTodo(subTodoText);
      setSubTodoText('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{todo.text}</h2>
        <button className="close-button" onClick={onClose}>X</button>

        <div className="detail-section">
          <h3>Description</h3>
          <TextareaAutosize
            value={todo.description}
            onChange={(e) => onUpdateDescription(e.target.value)}
            placeholder="Add description"
            className="description"
          />
        </div>

        <div className="detail-section">
          <h3>Sub-todos</h3>
          <form onSubmit={handleAddSubTodo}>
            <input
              type="text"
              value={subTodoText}
              onChange={(e) => setSubTodoText(e.target.value)}
              placeholder="Add sub-todo"
              className='sub-input'
            />
            <button  className='btn'type="submit">Add</button>
          </form>
          <ul className="sub-todos">
            {todo.subTodos.map((subTodo, subIndex) => (
              <li key={subIndex} className={subTodo.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={subTodo.completed}
                  onChange={() => onToggleSubTodo(subIndex)}
                  
                />
                <label>{subTodo.text}</label>
                <button className="btn"onClick={() => onDeleteSubTodo(subIndex)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h3>Photo</h3>
          <input type="file" onChange={onUpdatePicture} />
          {todo.picture && (
            <div className="picture-container">
              <img src={todo.picture} alt="todo" className="todo-picture" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
