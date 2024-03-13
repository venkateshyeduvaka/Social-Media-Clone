import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MdDeleteOutline } from "react-icons/md";

import {getUser} from "../api/UserRequests"
const Conversation = ({ data, currentUser,online }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
          //console.log("con-k")
          //console.log(data)
          //console.log(data._doc.firstname)
         setUserData(data._doc)
        // dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])


  return (
    <>
      <div className="flex justify-between items-center ">
        <div className="flex justify-between items-center"> 
          <div className="relative">
          <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="rounded-full"
           
            style={{ width: "50px", height: "50px" }}
          />
          {online && <div className="absolute right-0 bottom-0 bg-green-400 w-3 h-3 rounded-full"></div>}
          </div>
          <div className="flex flex-col items-start justify-center ml-2" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span>{online? "Online" : "Offline"}</span>
          </div>
          <div className="flex relitive">
           
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;