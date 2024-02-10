import { NavLink, useNavigate } from "react-router-dom"
import { navbarLinks } from "../constants"
import getAuth from '../utils/getAuth'
import { Button } from  '.'

const Navbar = () => {
  const navigate = useNavigate()
  const isAuthenticated = getAuth()
  const logOut = () => {
    localStorage.removeItem('auth')
    navigate('/')
  }

  return (
    <div className="bg-gradient justify-center flex">
      <div className='container text-white py-2 flex justify-between max-md:px-2'>
        <div className="flex gap-3 align-middle items-center text-black">
              LOGO
          <div className='flex gap-3'>
            {navbarLinks.map((link) => (
              <NavLink to={link.link} key={link.link}
                className={({isActive}) => {
                  if(isActive) {
                    return 'underline text-gray-900 underline-offset-4 font-[600]'
                  } else {
                    return 'text-zinc-800 hover:text-zinc-900 font-[500]'
                  }
              }}>
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <Button variant="black" handleClick={logOut} text="Logout" extraClasses="border border-black hover:border hover:border-black"/>
            </>
          ) : (
            <>
              <Button variant="black" handleClick={() => navigate('/login')} text="Login" extraClasses="border border-black hover:border hover:border-black"/>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar