import React,{useEffect, useState}  from 'react'

import { UilPen } from "@iconscout/react-unicons"; 
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as UserApi from "../api/UserRequests"


import ProfileModal from './ProfileModal'
import {logout} from "../actions/AuthActions"



const InfoCard = () => {

  const dispatch = useDispatch()
  const params = useParams();
  const [profileUser, setProfileUser] = useState({})
    
  const [isModalOpen, setModalOpen] = useState(false);

  const profileUserId = params.id;

  const {user}=useSelector((state)=>state.authReducer.authData)

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

 const handleLogOut=()=>{
  dispatch(logout())
 }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);


  return (
    <div className='flex flex-col gap-3 align-center  bg-white p-3 w-90 rounded-lg'>
        <div className='flex  justify-between align-center hover:cursor-pointer'>
            <h4 className='ml-5'>Profile Info</h4>
            {user._id===profileUserId ?(<>
            <UilPen  onClick={openModal}/>
            <ProfileModal
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            closeModal={closeModal}
            data = {user}
          />
          </>
          ):""}
        </div>

        <div className="ml-5">
            <span>
            <b>Status </b>
            </span>
            <span>{profileUser.relationship}</span>
        </div>

        <div className="ml-5">
            <span>
            <b>Lives in </b>
            </span>
            <span>{profileUser.livesIn}</span>
       </div>

        <div className="ml-5">
            <span>
            <b>Works at </b>
            </span>
            <span>{profileUser.worksAt}</span>
        </div>

        <button onClick={handleLogOut} className='ml-auto mt-16  self-center flex items-center bg-orange-500  justify-center text-white border-none  rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-24 pl-8 pr-8'>Logout</button>
    </div>
  )
}

export default InfoCard