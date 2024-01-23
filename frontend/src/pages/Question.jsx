import { ProtectedRoute } from "../components"
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react"

const Question = () => {
  const [question,setQuestion] = useState({question:'',comments:[],author:[]})
  const {slug} = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${slug}`)
    .then(res => res.json())
    .then(data => setQuestion({
      question: data.question,
      comments: data.comments,
      author: data.author
    }))
  },[slug])

  return (
    <ProtectedRoute>
      <div className="container p-4">
          <div className="bg-gray-300 p-2 rounded-md w-full flex gap-3 flex-col">
            <h3 className="text-xl">Question</h3>
            <hr className="border border-black"/>
            <p className="text-xl">{question.question}</p>
            <hr className="border border-black"/>
            <span className="text-sm">Asked by : {question?.author?.username}</span>
          </div>
      </div>
    </ProtectedRoute>
  )
}

export default Question