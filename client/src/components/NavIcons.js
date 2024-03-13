import React from "react";



import Home from "../img/home.png";
import Noti from "../img/noti.png";
import Comment from "../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons"; 


import { Link } from 'react-router-dom';



const NavIcons = () => {
  return (
    <div className="flex gap-2 mt-3 justify-around items-center">
      <Link to="../home">
        <img src={Home} className="h-8 w-8" alt="" />
      </Link>
      <UilSetting className="h-8 w-8"/>
      <img src={Noti} alt="" className="h-8 w-8" />
      <Link to="../chat">
        <img src={Comment} alt="" className="h-8 w-8" />
      </Link>
    </div>
  );
};

export default NavIcons;