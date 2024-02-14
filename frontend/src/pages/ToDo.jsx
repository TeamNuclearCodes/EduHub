import { useState, useEffect } from "react"
import { apiBase } from "../constants"
import ToDoList from "../components/ToDo/ToDoList"
import { UserAuth } from "../context/AuthContext"

const ToDo = () => {
  const [todoList, setTodoList] = useState(null)
  const {auth} = UserAuth()

  useEffect(() => {
    console.log(auth)
    fetch(`${apiBase}/api/todo`,{
      method:'GET',
      headers: {
        authorization: JSON.stringify(auth)
      }
    })
  },[])

  return (
    <div>
      <ToDoList/>
    </div>
  )
}

export default ToDo