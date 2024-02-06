import React , {useState , useEffect} from 'react'
import {login} from '../../utils/auth'
import { useNavigate , Link} from 'react-router-dom'
import { useAuthStore} from '../../store/auth'

const Login = () => {
    const [email , setEmail] = useState("") 
    const [password ,setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)//set isLoggedIn to the zustand state

    
    useEffect(() =>{
        if(isLoggedIn()){
            navigate('/')
        }
    },[])


    const resetForm = () =>{
        setEmail("")
        setPassword("")
    }

    const handleLogin = async (e) => {
        console.log("handling login");
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const {error } = await login(email, password);
            if (error) {
                console.log("error");
                alert(error);
            } else {
                console.log("redirecting");
                navigate('/');
                alert("successfully logged in")
                resetForm();
            }
        } catch (error) {
            // Handle any errors that might occur during login
            alert("An error occurred during login");
            console.error(error);
        }
        setIsLoading(false);
    };
    
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <input type='text' name='email' id='email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                <br/>
                <br/>
                <input type='password' name='password' id='password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                <button type='submit'>submit</button>
            </form>
            <br></br>
            <Link to={'/reset-password'}>Forgot Password</Link>
        </div>
        
    )
}

export default Login