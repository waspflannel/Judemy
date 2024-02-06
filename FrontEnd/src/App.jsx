import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { CreatePassword } from './views/auth/CreatePassword'
import Login from './views/auth/Login'
import Logout from './views/auth/logout'
import LogoutReroute from './views/auth/LogoutReroute'
import Register from './views/auth/Register'
import ResetPassword from './views/auth/ResetPassword'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/' element = {<LogoutReroute/>}/>
        <Route path='/logout' element = {<Logout/>}/>
        <Route path='/reset-password' element = {<ResetPassword/>}/>
        <Route path='/password-reset' element = {<CreatePassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
