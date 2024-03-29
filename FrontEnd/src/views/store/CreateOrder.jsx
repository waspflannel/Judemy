import React from 'react'
import { useEffect,useState } from 'react'
import Swal from 'sweetalert2'
import { axiosInstance } from '../../utils/axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import UserData from '../functions/UserData'
import { AuthPage } from '../templates/auth'
import { BigHeader, InputField, InputLabel, MainButton, HyperLinkMain } from '../templates/custom-components.styles'



const CreateOrder = () => {

  const [cartItems , setCartItems] = useState([])
  const navigate = useNavigate()
  const fetchCartData = (cartID) =>{
      const url = cartID? `cart-items/${cartID}` : null
      axiosInstance.get(url).then((response) =>{
          setCartItems(response.data)
      })
  }

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [phone , setPhone] = useState("")
  const [address , setAddress] = useState("")
  const [city , setCity] = useState("")
  const [province , setProvince] = useState("")
  const [country , setCountry] = useState("")
  const userData = UserData()

  if(userData !== undefined){
    useEffect(()=>{
        fetchCartData(userData?.user_id)
    },[])
}
  const createOrder =  async () =>{
    
    if(!name || !email || !phone || !address || !city || !province || !country){
      Swal.fire({
        icon:'warning',
        title: "missing fields",
        text: "please fill all fields"
      })
      return;
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
    
    const response = await axiosInstance.post('/cart-order' , formData).then((response) =>{
        const orderId = response.data['order id'];
        console.log(response.data)
        navigate(`/checkout/${orderId}`)
      
    })
  }
  return (
    <AuthPage>
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
    <p>Total: { cartItems[0]?.cart?.total ?? 0 }</p>

    <button onClick={createOrder}>proceed to checkout</button>

    
    <Link to={'/checkout'}>Checkout</Link>
</div>
</AuthPage>
  )
}

export default CreateOrder