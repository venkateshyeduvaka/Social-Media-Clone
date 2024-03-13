import React, { useEffect, useState } from 'react'

import UserFollow from './UserFollow';
import { useSelector } from "react-redux";
import { getAllUser } from "../api/UserRequests"




const ProfileFollow = () => {

  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      //console.log("venky da")
     //console.log(data)
    };
    fetchPersons();
    
  }, []);
  

  return (
    <div className=' flex flex-col gap-2 rounded-md'>
        <h3>People you may know</h3>
        {persons.map((person,id)=>{
          if (person._id !== user._id) return <UserFollow person={person} key={id}/>
        })}
    </div>
  )
}

export default ProfileFollow 

