import React , {useState , useEffect} from 'react'
import {register} from '../../utils/auth'
import { useNavigate , Link} from 'react-router-dom'
import { useAuthStore} from '../../store/auth'


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
        alert("successfully Registered")
        resetForm()
    }
    setIsLoading(false)

}
  return (
    <div>
        <form onSubmit={handleRegister}>
            <input type='text' placeholder='full name' name='' id='' onChange={(e)=>setName(e.target.value)}></input>
            <input type='email' placeholder='Email' name='' id=''  onChange={(e)=>setEmail(e.target.value)}></input>
            <input type='text' placeholder='phone number' name='' id=''  onChange={(e)=>setPhone(e.target.value)} ></input>
            <input type='password' placeholder='password' name='' id=''  onChange={(e)=>setPassword(e.target.value)}></input>
            <input type='password' placeholder='confirm password' name='' id=''  onChange={(e)=>setconfirmPassword(e.target.value)}></input>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register