import React from 'react'
import { useSearchParams , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from '../../utils/axios'

export const CreatePassword = () => {
    const [password , setNewPassword] = useState('')
    const [confirmPassword , setconfirmPassword] = useState('')
    const [searchParam] = useSearchParams()
    const otp = searchParam.get("otp")
    const userPK = searchParam.get("userPK")
    const navigate = useNavigate()

    const resetForm = () =>{
        setNewPassword("")
        setconfirmPassword("")
    }
    const handlePasswordReset = async (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert("passwords dont match")
            resetForm()
        }else{
            const formData = new FormData()
            formData.append('password',password)
            formData.append('otp',otp)
            formData.append('userPK',userPK)

            try{
                await axiosInstance.post(`user/password-change/` , formData).then(() =>{
                    alert("password changed sucessfully")
                    navigate('/login')
                })

            }
            catch(error){
                alert("error occured")
            }
        }

    }
    return (
        <div>
            <h1>Create new Password</h1>
            <form onSubmit={handlePasswordReset}>
                <input onChange={(e) => setNewPassword(e.target.value)} type='password' name='' id='' placeholder='enter new password'></input>
                <br></br>
                <br></br>
                <input onChange={(e) => setconfirmPassword(e.target.value)} type='password' name='' id='' placeholder='confirm new password'></input>
                <br></br>
                <br></br>
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    )
}
