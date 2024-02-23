import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { axiosInstance } from '../../utils/axios'
import UserData from '../functions/UserData'
import { BigHeader, InputField, InputLabel, MainButton, HyperLinkMain } from '../templates/custom-components.styles'



const Checkout = () => {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [phone , setPhone] = useState("")
  const [address , setAddress] = useState("")
  const [city , setCity] = useState("")
  const [province , setProvince] = useState("")
  const [country , setCountry] = useState("")
  const userData = UserData()
  const createOrder = () =>{
    if(!name || !email || !phone || !address || !city || !province || !country){
      Swal.fire({
        icon:'warning',
        title: "missing fields",
        text: "please fill all fields"
      })
    }
    const formData = new FormData()
    formData.append("full_name" , name)
    formData.append("email" , email)
    formData.append("phone_number" , phone)
    formData.append("address" , address)
    formData.append("city" , city)
    formData.append("country" , country)
    formData.append("cart_id" , userData?.user_id)
    formData.append("user_id" , userData?.user_id)
    
    const response = axiosInstance.post('/cart-order' , formData).then((response) =>{
        console.log(response.data)
    })
  }
  return (
    <div>
    <form >
        <InputLabel>Full Name</InputLabel>
        <InputField type='text' name='' id='' onChange={(e)=>setName(e.target.value)}></InputField>
        <InputLabel>Email</InputLabel>
        <InputField type='email' name='' id=''  onChange={(e)=>setEmail(e.target.value)}></InputField>
        <InputLabel>Phone Number</InputLabel>
        <InputField type='text' name='' id=''  onChange={(e)=>setPhone(e.target.value)} ></InputField>
        <InputLabel>Address</InputLabel>
        <InputField type='text' name='' id=''  onChange={(e)=>setAddress(e.target.value)}></InputField>
        <InputLabel>City</InputLabel>
        <InputField type='text' name='' id=''  onChange={(e)=>setCity(e.target.value)}></InputField>
        <InputLabel>Province</InputLabel>
        <InputField type='text' name='' id=''  onChange={(e)=>setProvince(e.target.value)}></InputField>
        <InputLabel>Country</InputLabel>
        <InputField type='text' name='' id=''  onChange={(e)=>setCountry(e.target.value)}></InputField>
    </form>
    <button onClick={createOrder}>submit</button>
</div>
  )
}

export default Checkout