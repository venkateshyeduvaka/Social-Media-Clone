import React,{useState} from 'react'
import Logo from '../images/logo.png'

import { logIn,signUp } from '../actions/AuthActions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";





const Auth = () => {
    
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };

  const loading = useSelector((state) => state.authReducer.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };
    



  return (
    <div className='flex h-screen w-screen justify-center items-center'>
    <div className='flex  mr-10 '>
      <img src={Logo} alt="" className='h-10 w-12 m-2 mt-8' />
      <div>
        <h1 className=' text-orange-400 text-5xl font-bold mb-5 '>Social Connect</h1>
        <h6 className=' text-black font-bold '>Explore the ideas throughout the world</h6>
      </div> 
    </div>

   {/*righ side*/}

    <div className="bg-white shadow-lg justify-center items-center p-3  rounded-lg">
      <form className="flex flex-col  gap-3 w-full" onSubmit={handleSubmit}>
        <h3>{isSignUp?"Sign up":"Log In"}</h3>

        {isSignUp && 
        <div className=' flex gap-2 '>
          <input
            type="text"
            placeholder="First Name"
            className=" border-none outline-none  bg-slate-200  rounded-lg p-2  flex-1"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
            
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border-none outline-none  bg-slate-200  rounded-lg  p-2 flex-1"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
            
          />
        </div>
        }

        <div className='flex gap-2'>
          <input
            type="text"
            className="border-none outline-none  bg-slate-200  rounded-lg  p-2 flex-1 "
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={data.username}
            
          />
        </div>

        <div className='flex gap-2 '>
          <input
            type="password"
            className="border-none outline-none  bg-slate-200  rounded-lg  p-2 flex-1"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
            
          />
          {isSignUp &&
          <input
            type="password"
            className="border-none outline-none  bg-slate-200  rounded-lg  p-2 flex-1"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={data.confirmpass}
          
          />
          }
        </div>
        <span className={`text-red-700 text-lg self-end mr-5 ${confirmPass ? 'hidden' : 'block'}`} >
            *Confirm password is not same
          </span>

        <div className='flex '>
            <span className=' text-black text-sm underline hover:cursor-pointer' onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}>{isSignUp?"Already have an account. Login!":"Don't have an account Sign up"}</span>
            <button className="flex items-center bg-orange-500  justify-center text-white border-none  rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-22 pl-8 pr-8 ml-3 self-end"  type="Submit">{loading ? "Loading...":isSignUp ? "SignUp" : "Login"}</button>
        </div>
       
      </form>
    </div>

</div>
  )
}

export default Auth
