import { Link, NavLink, useNavigate } from "react-router-dom"
import { navbarLinks } from "../constants"
import { Button } from  '.'
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { IoMdPerson, IoMdSettings, IoMdClose } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate()
  const {auth,setAuth} = UserAuth()
  const [showMenu,setShowMenu] = useState(false)

  const redirect = (url) => {
    navigate(url)
    setShowMenu(false)
  }

  const logOut = () => {
    localStorage.removeItem('auth')
    setAuth({
      _id: "",
      username: "",
      chatgrps: [],
    })
    setShowMenu(false)
    navigate('/')
  }

  return (
    <div className="bg-gradient justify-center flex pb-1">
      <div className='container text-white p-2 flex justify-between items-center'>
        <div className="flex gap-1 align-middle items-center text-black">
            <Link to="/">
              <img src="/logo.png" width="140px"/>
            </Link>
          <div className='flex gap-1 items-center mt-3'>
            {navbarLinks.map((link) => (
              <NavLink to={link.link} key={link.link}
                className={({isActive}) => {
                  if(isActive) {
                    return 'bg-zinc-950 py-1 px-2 flex items-center rounded-full font-[600] focus:rounded-full text-[#681faa]'
                  } else {
                    return 'text-purple-200 flex items-center hover:text-zinc-900 font-[500] py-1 px-2 rounded-full focus:rounded-full'
                  }
              }}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="">
          {auth._id ? (
            <div className="static">
              <img src={auth.profileImage}
                className="h-14 w-14 rounded-full bg-zinc-800 border-2 border-zinc-950 hover:cursor-pointer"
                onClick={() => setShowMenu(true)}
              />
              
              {showMenu && (
                <div>
                  <div className="absolute w-full h-full top-0 right-0 backdrop-blur-sm inset-y-0 z-10" onClick={() => setShowMenu(false)}/>
                  <div className="absolute top-0 right-0 bg-zinc-950 px-4 py-2 sm:rounded-l-md h-full w-3/12 max-lg:w-4/12 max-md:w-5/12 max-sm:w-full sm:border-zinc-800 z-20">
                    <div className="flex gap-2 items-center w-full mb-2 justify-between">
                      <div className="flex gap-2 items-center w-full">
                        <img src={auth.profileImage} className="h-14 w-14 rounded-full border-2 border-zinc-900" />
                        <h3 className="text-xl">{auth.name}</h3>
                      </div>
                      <button className="border rounded-md px-2 py-1 border-zinc-700 hover:bg-zinc-800" onClick={() => setShowMenu(false)}>
                        <IoMdClose size={25}/>
                      </button>
                    </div>
                    <hr className="border-zinc-800"/>
                    <div className="flex flex-col gap-2 p-2">
                      <button  onClick={() => redirect(`/p/${auth.username}`)} className="flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center">
                        <IoMdPerson size={25}/> Your Public Profile
                      </button>
                      <button onClick={() => redirect('/profile')} className="flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center">
                        <IoMdSettings size={25}/> Account Settings
                      </button>
                      <button  onClick={() => redirect('/profile/find')} className="flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center">
                        <MdPersonSearch size={25}/> Find People
                      </button>
                      <button className="flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center text-red-500" onClick={logOut}>
                        <PiSignOutBold size={25}/> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="black" handleClick={() => navigate('/login')} text="Login" extraClasses="border border-black hover:border hover:border-black"
                leftIcon={<PiSignInBold/>}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar