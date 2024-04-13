import { useState, useEffect } from "react"
import { apiBase } from "../constants"
import { UserAuth } from "../context/AuthContext"
import { HrtLn, Task } from "../components"
import { diffInDays } from "../utils/ToDo"
import { Button, AlertCard } from "../components";
import { MdOutlineLibraryAdd, MdEditDocument } from "react-icons/md";
import { ColorRing } from 'react-loader-spinner'
import axios from "axios"

const ToDo = () => {
  const [todoList, setTodoList] = useState([])
  const {auth} = UserAuth()
  const [error, setError] = useState(null);
  const [isLoading,setIsLoading] = useState(true)
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDesc: "",
    deadline: "",
    complete: false,
    edit: false
  });

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const editTask = (task) => {
    setNewTask({
      taskName:task.taskName,
      taskDesc: task.taskDesc,
      deadline:  String(task.deadline).substring(0,10),
      edit: true,
      complete: task.complete,
      _id:task._id
    })
  }

  const addTask = async (event) => {
    event.preventDefault();
    const dueDate = new Date(newTask.deadline);
    if (diffInDays(dueDate,true) > 0) {
      if (error) {
        setError(null);
      }

      const requestBody = {
        taskName: newTask.taskName,
        taskDesc: newTask.taskDesc,
        deadline: newTask.deadline,
      }
      
      if (newTask.edit) {
        await axios.patch(`${apiBase}/api/todo/${newTask._id}`, requestBody, {
          headers: {
            authorization: auth.token
          }
        }).then(() => fetchTodos());

      } else {
        await axios.post(`${apiBase}/api/todo/`, requestBody, {
          headers: {
            authorization: auth.token
          }
        }).then(() => fetchTodos());
      }

      setNewTask({ taskName: "", taskDesc: "", deadline: "", complete: false, edit: false });
    } else {
      setError("Enter a valid date");
    }
  };

  const fetchTodos = async () => {
    setIsLoading(true)
    await axios.get(`${apiBase}/api/todo/all`, {
      headers: {
        authorization: auth.token
      }
    }).then(res => {
      setTodoList(res.data);
      setIsLoading(false);
    })
  }

  const deleteTask = async (taskId) => {
    await axios.delete(`${apiBase}/api/todo/${taskId}`, {
      headers: {
        authorization: auth.token
      }
    }).then(() => fetchTodos());
  };

  useEffect(() => {
    fetchTodos()
  },[])

  return (
    <div className="container mt-4 px-2">
      <h2 className="text-4xl mb-2 bg-clip-text bg-gradient text-transparent w-3/12 max-xl:w-full font-[500]">Manage To-Dos</h2>
      <HrtLn/>
      <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
        <div className="flex w-4/12 max-md:w-full">
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
              {newTask.edit ? (
                <Button type="submit" text="Save Task" variant="gradient" leftIcon={<MdEditDocument />}/>
              ) : (
                <Button type="submit" text="Add Task" variant="gradient" leftIcon={<MdOutlineLibraryAdd />}/>
              )}
            </form>
          </div>
        </div>
        <div className="flex flex-col align-middle w-8/12 px-2 max-md:w-full items-center">
          {!isLoading ? todoList.map((task) => (
            <div className="flex w-full flex-col my-1">
              <Task task={task} manage="true" deadline={diffInDays(new Date(task?.deadline))} deleteTask={deleteTask} editTask={editTask}/>
            </div>
          )) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#5b21b6', '#681faa','#721da1', '#761c9e', '#86198f']}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ToDo