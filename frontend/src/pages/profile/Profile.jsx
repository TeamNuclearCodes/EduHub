import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { apiBase } from "../../constants";
import { IoIosInformationCircle } from "react-icons/io";
import { BiSolidInstitution } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";

/*
  TODO
  - Add a 404 page :), temporarily redirects to /
*/

const Profile = () => {
  const { username } = useParams();
  const [user,setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const {auth} = UserAuth();
  const navigate = useNavigate();

  const addFriend = async () => {
    if(auth.username) {
      await axios.post(`${apiBase}/api/user/addFriend`, {friend: username}, {
        headers: {
          authorization: auth.token
        }
      }).then(res => {
        if (res.data.message) setUser({...user, isFriend: true});
      });
    }
    else navigate(`/login?to=/p/${username}`);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/api/public/user/${username}`,{
      headers: {
        authorization: auth.token || ''
      }
    })
    .then((res) => res.json())
    .then(data => {
      if (data.error) navigate('/')
      else {
        setUser(data);
        setLoading(false);
      }
    });
  },[username])
  
  if (loading) {
    return <>Loading</>
  }

  return (
    <div className='container p-2 w-8/12 max-xl:w-10/12 max-md:w-full'>
      <div className='flex max-md:flex-col gap-2'>
        <div className="w-3/12 rounded-md flex justify-center items-center flex-col gap-2 p-2">
          <img src={user.profileImage} className="h-56 rounded-full bg-zinc-800 border border-zinc-500" />
          <div className="text-left w-full">
            <h4 className="text-xl font-[600]">{user.name}</h4>
            <h5 className="text-md text-zinc-400 mb-2">@{user.username}</h5>
            {user.username === auth.username ? (
              <button
                className="w-full bg-purple-800 hover:bg-purple-900 border border-purple-600 rounded-md focus:rounded-md py-1"
                onClick={() => navigate('/profile')}
              >
                Edit Profile
              </button>
            ): (user.isFriend ? (
                  <button
                  className="w-full bg-green-800 hover:bg-green-900 border border-green-600 rounded-md focus:rounded-md py-1"
                  disabled
                  >
                    Friends
                  </button>
                ) : (
                  <button
                  className="w-full bg-purple-800 hover:bg-purple-900 border border-purple-600 rounded-md focus:rounded-md py-1"
                  onClick={() => addFriend()}
                  >
                    Add Friend
                  </button>
            ))}
            <hr className="boder border-zinc-700 mt-2 mb-1"/>
            <p className="flex justify-start items-center gap-2 p-1 text-sm"><BiSolidInstitution size={20}/>{user.college}</p>
            <p className="flex justify-start items-center gap-2 p-1 text-sm"><IoIosInformationCircle size={20}/>Semester {user.semester}</p>
            <p className="flex justify-start items-center gap-2 p-1 text-sm"><MdOutlineDateRange size={20}/>{user.date}</p>
          </div>
        </div>
        <div className="w-9-12 w-full p-2 rounded-md border border-zinc-700">
          <h3 className="text-center text-2xl">User Achievements</h3>
          <hr className="boder border-zinc-700 my-2"/>
          <div className="flex justify-center items-center h-full">
            Nothing to show
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile