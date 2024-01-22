import './App.css'
import {Navbar, Footer, Question} from './components'
import { Outlet } from 'react-router-dom'
import Forum from './pages/Forum'


function App() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  )
}

export default App
