import { useState } from "react"
import {ProtectedRoute} from "../components"

const Ask = () => {
  const [question,setQuestion] = useState({user:"",question:""})

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(question)
  }

  return (
    <ProtectedRoute>
      <div className='container p-4'>

          <form className='flex flex-col justify-center items-center gap-3' onSubmit={handleSubmit}>
            <h3 className='text-xl'>Ask a Question</h3>
            <textarea required rows={10} placeholder='Wriet your question here' className='form__input'
              value={question.question}
              onChange={(e) => setQuestion({...question,question: e.target.value})}
            />
            <button type="submit">Submit</button>
          </form>

      </div>
    </ProtectedRoute>
  )
}

export default Ask