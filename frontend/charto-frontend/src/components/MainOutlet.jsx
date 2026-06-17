import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainOutlet = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default MainOutlet