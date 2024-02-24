import React from "react";
import Login from "./components/Login";
import Ordering from "./components/ordering";
import Register from "./components/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/order",
    element: <Ordering />
  },
]);


function App() {
  return (
    <>
      {/* <Ordering />
      <Login /> */}

      <RouterProvider exact router={router} />
    </>
  );
}

export default App;
