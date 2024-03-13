import React, { useEffect, useState ,useRef} from "react";
import { getUser } from "../api/UserRequests";
import { addMessage, getMessages } from "../api/MessageRequests";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'


const ChatBox = ({ chat, currentUser,setSendMessage,receivedMessage }) => {

  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();


  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data._doc);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


  
  
  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])


  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])

//console.log("chat-da")
//console.log(userData)

  return(
    <div className="bg-slate-300 rounded-xl grid grid-rows-[14vh,60vh,13vh]">

        {chat ? (
            <>
                <div className="p-4 flex flex-col">
                    <div className="flex">
                    <img
                        src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                        alt="Profile"
                        style={{ width: "50px", height: "50px" }}
                        className="rounded-full"
                    />
                    <div className="flex flex-col items-start justify-center ml-2" style={{fontSize: '0.8rem'}}>
                        <span>{userData?.firstname} {userData?.lastname}</span> 
                    </div>
                    </div>
                   <hr style={{ width: "95%", border: "0.1px solid #ececec" }} />


                </div>
                <div className="flex flex-col gap-2 p-6 overflow-auto">
                    {messages.map((message) => (
                        <>
                        <div
                            className={
                            message.senderId === currentUser
                                ? "bg-buttonBg text-white p-2.5 rounded-lg max-h-20 max-w-40 w-auto flex flex-col gap-1 self-end rounded-r-lg bg-gradient-to-r from-blue-400 to-cyan-400"
                                : "bg-buttonBg text-white p-2.5 rounded-lg max-w-40 w-auto flex flex-col gap-1 rounded-r-lg bg-gradient-to-r from-blue-400 to-cyan-400"
                            }
                        >
                            <span class="text-black">{message.text}</span>{" "}
                            <span class="text-blue-500">{format(message.createdAt)}</span>
                        </div>
                        </>
                    ))}
                </div>

                <div className="bg-white flex justify-between h-12 items-center m-5 gap-4 p-2 rounded-lg self-end">
                    <div>+</div>
                    <InputEmoji value={newMessage} onChange={handleChange}/>
                    <div onClick={handleSend}  className="flex items-center  bg-orange-500 justify-center text-white border-none  rounded-md  hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-20 pl-8 pr-8" >
                        Send
                    </div>

                </div>
          </>  
       ):(
        <span className="text-center m-10">
            Tap on a chat to start conversation...
          </span>
       )}
    </div>
  )
}


export default ChatBox