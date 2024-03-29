import React from "react";
import Login from "./components/Login";
import Ordering from "./components/ordering";
import Register from "./components/Register";
import Support from "./components/support";
import Inventory from "./components/inventory";
import Management from "./components/management";
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
  {
    path: "/support",
    element: <Support />
  },
  {
    path: "/support",
    element: <Support />
  },
  {
    path: "/inventory",
    element: <Inventory />
  },
  {
    path: "/management",
    element: <Management />
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
