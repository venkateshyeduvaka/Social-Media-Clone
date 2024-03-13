import React from 'react'

import ProfileLeft from '../components/ProfileLeft'
import ProfileCenter from '../components/ProfileCenter'
import TrendsSide from '../components/TrendsSide'

function Profile() {
  return (
    <div className='grid grid-cols-[20rem,auto,16rem]'>
      <ProfileLeft/>
      <ProfileCenter/>
      <TrendsSide/>
    </div>
  )
}

export default Profile 
