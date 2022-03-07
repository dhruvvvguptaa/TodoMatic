import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

const DATA = [
  { id: "task-0", name: "Eat", completed: true },
  { id: "task-1", name: "Sleep", completed: false },
  { id: "task-2", name: "Repeat", completed: false }
];

ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
