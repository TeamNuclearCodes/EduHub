import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Ask, Question, Home, Login} from './pages'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'ask',
        element: <Ask/>
      },
      {
        path:'question/:slug',
        element: <Question/>
      },
      {
        path:'login',
        element: <Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
