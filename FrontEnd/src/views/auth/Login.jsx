import React , {useState , useEffect} from 'react'
import {login} from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthStore} from '../../store/auth'
import { AuthPage } from '../templates/auth'
import { InputField, BigHeader, InputLabel, MainButton, HyperLinkMain } from '../templates/custom-components.styles'

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
            } else {
                console.log("redirecting");
                navigate('/');
                resetForm();
            }
        } catch (error) {
            // Handle any errors that might occur during login
            console.error(error);
        }
        setIsLoading(false);
    };
    
    return (
        <AuthPage>
            <div>
                <BigHeader>Welcome To <br></br>Judemy.</BigHeader>
                <form onSubmit={handleLogin}>
                    <InputLabel>Username</InputLabel>
                    <InputField type='text' name='email' id='email' value={email} onChange={(e)=> setEmail(e.target.value)}></InputField>
                    <InputLabel>Password</InputLabel>
                    <InputField type='password' name='password' id='password' value={password} onChange={(e)=> setPassword(e.target.value)}></InputField>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <MainButton type='submit'>Login</MainButton>
                        <HyperLinkMain to={'/reset-password'}>Forgot Password?</HyperLinkMain>
                    </div>
                </form>
            </div>
        </AuthPage>
    )
}

export default Login