
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors =require("cors");




const AuthRoute = require('./Routes/AuthRoute.js')
const PostRoute =require('./Routes/PostRoute.js')
const UserRoute=require('./Routes/UserRoute.js')
const UploadRoute=require("./Routes/UploadRoute.js")
const ChatRoute=require("./Routes/ChatRoute.js")
const MessageRoute=require("./Routes/MessageRoute.js")



const app=express()

app.use(express.static('public')); 
app.use('/images', express.static('images'));


app.use(bodyParser.json({ limit: "30mb", extended: true })) 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); 



app.use(cors());



mongoose.connect('mongodb://127.0.0.1:27017/socialmedia') 

app.listen(4000,()=>{
    console.log("server running")
}) 


app.use('/auth', AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload', UploadRoute) 
app.use("/chat",ChatRoute)
app.use("/message",MessageRoute)
