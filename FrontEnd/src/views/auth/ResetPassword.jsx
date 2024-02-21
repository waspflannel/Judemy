import {React ,useState} from 'react'
import { axiosInstance } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { AuthPage } from '../templates/auth'
import { BigHeader, InputLabel, InputField, MainButton, HyperLinkMain } from '../templates/custom-components.styles'
function ResetPassword() {

    const [email ,setEmail] = useState("")
    const navigate = useNavigate()
    

    const handleEmailSubmit = () => {
        axiosInstance.get(`user/password-reset/${email}/`).then((res) => {
            console.log(res.data);
        })
    }

  return (
    <AuthPage>
            <div>
                <BigHeader>Welcome To <br></br>Judemy.</BigHeader>
                <InputLabel>Email</InputLabel>
                <InputField onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='Enter Email' name='' id=''></InputField>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px'}}>
                    <MainButton type='submit' onClick={handleEmailSubmit} >Reset Password</MainButton>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                        <HyperLinkMain to={'/login'}>Login?</HyperLinkMain>
                        <HyperLinkMain to={'/register'}>Register?</HyperLinkMain>
                    </div>
                </div>
            </div>
        </AuthPage>
  )
}

export default ResetPassword