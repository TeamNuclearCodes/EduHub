import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Forum from './pages/Forum.jsx'
import Question from './components/Question.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
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
