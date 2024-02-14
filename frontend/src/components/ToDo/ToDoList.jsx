import React, { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import { apiBase } from "../../constants";
import getAuth from "../../utils/getAuth";
import {UserAuth} from '../../context/AuthContext'
import { diffInDays } from "../../utils/ToDo";

const ToDoList = () => {
  const {auth} = UserAuth()
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDesc: "",
    deadline: "",
    complete: false,
  });

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const addTask = async (event) => {
    event.preventDefault();
    const dueDate = new Date(newTask.deadline);
    if (diffInDays(dueDate) > 0) {
      if (error) {
        setError(null);
      }
      await fetch(`${apiBase}/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: auth,
          name: newTask.taskName,
          desc: newTask.taskDesc,
          date: newTask.deadline,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      setTodoList([...todoList, { ...newTask, key: uuidv4() }]);
      setNewTask({ taskName: "", taskDesc: "", deadline: "", complete: false });
    } else {
      setError("Enter a valid date");
    }
  };

  const deleteTask = (taskKey) => {
    setTodoList(todoList.filter((task) => task.key !== taskKey));
  };

  return (
    <div>
      {error && <div className="bg-red-300 text-black">{error}</div>}
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
      {todoList.map((task) => (
        <div key={task.key} className="bg-white mb-15">
          <Task task={task} deadline={diffInDays(new Date(task?.deadline))}/>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
