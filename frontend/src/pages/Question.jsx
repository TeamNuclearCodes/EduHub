import { ProtectedRoute } from "../components"
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react"
import getAuth from "../utils/getAuth"

const Question = () => {
  const [question,setQuestion] = useState({question:'',comments:[],author:[]})
  const [comment,setComment] = useState({comment:''})
  const {slug} = useParams()
  const auth = getAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:5000/api/questions/${slug}`,{
      method:'PATCH',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        comment:comment,
        author: auth._id
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
    })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/qguestions/${slug}`)
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