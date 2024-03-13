import React from 'react'

import ProfileSearch from './ProfileSearch'
import ProfileCard from './ProfileCard'
import ProfileFollow from './ProfileFollow'

const ProfileSide = () => {
  return (
    <div className=' ml-3 flex flex-col gap-3 align-center overflow-auto'>
        <ProfileSearch/>
        <ProfileCard location="homePage"/>
        <ProfileFollow/>
    </div>
  )
}



export default ProfileSide