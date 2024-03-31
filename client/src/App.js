import React, { createContext, useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Navbar from "./components/Navbar"
import { Container } from '@mui/material'
import Register from './Pages/Register'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import BlogPage from './Pages/BlogPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export const AuthContext = createContext()

function App() {
  const [auth, setAuth]=useState(null)
  const [refresh, setRefresh] = useState(false)
  return (
    <AuthContext.Provider value={{ auth, setAuth, refresh, setRefresh }}>
    <BrowserRouter>
  
    <Navbar/>
    <Container sx={{p:1, mt:15}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/update/:id' element={<UpdatePost/>}/>
        <Route path='/api/blog/:id' element={<BlogPage/>}/>
      </Routes>
      </Container>
    </BrowserRouter>
        <ToastContainer />
    </AuthContext.Provider>
  )
}

export default App