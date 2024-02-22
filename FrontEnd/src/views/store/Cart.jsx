/* eslint-disable react/prop-types */
import React from 'react'
import { useState , useEffect } from 'react'
import { axiosInstance } from '../../utils/axios'
import UserData from '../functions/UserData'
import { Link } from 'react-router-dom'
import NavBar from '../functions/NavBar'
import { CartWrapper, CartWrapperLeft, CartWrapperRight } from './Cart.styles'
import { BigHeader } from '../templates/custom-components.styles'

const CourseCard = ({ c }) => {
    return(
        <div>
            <Link to = {`/detail/${c.course?.slug}`}> 
                {c.course?.title}
            </Link>
            <h3>Price: {c.course?.price}</h3>
        </div>
    )
}

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

    return (
        <>
            <NavBar/>
            <CartWrapper>
                <CartWrapperLeft>
                    <BigHeader>Your Items</BigHeader>
                    {
                        cartItems?.map((c ,i) =>(
                            <CourseCard c={c} key={i}/>
                        ))
                    }
                </CartWrapperLeft>
                <CartWrapperRight>
                    <BigHeader>Summary</BigHeader>
                    <h3>SubTotal: { cartItems[0]?.cart.sub_total } </h3>
                    <h3>Tax: { cartItems[0]?.cart.tax }</h3>
                    <h3>Total: { cartItems[0]?.cart?.total }</h3>
                </CartWrapperRight>
            </CartWrapper>
        </>
    )
}

export default Cart