import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";


import Home from "./pages/Home"
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Chat from './pages/Chat'



const App = () => {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div>
       <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />

        <Route path="/chat" element={user ? <Chat/> : <Navigate to="../auth"/>} />

      </Routes>
    </div>
   
  )
}

export default App