import React from 'react'
import Cover from "../images/cover.jpg";
import Profile from "../images/profileImg.jpg";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"



const ProfileCard = ({location}) => {
    console.log("loc")
    console.log(location)

 const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className=' bg-white flex flex-col  rounded-lg relative gap-2 overflow-x-clip'>
        <div className='relative flex flex-col align-center justify-center w-full'>
            <img src={user.coverPicture ? serverPublic + user.coverPicture: serverPublic + "defaultCover.jpg"} className=' w-full' alt=""/>
            <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} className='w-24 h-24 rounded-full absolute -bottom-10 left-[40%]' alt=""/>
        </div>
        <div className="flex flex-col mt-6  items-center ">
            <span className=' font-bold'>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
        </div>
        <div className='flex flex-col gap-2'>
            <hr className='w-80 self-center border-1 border-solid  border-gray-500'/>
            <div className='flex self-center  gap-2 w-80  justify-around items-center'>
                <div className='flex flex-col  items-center justify-center gap-1'>
                   <span className=' font-bold'>{user.followers.length}</span>
                   <span>Followers</span>
                </div>
                <div className=' h-12  border-l-2 border-solid border-gray-500'></div>
                <div className='flex flex-col  items-center justify-center gap-1'>
                   <span className=' font-bold'>{user.following.length}</span>
                   <span>Following</span>
                </div>
                {location==="profilePage" &&(
                 <>  
                <div className=' h-12  border-l-2 border-solid border-gray-500'></div>
                <div className='flex flex-col  items-center justify-center gap-1'>
                   <span className=' font-bold'>{ posts.filter((post)=>post.userId === user._id).length}</span>
                   <span>Posts</span>
                </div>
                </> 
                )}
            </div> 
            <hr className='w-80 border-1 self-center border-solid  border-gray-500'/>
            <h5 className='self-center text-orange-500  text-base'>
                <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link></h5>
        </div>
    
    </div>
  )
}

export default ProfileCard 