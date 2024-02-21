import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { CreatePassword } from './views/auth/CreatePassword'
import Login from './views/auth/Login'
import Logout from './views/auth/logout'
import LogoutReroute from './views/auth/LogoutReroute'
import Register from './views/auth/Register'
import ResetPassword from './views/auth/ResetPassword'
import Course from './views/store/Course'
import CourseDetail from './views/store/CourseDetail'
import UserData from './views/functions/UserData'
import { login } from './utils/auth'
import { setAuthUser } from './utils/auth'
import Cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from './store/auth'

function App() {
  useEffect(()=>{
    let access_token = Cookie.get("access_token")
    const user = access_token? jwtDecode(access_token) ?? null : null
    //set the user if not null
    if(user){
        useAuthStore.getState().setUser(user)
    }

  },[])
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