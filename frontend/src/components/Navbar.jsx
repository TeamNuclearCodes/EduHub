import { NavLink, useNavigate } from "react-router-dom"
import { navbarLinks } from "../constants"
import getAuth from '../utils/getAuth'

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
        <div className="flex gap-3">
              LOGO
          <div className='flex gap-3'>
            {navbarLinks.map((link) => (
              <NavLink to={link.link} key={link.link} style={({isActive}) => ({color: isActive ? '#64748b' : 'white'})}>
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        {/* lmao */}
        <div>
          {isAuthenticated ? (
            <>
            <button onClick={logOut}>LogOut</button>
            </>
          ) : (
            <>
            <button onClick={() => navigate('/login')}>LogIn</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar