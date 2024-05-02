import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './Components/Register'
import Login from "./Components/Login"
import UserProfile from './pages/UserProfile'
import MainPage from './pages/MainPage'
import FileUpload from './pages/FileUpload'
import CreatePost from './pages/CreatePost'
import AskQuestion from './pages/AskQuestion'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/register' element={<Register/> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/user-profile' element={ <UserProfile />} />
        <Route path='/file-upload' element={ <FileUpload />} />
        <Route path='/main-page' element={<MainPage /> } />
        <Route path='/create-post' element={<CreatePost /> } />
        <Route path='/ask-question' element={<AskQuestion/> } />

      </Routes>
    </Router>
    </>
  )
}

export default App