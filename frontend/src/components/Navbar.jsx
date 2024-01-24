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
    <div className="bg-black justify-center flex">
      <div className='container text-white p-4 flex justify-between'>
        <div className="flex gap-3 align-middle items-center">
              LOGO
          <div className='flex gap-3'>
            {navbarLinks.map((link) => (
              <NavLink to={link.link} key={link.link}
                className={({isActive}) => {
                  if(isActive) {
                    return 'underline text-gray-400 underline-offset-4 font-[600]'
                  } else {
                    return 'text-white hover:text-gray-400'
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
              <Button variant="white" handleClick={logOut} text="Logout" extraClasses="border border-black hover:border hover:border-white"/>
            </>
          ) : (
            <>
              <Button variant="white" handleClick={() => navigate('/login')} text="Login" extraClasses="border border-black hover:border hover:border-white"/>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar