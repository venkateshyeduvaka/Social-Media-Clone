import React,{useState} from 'react'

import Home from "../img/home.png";
import Noti from "../img/noti.png";
import Comment from "../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons"; 



import { Link } from 'react-router-dom';

import TrendCard from './TrendCard';

import ShareModal from './ShareModal';

const TrendsSide = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex flex-col  gap-3'>
      <div className="flex gap-2 mt-3 justify-around">
       <Link to="../home"> <img src={Home} alt="" className='h-6 w-6' /></Link> 
        <UilSetting  className='h-6 w-6'/>
        <img src={Noti} alt="" className='h-6 w-6' />
        <Link to="../chat">  <img src={Comment} alt="" className='h-6 w-6' /> </Link>
       
      </div>

      <TrendCard />

      <button onClick={openModal} className=' self-center flex items-center bg-orange-500  justify-center text-white border-none  rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8   w-48 pl-8 pr-8'>
        Share
      </button>
      <ShareModal isModalOpen={isModalOpen} setModalOpen={setModalOpen}
            closeModal={closeModal}/>


    </div>
  )
}

export default TrendsSide 

