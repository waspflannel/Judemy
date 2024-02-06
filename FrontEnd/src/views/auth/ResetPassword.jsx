import {React ,useState} from 'react'
import axiosInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
function ResetPassword() {

    const [email ,setEmail] = useState("")
    const navigate = useNavigate()
    

    const handleEmailSubmit = () => {
        axiosInstance.get(`user/password-reset/${email}/`).then((res) => {
            console.log(res.data);
        })
    }

  return (
    <div>
        <h1> Reset Password</h1>
        <input onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='Enter Email' name='' id=''></input>
        <br></br>
        <button type='submit' onClick={handleEmailSubmit}>Reset Password</button>
    </div>
  )
}

export default ResetPassword