import React from 'react'
import ProfileSearch from './ProfileSearch'
import InfoCard from './InfoCard'
import ProfileFollow from './ProfileFollow'

const ProfileLeft = () => {
  return (
    <div className='ml-3 flex flex-col gap-3 align-center  overflow-auto'>
        <ProfileSearch/> 
        <InfoCard/> 
        <ProfileFollow/>
    </div>
  )
}

export default ProfileLeft