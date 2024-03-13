import React from 'react'
import PostShare from './PostShare'
import PostsMap from './PostsMap'

const PostSide = () => {
  return (
    <div className='flex flex-col gap-2  h-screen overflow-auto custom-scrollbar ml-3'>
        <PostShare/>
        <PostsMap/>
    </div>
  )
}

export default PostSide 
