import React, { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDesc: "",
    deadline: "",
    complete: false,
  });

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const addTask = (event) => {
    event.preventDefault();
    setTodoList([...todoList, { ...newTask, key: uuidv4() }]);
    setNewTask({ taskName: "", taskDesc: "", deadline: "", complete: false });
  };

  return (
    <div>
      <form onSubmit={addTask}>
        <label>
          Task Name:
          <input
            type="text"
            name="taskName"
            value={newTask.taskName}
            onChange={handleChange}
          />
        </label>
        <label>
          Task Description:
          <input
            type="text"
            name="taskDesc"
            value={newTask.taskDesc}
            onChange={handleChange}
          />
        </label>
        <label>
          Deadline:
          <input
            type="text"
            name="deadline"
            value={newTask.deadline}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      {todoList.map((task) => {
        return <Task key={task.key} task={task} />;
      })}
    </div>
  );
};

export default ToDoList;
