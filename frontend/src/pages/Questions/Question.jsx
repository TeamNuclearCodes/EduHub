import { CommentCard, ProtectedRoute, Button, HrtLn } from "../../components"
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react"
import getAuth from "../../utils/getAuth"

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
        comment:comment.comment,
        author: auth._id
      })
    }).then(res => res.json()).then(data => {
      setQuestion({...question,comments:data.comments})
    })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/questions/${slug}`)
    .then(res => res.json())
    .then(data => setQuestion({
      question: data.question,
      comments: data.comments,
      author: data.author
    }))
    console.log(question)
  },[slug])

  return (
    <ProtectedRoute>
      <div className="container p-4">
          <div className="bg-gray-300 p-2 rounded-md w-full flex gap-3 flex-col">
            <h3 className="text-xl">Question</h3>
            <HrtLn/>
            <p className="text-xl whitespace-pre-wrap">{question.question}</p>
            <HrtLn/>
            <span className="text-sm">Asked by : <span className="font-[700]">{question?.author?.username}</span></span>
          </div>
          <form className="flex py-4 flex-col gap-3" onSubmit={handleSubmit}>
            <h4 className="text-md">Add a comment</h4>
            <textarea placeholder="Type your comment here..." required className="form__input w-full h-40 whitespace-pre-wrap" onChange={(e) => setComment({...comment,comment:e.target.value})} value={comment.comment}/>
            <Button type="submit" text="Add comment" variant="black" extraClasses="max-sm:w-full"/>
          </form>
          <HrtLn/>
          <div className="py-4 px-2 flex flex-col gap-2 bg-slate-100">
            {question.comments.length != 0 ? question.comments.map((comment) => (
              <CommentCard key={comment.comment} comment={comment} />
            )) : (
              <h5 className="text-md">No comments yet</h5>
            )}
          </div>
      </div>
    </ProtectedRoute>
  )
}

export default Question