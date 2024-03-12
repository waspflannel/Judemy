import React from 'react'
import { useEffect,useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import UserData from '../functions/UserData'
import { useParams,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SERVER_URL } from '../../utils/constants'
const Checkout = () => {
    const [couponCode , setCouponCode] = useState("");
    const [order , setOrder] = useState("")

    const [paymentLoading,setPaymentLoading] = useState(false)


    const param = useParams()
    const applyCoupon = async() => {
        console.log(couponCode)
        console.log(userData?.user_id)
        console.log(order.oid)

        const formData = new FormData()
        formData.append("coupon_code",couponCode)
        formData.append("order_oid",order.oid)
        formData.append("cart_id",userData?.user_id)

        try {
            const response = await axiosInstance.post("coupon/",formData)
            console.log(response.data.message)
            Swal.fire({
                icon:response.data.icon,
                title:response.data.message
            })
            
        } catch (error) {
            console.log(error)
        }

    }

    const stripe = (event) =>{
        setPaymentLoading(true)
        event.target.form.submit();
    }

    const userData = UserData()
    const [cartItems , setCartItems] = useState([])

    const fetchOrderData = () =>{
        axiosInstance.get(`orders/${param.order_oid}`).then((response)=>{
            setOrder(response.data)
        })
    }
    const fetchCartData = (cartID) =>{
        const url = cartID? `cart-items/${cartID}` : null
        axiosInstance.get(url).then((response) =>{
            setCartItems(response.data)
        })
    }

    if(userData !== undefined){
        useEffect(()=>{
            fetchCartData(userData?.user_id)
            fetchOrderData()
        },[])
    }


  return (
    <div>  
    <p>Initial Total: ${ parseFloat(order.initial_total) + parseFloat(order.tax)}</p>
      <p>new total Total: ${ order.total }</p>
      <p>saved: ${Math.abs(parseFloat(order.total)-(parseFloat(order.initial_total) + parseFloat(order.tax))) }</p>
        <div>
      <input  onChange={(e)=>setCouponCode(e.target.value)} type="text" placeholder="coupon code"></input>
      <button type="button" onClick={applyCoupon}>Submit</button>
         </div>
         <div>
         {paymentLoading? 
            <form action={`${SERVER_URL}api/stripe-checkout/${order?.oid}`}>
            <button disabled onClick={stripe} type='submit'>processing</button>
            </form>
            :
            <form action={`${SERVER_URL}api/stripe-checkout/${order?.oid}`} method='POST'>
            <button onClick={stripe} type='submit'>pay with stripe</button>
            </form>}
         </div>
    </div>
  )
}

export default Checkout