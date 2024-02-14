import { useState, useEffect } from "react"
import { apiBase } from "../constants"
import ToDoList from "../components/ToDo/ToDoList"

const ToDo = () => {
  const [todo, setTodo] = useState(null)

  useEffect(() => {
    // fetch(`${apiBase}/api/todo`,{
    //   method:'GET',
    //   headers: {
    //     authorization: getUser()
    //   }
    // })
  },[])

  return (
    <div>
      <ToDoList/>
    </div>
  )
}

export default ToDo