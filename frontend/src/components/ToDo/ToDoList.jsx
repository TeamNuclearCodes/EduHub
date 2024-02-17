import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { apiBase } from "../../constants";
import {UserAuth} from '../../context/AuthContext'
import { diffInDays } from "../../utils/ToDo";
import { Button, AlertCard } from "../../components";
import { MdOutlineLibraryAdd } from "react-icons/md";

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
    if (diffInDays(dueDate,true) > 0) {
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
        .then((data) => {
          setTodoList([...todoList, { ...newTask, key: uuidv4() }]);
          console.log(data)});

      setNewTask({ taskName: "", taskDesc: "", deadline: "", complete: false });
    } else {
      setError("Enter a valid date");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <form className="flex justify-around w-full flex-col gap-2" onSubmit={addTask}>
      {error && <AlertCard text={error} type="error"/>}
        <input
            type="text"
            name="taskName"
            className="inputdata bg-zinc-950"
            value={newTask.taskName}
            onChange={handleChange}
            placeholder="Task Name"
          />
          <input
            type="text"
            name="taskDesc"
            className="inputdata bg-zinc-950"
            value={newTask.taskDesc}
            onChange={handleChange}
            placeholder="Task Description"
          />
        <input
          type="date"
          name="deadline"
          className="inputdata bg-zinc-950"
          value={newTask.deadline}
          onChange={handleChange}
        />
        <Button type="submit" text="Add Task" variant="gradient" leftIcon={<MdOutlineLibraryAdd />}/>
      </form>
    </div>
  );
};

export default ToDoList;
