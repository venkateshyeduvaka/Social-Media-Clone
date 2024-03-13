import React,{useState,useEffect} from 'react'

import { useNavigate, useNavigation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { unfollowUser,followUser } from '../actions/UserAction';
import {chatSchedule, userChats} from "../api/ChatRequests"

import Comment from "../img/comment.png";

const UserFollow = ({person}) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()

  const [requestChat, setRequestChats] = useState([]);

  const navgate=useNavigate()

  //venky 
  const [chatMembers,setChatMembers]=useState([])
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };



  const handleChat=()=>{
    console.log("venkatesh-code")
    let chatdata={
      senderId:user._id,
      receiverId:person._id
    }

    let mem=[user._id,person._id]
    const condiction1 = chatMembers.find(member => JSON.stringify(member) === JSON.stringify(mem));
    const condiction2 = chatMembers.find(each => each[0] === mem[1] && each[1] === mem[0]);
     
    //console.log("ramunaidu")
    //console.log(chatMembers)
    //console.log(venky)
    //console.log(ramu)
    //console.log(venky!==undefined)
     if(condiction1===undefined && condiction2===undefined){
            chatSchedule(chatdata)
            setChatMembers((prev)=>[...prev,mem])
            navgate("/chat")
      }
      else{
           navgate("/chat")
      }

  }


  useEffect(() => {
    const getChats = async () => {

      try {
        const { data } = await userChats(user._id);
        setRequestChats(data);
        let chatreq=data.map((each)=>each.members)
        setChatMembers(chatreq)

      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);



  return (
    <div className=' flex items-center justify-between'>
                    <div className='flex gap-5'>
                        <img src={person.profilePicture? publicFolder + person.profilePicture: publicFolder + "defaultProfile.png"} className=' h-10 w-10 rounded-full' alt=""/>
                        <div className='flex flex-col  justify-start items-center'>
                            <span className='font-bold text-sm'>{person.firstname}</span>
                            <span className='text-sm'>@{person.username}</span>
                        </div> 
                    </div>
                    <img onClick={handleChat} src={Comment} alt="" className='h-6 w-6 hover:cursor-pointer' />
                    <button  onClick={handleFollow} type='button' className={`flex items-center  justify-center text-white border-none  rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-20 pl-8 pr-8   ${following ? 'bg-orange-300 ' : ' bg-orange-500'}`}> {following ? "Unfollow" : "Follow"}</button>
                </div>
  )
}


export default UserFollow