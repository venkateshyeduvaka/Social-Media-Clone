import React, { useEffect } from 'react'
import PostCard from './PostCard'

import { useParams } from "react-router-dom";

import {useDispatch,useSelector} from "react-redux"
import { getTimelinePosts } from '../actions/PostsAction'



const PostsMap = () => {

  const params = useParams()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.authReducer.authData)
    let {posts,loading}=useSelector((state)=>state.postReducer)

    useEffect(()=>{
        dispatch(getTimelinePosts(user._id))
    },[])

    if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)

  return (
    <div className='flex flex-col gap-3 '>
       {posts.map((post, id)=>{
            return <PostCard data={post} id={id}/>
        })}
    </div>
  )
}

export default PostsMap 
