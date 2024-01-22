import { NavLink } from "react-router-dom"
import { navbarLinks } from "../constants"

const Navbar = () => {
  return (
    <div className='bg-black text-white p-4 flex justify-between text-gra'>
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
        {/* place for sign in button etc :) */}
      </div>
    </div>
  )
}

export default Navbar