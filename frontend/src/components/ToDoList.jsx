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
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const addTask = (event) => {
    event.preventDefault();
    const dueDate = new Date(newTask.deadline);
    let diffInDays = Math.floor((dueDate - currentDate) / (24 * 60 * 60 * 1000))
    if (diffInDays > 0) {
      setTodoList([...todoList, { ...newTask, key: uuidv4() }]);
      setNewTask({ taskName: "", taskDesc: "", deadline: "", complete: false });
    }
  };

  const deleteTask = (taskKey) => {
    setTodoList(todoList.filter((task) => task.key !== taskKey));
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
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      {todoList.map((task) => {
        return (
          <div className="bg-white mb-15">
            <Task key={task.key} task={task} onDelete={deleteTask} />
          </div>
        );
      })}
    </div>
  );
};

export default ToDoList;
