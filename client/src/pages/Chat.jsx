import React,{useEffect, useState,useRef} from 'react'
import ProfileSearch from '../components/ProfileSearch'
import Conversation from '../components/Conversation'
import ChatBox from '../components/ChatBox'
import { useSelector } from 'react-redux'
import { userChats } from '../api/ChatRequests'
import NavIcons from '../components/NavIcons'

import {io} from "socket.io-client"



const Chat = () => {

  ///const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

    // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {

      try {
        const { data } = await userChats(user._id);
        
        
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id); 
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };


 


  return (
    <div className='relative grid grid-cols-[25%,auto] gap-4'>
       <div className='flex flex-col gap-4 '>
        <ProfileSearch/>
        <div className='flex flex-col gap-4 bg-slate-200 rounded-xl p-4  h-full overflow-y-auto'>
           <h1>Chats</h1>
           <div className='flex flex-col gap-4 '>
            {chats.map((chat)=>(
                <div  onClick={() => {setCurrentChat(chat);}}>
                    <Conversation data={chat} currentUser={user._id}  online={checkOnlineStatus(chat)}/>
                </div>

            ))}
           </div>
        </div>
         
       </div>

       <div className='flex flex-col gap-4'>
        <div className='' style={{ width: "20rem", alignSelf: "flex-end" }}>
        <NavIcons/>
        </div>
          
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
         
        />
       </div>
    </div>
  )
}




export default Chat