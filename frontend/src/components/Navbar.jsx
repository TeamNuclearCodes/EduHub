import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from  '.';
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { IoMdPerson, IoMdSettings, IoMdClose } from "react-icons/io";
import { MdSpaceDashboard, MdForum, MdGroup, MdPersonSearch } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const navbarLinks = [
    {title:"Dashboard", link: "/dashboard", icon: MdSpaceDashboard },
    {title:"Ask", link: "/ask", icon: MdForum },
    {title:"Chat", link:"/chat", icon: MdGroup}
]

const sideBarLinks = [
  {title: "Settings", link: "/profile", icon: IoMdSettings},
  {title: "Find People", link: "/profile/find", icon: MdPersonSearch},  
]

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
    <div className="bg-purple-800 justify-center flex pb-1">
      <div className='container text-white p-2 flex justify-between items-center'>
        <div className="flex gap-1 align-middle items-center text-black">
            <Link to="/">
              <img src="/logo.png" width="140px"/>
            </Link>
          <div className='flex gap-1 items-center mt-3 max-md:hidden'>
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
                className="h-12 w-12 rounded-full bg-zinc-800 border-2 border-zinc-950 hover:cursor-pointer max-md:hidden"
                onClick={() => setShowMenu(true)}
              />
              <div className="max-md:flex items-center align-middle hidden hover:cursor-pointer">
                <IoMenu size={48} onClick={() => setShowMenu(true)}/>
              </div>
              
              {showMenu && (
                <div>
                  <div className="absolute w-full h-full top-0 right-0 backdrop-blur-sm inset-y-0 z-10" onClick={() => setShowMenu(false)}/>
                  <div className="absolute top-0 right-0 bg-zinc-950 px-4 py-2 sm:rounded-l-md h-full w-3/12 max-xl:w-4/12 max-lg:w-5/12 max-md:w-6/12 max-sm:w-full sm:border-zinc-800 z-20">
                    <div className="flex gap-2 items-center w-full mb-2 justify-between">
                      <div className="flex gap-2 items-center w-full">
                        <img src={auth.profileImage} className="h-14 w-14 rounded-full border-2 border-zinc-900" />
                        <div className="flex flex-col align-middle">
                          <h3 className="text-xl">{auth.name}</h3>
                          <span className="text-sm text-zinc-500">@{auth.username}</span>
                        </div>
                      </div>
                      <button className="border rounded-md px-2 py-1 border-zinc-700 hover:bg-zinc-800" onClick={() => setShowMenu(false)}>
                        <IoMdClose size={25}/>
                      </button>
                    </div>
                    <hr className="border-zinc-800"/>
                    {/* Links on the navbar. Display it when max-md breakpoint hits */}
                    <div className="hidden max-md:flex flex-col gap-2 p-2">
                      {navbarLinks.map((link) => (
                        <NavLink to={link.link} key={link.link}
                          className={({isActive}) => {
                            if(isActive) {
                              return 'flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center text-[#681faa]'
                            } else {
                              return 'flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center'
                            }
                        }}
                        onClick={() => setShowMenu(false)}
                        >
                          {<link.icon size={25}/>}{link.title}
                        </NavLink>
                      ))}
                    </div>
                    <hr className="border-zinc-800 hidden max-md:block"/>
                    {/* sidebar links */}
                    <div className="flex flex-col gap-2 p-2">
                      <button  onClick={() => redirect(`/p/${auth.username}`)} className="flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center">
                        <IoMdPerson size={25}/> Your Public Profile
                      </button>
                      {sideBarLinks.map((link) => (
                        <NavLink to={link.link} key={link.link}
                          className={({isActive}) => {
                            if(isActive) {
                              return 'flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center text-[#681faa]'
                            } else {
                              return 'flex gap-2 hover:bg-zinc-800 p-2 rounded-md items-center'
                            }
                        }}
                        onClick={() => setShowMenu(false)}
                        end
                        >
                          {<link.icon size={25}/>}{link.title}
                        </NavLink>
                      ))}
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