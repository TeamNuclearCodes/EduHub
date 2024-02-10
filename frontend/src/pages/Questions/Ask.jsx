import { useState, useEffect } from "react"
import {ProtectedRoute, Button, HrtLn, Question} from "../../components"
import {useNavigate} from 'react-router-dom'
import getAuth from "../../utils/getAuth"
import { apiBase } from "../../constants"

const Ask = () => {
  const [question,setQuestion] = useState({question:" "})
  const [questions,setQuestions] = useState([])
  const user = getAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${apiBase}/api/questions/new`,{
      method:'POST',
      headers:{
        "Content-Type":'application/json',
      },
      body: JSON.stringify({
        question: question.question,
        author: user._id
      })
    }).then(res => res.json()).then(data => {
      navigate(`/question/${data.id}`)
    })
  }

  useEffect(() => {
    fetch(`${apiBase}/api/questions`).then(res => res.json()).then(
      data => setQuestions(data)
    )
  },[])


  return (
    <ProtectedRoute>
      <div className='container p-4'>
        <form className='flex flex-col justify-center items-center gap-3 pb-2' onSubmit={handleSubmit}>
          <h3 className='text-xl'>Ask a Question</h3>
          <textarea rows={10} placeholder='Wriet your question here' className='form__input inputdata'
            value={question.question}
            onChange={(e) => setQuestion({...question,question: e.target.value})}
          />
          <Button type="submit" text="Submit" variant="gradient"/>
        </form>
        <HrtLn/>
        <div className="p-2 flex flex-col gap-2">
          <h4 className="text-[20px] underline underline-offset-8 pb-2">Recent Questions</h4>
          {questions.map((question) => (
            <Question question={question}/>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Ask