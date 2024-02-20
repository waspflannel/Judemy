import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { CreatePassword } from './views/auth/CreatePassword'
import Login from './views/auth/Login'
import Logout from './views/auth/logout'
import LogoutReroute from './views/auth/LogoutReroute'
import Register from './views/auth/Register'
import ResetPassword from './views/auth/ResetPassword'
import Course from './views/store/Course'
import CourseDetail from './views/store/CourseDetail'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* auth components*/}
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
       {/* <Route path='/reroute' element = {<LogoutReroute/>}/>*/}
        <Route path='/logout' element = {<Logout/>}/>
        <Route path='/reset-password' element = {<ResetPassword/>}/>
        <Route path='/password-reset' element = {<CreatePassword/>}/>

      {/* store componenets*/}
        <Route path ='/' element={<Course/>}></Route>
        <Route path ='/detail/:slug/' element={<CourseDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App