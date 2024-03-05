/* eslint-disable react/prop-types */
import React from 'react'
import { useState , useEffect } from 'react'
import { axiosInstance } from '../../utils/axios'
import UserData from '../functions/UserData'
import { Link } from 'react-router-dom'
import NavBar from '../functions/NavBar'
import { CartWrapper, CartWrapperLeft, CartWrapperRight, CartWrapperTop, CartWrapperMiddle, CartWrapperBottom, CourseCardWrapper, CourseCardParent, CourseCardWrapperLeft, CourseCardWrapperRight, RemoveButtonWrapper } from './Cart.styles'
import { BigHeader, MainButton } from '../templates/custom-components.styles'
import { useNavigate } from 'react-router-dom'
const CourseCard = ({ c, onRemoveClick }) => {

    return(
        <CourseCardWrapper>
            <RemoveButtonWrapper onClick={() => onRemoveClick(c)}>
                X
            </RemoveButtonWrapper>
            <CourseCardWrapperLeft>
                <Link to = {`/detail/${c.course?.slug}`}> 
                    {c.course?.title}
                </Link>
                <p>{c.course?.description}</p>
            </CourseCardWrapperLeft>
            <CourseCardWrapperRight>
                <p>Instructor: {c.course?.instructor}</p>
                <p>Price: {c.course?.price}</p>
                <p>Category: {c.course?.category?.title}</p>
                <p>Rating: {c.course?.rating ? c.course?.rating : "No Ratings"}</p>
            </CourseCardWrapperRight>
        </CourseCardWrapper>
    )
}

const Cart = () => {

    const [cartItems , setCartItems] = useState([])
    const navigate = useNavigate()
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

    const onRemoveClick = async (c) => {
        if(c?.cart?.id && c?.course?.pid){
            const url = `/cart-delete/${c.cart.cart_id}/${c.course.pid}/${c.cart.cart_id}`
            await axiosInstance.delete(url)
            fetchCartData(c.cart.cart_id);
        }
    }


    return (
        <>
            <NavBar/>
            <CartWrapper>
                <CartWrapperLeft>
                    <CartWrapperTop><BigHeader>Your Items</BigHeader></CartWrapperTop>
                    <CourseCardParent>
                        {
                            cartItems?.map((c ,i) =>(
                                <CourseCard c={c} onRemoveClick={onRemoveClick} key={i}/>
                            ))
                        }
                    </CourseCardParent>
                </CartWrapperLeft>
                <CartWrapperRight>
                    <CartWrapperTop><BigHeader>Summary</BigHeader></CartWrapperTop>
                    <CartWrapperMiddle>
                        {
                            cartItems?.map((c ,i) =>(
                                <p key={i}>1 x {c.course.title}</p>
                            ))
                        }
                    </CartWrapperMiddle>

                    <CartWrapperBottom>
                        <p>SubTotal: { cartItems[0]?.cart.sub_total ?? 0 } </p>
                        <p>Tax: { cartItems[0]?.cart.tax ?? 0 }</p>
                        <p>Total: { cartItems[0]?.cart?.total ?? 0 }</p>
                        <MainButton onClick={()=>navigate("/create-order/")}>Confirm Order</MainButton>
                    </CartWrapperBottom>
                </CartWrapperRight>
            </CartWrapper>
        </>
    )
}

export default Cart