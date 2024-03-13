import React,{useState} from 'react'

import Comment from '../img/comment.png'
import Share from '../img/share.png'
import Heart from '../img/like.png'
import NotLike from '../img/notlike.png'
import { useSelector } from 'react-redux'
import {likePost} from "../api/PostsRequests"


const PostCard = ({data}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  }


  return (
    <div className='flex flex-col p-2 bg-white  rounded-lg gap-2 m-3'>
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} className='w-full  max-h-30  object-cover rounded-md' alt=""/>

        <div className=" flex  items-start gap-2">
            <img src={liked?Heart: NotLike} alt="" className='hover:cursor-pointer' onClick={handleLike} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>

        <span>{likes} likes</span>

        <div className="">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
        
    </div>
  )
}

export default PostCard 