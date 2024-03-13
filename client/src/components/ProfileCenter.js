import React from 'react'

import ProfileCard from './ProfileCard'
import PostShare from './PostShare'
import PostsMap from './PostsMap'

const ProfileCenter = () => {
  return (
    <div className='flex flex-col gap-1 m-3 h-screen overflow-auto custom-scrollbar'>
        <ProfileCard location="profilePage"/>
        <PostShare/>
        <PostsMap/>

    </div>
  )
}

export default ProfileCenter 
