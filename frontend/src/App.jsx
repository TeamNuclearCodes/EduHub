import './App.css'
import {Navbar, Footer, Question} from './components'
import { Outlet } from 'react-router-dom' 

function App() {
  return (
    <div>
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  )
}

export default App
