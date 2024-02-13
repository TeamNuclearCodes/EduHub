import { useState, useEffect } from "react"
import { apiBase } from "../constants"

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
      comgin sooonnn
    </div>
  )
}

export default ToDo