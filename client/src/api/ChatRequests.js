import axios from "axios"


const API = axios.create({ baseURL: 'http://localhost:4000' });




export const userChats = (id) => API.get(`/chat/${id}`);

//venky
export const chatSchedule=(formdata)=>API.post("/chat/",formdata)

//export const chatFind=(id, userId)=API.get(`/chat/find/${id}/${userId}`)

