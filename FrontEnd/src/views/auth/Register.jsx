import React , {useState , useEffect} from 'react'
import {register} from '../../utils/auth'
import { useNavigate , Link} from 'react-router-dom'
import { useAuthStore} from '../../store/auth'
import { AuthPage } from '../templates/auth'
import { BigHeader, InputField, InputLabel, MainButton, HyperLinkMain } from '../templates/custom-components.styles'

function Register() {
const [name , setName] = useState("")
const [email , setEmail] = useState("")
const [phone , setPhone] = useState("")
const [password , setPassword] = useState("")
const [confirmPassword , setconfirmPassword] = useState("")
const [isLoading, setIsLoading] = useState(false)
const navigate = useNavigate()

const isLoggedIn = useAuthStore((state) => state.isLoggedIn)//set isLoggedIn to the zustand state


const resetForm = () =>{
    setName("")
    setEmail("")
    setPhone("")
    setconfirmPassword("")
    setPassword("")
}

    
useEffect(() =>{
    if(isLoggedIn()){
        navigate('/')
    }
},[])

const handleRegister = async (e) =>{
    e.preventDefault()
    setIsLoading(true)
    const {error} = await register(name  , email , phone , password , confirmPassword)
    if(error){
        alert(JSON.stringify(error))
    }
    else{
        navigate("/login")
        resetForm()
    }
    setIsLoading(false)

}
  return (
    <AuthPage>
        <div>
            <BigHeader>Welcome To <br></br>Judemy.</BigHeader>
            <form onSubmit={handleRegister}>
                <InputLabel>Full Name</InputLabel>
                <InputField type='text' name='' id='' onChange={(e)=>setName(e.target.value)}></InputField>
                <InputLabel>Email</InputLabel>
                <InputField type='email' name='' id=''  onChange={(e)=>setEmail(e.target.value)}></InputField>
                <InputLabel>Phone Number</InputLabel>
                <InputField type='text' name='' id=''  onChange={(e)=>setPhone(e.target.value)} ></InputField>
                <InputLabel>Password</InputLabel>
                <InputField type='password' name='' id=''  onChange={(e)=>setPassword(e.target.value)}></InputField>
                <InputLabel>Confirm Password</InputLabel>
                <InputField type='password' name='' id=''  onChange={(e)=>setconfirmPassword(e.target.value)}></InputField>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px'}}>
                    <MainButton type='submit'>Register</MainButton>
                    <HyperLinkMain to={'/login'}>Login?</HyperLinkMain>
                </div>
            </form>
        </div>
    </AuthPage>
  )
}

export default Register