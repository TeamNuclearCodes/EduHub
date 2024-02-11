import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Ask, Question, Dashboard, Login, ToDo } from "./pages";
import Chat from "./pages/Chat/Chat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "todo",
        element: <ToDo />,
      },
      {
        path: "ask",
        element: <Ask />,
      },
      {
        path: "question/:slug",
        element: <Question />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
