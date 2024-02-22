import React from 'react'
import { useState , useEffect } from 'react'
import { axiosInstance } from '../../utils/axios'
import UserData from '../functions/UserData'
import { Link } from 'react-router-dom'
const Cart = () => {

    const [cartItems , setCartItems] = useState([])

    const userData = UserData()

    const fetchCartData = (cartID) =>{
        const url = cartID? `cart-items/${cartID}` : null
        axiosInstance.get(url).then((response) =>{
            setCartItems(response.data)
        })
    }
    if(userData !== undefined){
        useEffect(()=>{
            fetchCartData(userData?.user_id)
        },[])
    }
    console.log(cartItems)
    return (
        <>
        <h1 style={{'textDecoration': 'underline'}}>Cart</h1>
        {cartItems?.map((c ,index) =>(
            <ul>
            <div key={index}>
            <Link to = {`/detail/${c.course?.slug}`}> Title: {c.course?.title}</Link>
            <h3>Price: {c.course?.price}</h3>
            </div>
            </ul>
        ))}
        <h3>SubTotal: {cartItems?.cart?.sub_total}</h3>
        <h3>Tax: {cartItems?.cart?.tax}</h3>
        <h3>Total: {cartItems?.cart?.total}</h3>
        </>
    )
}

export default Cart