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
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleAddSubTodo = (e) => {
    e.preventDefault();
    if (subTodoText.trim()) {
      onAddSubTodo(subTodoText);
      setSubTodoText('');
    }
  };

  const handleSaveDescription = () => {
    onUpdateDescription(description);
    setIsEditingDescription(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{todo.text}</h2>
        <button className="close-button" onClick={onClose}>X</button>

        <div className="detail-section">
          <h3>Description</h3>
          {isEditingDescription ? (
            <div>
              <TextareaAutosize
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add description"
                className="description"
              />
              <button  className ="btnn"onClick={handleSaveDescription}>Save</button>
            </div>
          ) : (
            <div onClick={() => setIsEditingDescription(true)} className="description-display">
              {description || "Click to add description"}
            </div>
          )}
        </div>

        <div className="detail-section">
          <h3>Sub-todos</h3>
          <form onSubmit={handleAddSubTodo}>
            <input
              type="text"
              value={subTodoText}
              onChange={(e) => setSubTodoText(e.target.value)}
              placeholder="Add sub-todo"
              className='add-input'
            />
           
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
                <button className ="btnn"onClick={() => onDeleteSubTodo(subIndex)}>Delete</button>
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
