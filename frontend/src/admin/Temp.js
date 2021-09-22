import React, { useContext, useState } from "react";
import AdminNavbar from "./screens/navbar/Navbar";
import Home from "./screens/home/Home";
import { GlobalContext } from "../GlobalContext";

const Temp = (props) => {
  const { user } = useContext(GlobalContext);
  const [userData, setUserData] = user;

  console.log(userData);

  return (
    <div className="bg-gray-50 dark:bg-gray-800" >
      <AdminNavbar/>
      <Home/>
    </div>
  );
};

export default Temp;
