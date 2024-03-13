import React from 'react'

import PostSide from '../components/PostSide'
import ProfileSide from '../components/ProfileSide'
import TrendsSide from '../components/TrendsSide'


const Home = () => {
  return (
    <div className='grid grid-cols-[20rem,auto,16rem]'>
     <ProfileSide/>
      <PostSide/>
      <TrendsSide/>
    </div>
  )
}




export default Home