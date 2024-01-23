import { ProtectedRoute } from "../components"
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react"

const Question = () => {
  const [question,setQuestion] = useState({question:'',comments:[]})
  const {slug} = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${slug}`)
    .then(res => res.json())
    .then(data => setQuestion({
      question: data.question,
      comments: data.comments
    }))
  },[slug])

  return (
    <ProtectedRoute>
      <div>
      {question.question}
      </div>
    </ProtectedRoute>
  )
}

export default Question