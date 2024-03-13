


import React, { useState, useRef } from "react";

import ProfileImage from "../img/profileImg.jpg";

import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage,uploadPost } from "../actions/UploadAction"


const PostShare = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const desc=useRef()

    const dispatch=useDispatch()

    const {user}=useSelector((state)=>state.authReducer.authData)


const handel=(event)=>{
  if(event.target.files && event.target.files[0]){
    let img=event.target.files[0]
    setImage({photo:URL.createObjectURL(img),})
  }
}

const handelpost = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };


const handelSubmit=(e)=>{
 e.preventDefault()

 const newPost={
  userId:user._id,
  desc:desc.current.value,

}

    if(image){
      const data=new FormData()
      const filename=Date.now()+image.name 
      data.append("name",filename)
      data.append("file",image)
      newPost.image=filename
      console.log(newPost)
      try {
      dispatch(uploadImage(data))
      } catch (error) {
      console.log(error)
      }

     }
     dispatch(uploadPost(newPost))
     resetShare();
    

}


  return (
    <div className='flex gap-3 bg-white p-3 rounded-md w-90 mt-2 ml-2'>
        <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} className='h-8 w-8 rounded-full' alt=""/>
        <div className=' flex flex-col w-90 gap-2'>
        
                <input type="text" ref={desc} required placeholder="What's happening" className=' bg-slate-100 rounded-md h-7 border-none outline-none'/>
                <div className=' flex justify-around mt-3'>
                    <div className='pr-9 flex items-center justify-center  text-sm rounded-lg hover:cursor-pointer text-green-400 ' onClick={()=>imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className=' pr-9 flex items-center justify-center  text-sm rounded-lg hover:cursor-pointer text-violet-400'>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className='  pr-9 flex items-center justify-center  text-sm rounded-lg hover:cursor-pointer text-red-400'>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className='pr-9 flex items-center justify-center  text-sm rounded-lg hover:cursor-pointer text-orange-500'>
                        <UilSchedule />
                        Shedule
                    </div>
                    <button type="Submit" onClick={handelSubmit}  className='flex items-center  bg-orange-500 justify-center text-white border-none  rounded-md  hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-20 pl-8 pr-8'  >Share</button>
                    <div className=' hidden'>
                          <input type='file' name='myImage' ref={imageRef} onChange={handelpost}/>
                    </div>
                </div>
                {image && (
                    <div className="max-h-30 object-cover rounded-md flex flex-col">
                        <UilTimes onClick={()=>setImage(null)} className="self-end hover:cursor-pointer"/>
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
        </div>
    </div>
  )
}

export default PostShare 
