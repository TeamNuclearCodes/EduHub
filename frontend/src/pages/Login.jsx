import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [user,setUser] = useState({username:''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/auth/login',{
      method:'POST',
      headers:{
        "content-Type":"application/json"
      },
      body: JSON.stringify({username:user.username})

    }).then(res => res.json()).then(data => {
      localStorage.setItem('auth',JSON.stringify(data))
      navigate('/')
    })
  }

  return (
    <div className='container p-4'>
      <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center bg-gray-500 rounded-md p-4 w-8/12 max-xl:w-full flex-col gap-3'>
          <h3 className='text-3xl max-md:text-xl'>Login | Signup</h3>
          <input type="username" placeholder='Username' className='form__input'
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login