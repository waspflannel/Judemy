import React , {useEffect, useState} from 'react'
import { useAuthStore } from '../../store/auth'
import { Link, useNavigate} from 'react-router-dom'
const NavBar = () => {

  
    const[isLoggedIn , user] = useAuthStore((state) =>[
        state.isLoggedIn,
        state.user,
    ])


  return (
    <>
    <div style={{backgroundColor: 'black'}}>
    {isLoggedIn()
        ?
        <div style={{height: "10vh"}}>
        <Link to="/logout">Logout</Link><br></br> 
        <Link>{user().username}</Link>
        <Link to = "/cart/">Cart</Link>
        </div>
        :<div style={{height: "10vh"}}> 
            <Link to='/register'>Register</Link> 
            <Link to='/login'>Login</Link>
        </div>

        

    }
    </div>
    
    </>
  )

}
export default NavBar