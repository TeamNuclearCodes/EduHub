import { useState, useEffect } from "react"
import {ProtectedRoute, Button, HrtLn} from "../../components"
import {useNavigate} from 'react-router-dom'
import getAuth from "../../utils/getAuth"

const Ask = () => {
  const [question,setQuestion] = useState({question:""})
  const [questions,setQuestions] = useState([])
  const user = getAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/questions/new',{
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
    fetch('http://localhost:5000/api/questions').then(res => res.json()).then(
      data => setQuestions(data)
    )
  },[])


  return (
    <ProtectedRoute>
      <div className='container p-4'>
        <form className='flex flex-col justify-center items-center gap-3 pb-2' onSubmit={handleSubmit}>
          <h3 className='text-xl'>Ask a Question</h3>
          <textarea required rows={10} placeholder='Wriet your question here' className='form__input'
            value={question.question}
            onChange={(e) => setQuestion({...question,question: e.target.value})}
          />
          <Button type="submit" text="Submit" variant="black"/>
        </form>
        <HrtLn/>
      </div>
    </ProtectedRoute>
  )
}

export default Ask