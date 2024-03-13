import React,{ useState }  from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from '../actions/UserAction';
import { uploadImage } from '../actions/UploadAction';


const ProfileModal = ({isModalOpen,closeModal,data}) => {

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    closeModal()
  }


  return (
       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"

        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '60%',
            height: '80%',
            margin: 'auto',
            top: '15%',
            left: '15%',
            position: 'absolute',
            borderRadius: '15px',
          },
        }}
      >
      <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
        <h3 className=' self-center text-lg text-gray-800  font-bold'>Your info</h3>
        <div className='flex gap-2 '>
          <input
          value={formData.firstname}
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            name="firstname"
            onChange={handleChange}
            placeholder="First Name"
          />

          <input
          value={formData.lastname}
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            name="lastname"
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className='flex gap-2'>
          <input
          value={formData.worksAt}
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            name="worksAt"
            onChange={handleChange}
            placeholder="Works at"
          />
        </div>

        <div className='flex gap-2'>
          <input
           value={formData.livesIn}
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            name="livesIn"
            onChange={handleChange}
            placeholder="LIves in"
          />

          <input
           value={formData.country}
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            name="country"
            onChange={handleChange}
            placeholder="Country"
          />
        </div>

        <div className='flex gap-2'>
          <input
          value={formData.relationship}
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handleChange}
          />
        </div>


        <div className='flex gap-2'>
            Profile Image 
            <input type="file"  name="profileImage" onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button type="submit" className="flex items-center bg-orange-500  justify-center text-white border-none  rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-6 w-16 pl-8 pr-8 ml-3 self-end">Update</button>
      </form>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    
  )
}

export default ProfileModal