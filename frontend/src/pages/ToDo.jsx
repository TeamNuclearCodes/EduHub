import { useState, useEffect } from "react"
import { apiBase } from "../constants"
import ToDoList from "../components/ToDo/ToDoList"
import { UserAuth } from "../context/AuthContext"
import { HrtLn, ProtectedRoute, Task } from "../components"
import { diffInDays } from "../utils/ToDo"

const ToDo = () => {
  const [todoList, setTodoList] = useState([])
  const {auth} = UserAuth()

  const fetchTodos = async () => {
    fetch(`${apiBase}/api/todo/all`,{
      method:'GET',
      headers: {
        authorization: JSON.stringify(auth)
      }
    }).then(res => res.json()).then(data => setTodoList(data))
  }

  const deleteTask = async (taskId) => {
    await fetch(`${apiBase}/api/todo/${taskId}`,{
      method:'DELETE',
      headers: {
        authorization: JSON.stringify(auth)
      }
    }).then(res => res.json()).then(data => {
      console.log(data)
      fetchTodos()
    })
  };

  useEffect(() => {
    fetchTodos()
  },[])

  return (
    <ProtectedRoute>
      <div className="container mt-4 px-2">
        <h2 className="text-4xl mb-2 bg-clip-text bg-gradient text-transparent w-3/12 max-xl:w-full font-[500]">Manage To-Dos</h2>
        <HrtLn/>
        <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
          <div className="flex w-4/12">
            <ToDoList/>
          </div>
          <div className="flex flex-col align-middle w-8/12 px-2">
            {todoList.map((task) => (
              <div className="flex w-full flex-col my-1">
                <Task task={task} manage="true" deadline={diffInDays(new Date(task?.deadline))} deleteTask={deleteTask}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default ToDo