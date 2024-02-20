import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'
const NavBar = () => {
    const[isLoggedIn , user] = useAuthStore((state) =>[
        state.isLoggedIn,
        state.user,
    ])
  return (
    <>
    {isLoggedIn()
        ?<Link to="/logout">Logout</Link> 
        :<> 
            <Link to='/register'>Register</Link> 
            <Link to='/login'>Login</Link>
        </>
    }
    </>
  )

}
export default NavBar