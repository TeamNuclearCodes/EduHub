import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Forum, Question, Home} from './pages'

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
        path:'forum',
        element: <Forum/>
      },
      {
        path:'forum/:slug',
        element: <Question/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
