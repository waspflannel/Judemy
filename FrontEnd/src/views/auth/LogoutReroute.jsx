import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function LogoutReroute() {
    const [isLoggedIn , setisLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])
    return (
        <>
        {isLoggedIn()?
             <div>
            <h1>dashboard - logged in</h1>
            <Link to={'/logout'}>Logout</Link>
            </div>


            :<div>
            <h1>home page - not logged in</h1>
            <Link to={'/login'}>Login</Link>
            <br></br>
            <Link to={'/register'}>Register</Link>
            </div> }
        </>
    )
}

export default LogoutReroute