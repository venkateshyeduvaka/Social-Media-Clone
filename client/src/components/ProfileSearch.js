import React from 'react'
import Logo from '../images/logo.png'
import {UilSearch} from '@iconscout/react-unicons' 


const ProfileSearch = () => {
  return (
    <div className='flex gap-1 '>
        <img src={Logo} className='h-10 w-12 m-2' alt=""/>
        <div className='flex rounded p-2 gap-2 mt-2 h-12 bg-slate-100'>
            <input type="text" placeholder='#Explore' className='bg-transparent h-8 border-none outline-none'/>
            <div className='flex align-center justify-center bg-orange-400 rounded-md p-1 text-white'>
                <UilSearch/>
            </div>
        </div>
    </div>
  )
}

export default ProfileSearch