import {Navigate} from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const PrivateRoute = ({children}) =>{
    //get the isLoggedIn state from zustand store
    const loggedIn = useAuthStore((state) => state.isLoggedIn)()
    //if the user is loggedIn render the children otherwise navigate to the login page
    return loggedIn ? <>{children}</> : <Navigate to={'/login'}/>
}

export default PrivateRoute