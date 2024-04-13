import { useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { Button } from '../../components'
import { MdEditDocument } from "react-icons/md";
import { profileSemesters, profileColleges, apiBase } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const {auth,setAuth} = UserAuth()
  const [user,setUser] = useState(auth)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({...user, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.patch(`${apiBase}/api/user/update`, {
      name: user.name,
      college: user.college,
      semester: user.semester
    } ,{
      headers: {
        authorization: auth.token
      }
    })
    setAuth({...auth, user})
    localStorage.setItem('auth', JSON.stringify(user))
  }

  const deleteAccount = async () => {
    await axios.get(`${apiBase}/api/user/deleteAccount`, {
      headers: {
        authorization: auth._id
      }
    }).then(() => {
      localStorage.removeItem('auth')
      setAuth({
        _id: "",
        username: "",
        chatgrps: [],
      })
      navigate('/')
    })
  }

  return (
    <div className="flex w-full flex-col p-2">
      <h3 className="text-2xl">Public profile</h3>
      <hr className="mt-2 border-zinc-600"/>
      <form className='flex gap-2 py-1' onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-2">
          <label className="text-sm font-[500]">Your name</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Your Name"
            className="inputdata bg-zinc-950"
            value={user.name}
            onChange={handleChange}
          />
          <label className="text-sm font-[500]">College</label>
          <select
            type="text"
            name="college"
            autoComplete="off"
            placeholder="College"
            className="inputdata bg-zinc-950"
            defaultValue={user?.college}
            onChange={handleChange}
          >
            {profileColleges.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-[500]">Current Semester</label>
          <select
            type="text"
            name="semester"
            autoComplete="off"
            placeholder="Semester"
            className="inputdata bg-zinc-950"
            defaultValue={user?.semester}
            onChange={handleChange}
          >
          {profileSemesters.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <Button text="Update Profile" variant="gradient" rightIcon={<MdEditDocument/>}/>
        </div>
      </form>
      <hr className="mt-2 border-zinc-600 my-2"/>
      <h3 className="text-2xl text-red-600">Delete account</h3>
      <p className="text-sm text-zinc-300 mb-2">Deleting your account will result in complete removal of your data. We won't be able to recover the lost data.</p>
      <Button text="Delete my account" variant="danger" extraClasses="text-2xl" handleClick={() => deleteAccount()}/>
    </div>
  )
}

export default EditProfile