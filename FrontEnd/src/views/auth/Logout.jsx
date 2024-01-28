import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../utils/auth'

function Logout() {
    useEffect(()=>{
        logout()
    },[])
  return (
    <div>
    <h1>logout</h1>
    <Link to={'/login'}>Login</Link>
    <br></br>
    <Link to={'/register'}>Register</Link>
    </div>
  )
}

export default Logout