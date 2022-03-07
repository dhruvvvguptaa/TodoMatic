/* eslint-disable jsx-a11y/no-redundant-roles */

import React, { useState, useRef } from "react";
import {nanoid} from "nanoid";

import FilterButton from "./components/FilterButton";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  const listHeadingRef = useRef(null);

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <li key={task.id}>
      <TodoItem
        {...task}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </li>
  ));

  function addTask(name) {
    const newTask = { id: nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // invert the task's "completed" prop
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // reassign the task's name
        task.name = newName;
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp">
      <h1>TodoMatic</h1>
      <TodoForm addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
