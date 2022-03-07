import React, { useState, useRef } from "react";


export default function TodoItem(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const focusTargetRef = useRef(null);

 

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="todo stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={focusTargetRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          <span>Cancel</span>
          <span className="visually-hidden"> renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          <span>Save</span>
          <span className="visually-hidden"> new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="todo stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={focusTargetRef}
        >
          <span>Edit</span>
          <span className="visually-hidden"> {props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          <span>Delete</span>
          <span className="visually-hidden"> {props.name}</span>
        </button>
      </div>
    </div>
  );
  return isEditing ? editingTemplate : viewTemplate;
}
