import {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../utils/axios'
import UserData from '../functions/UserData'

const PaymentSuccess = () => {

    const [order , setOrder] = useState([])
    const [loading , setLoading] = useState(true)
    const userData = UserData()
    const param = useParams()

    const urlParam = new URLSearchParams(window.location.search)
    const sessionId = urlParam.get("session_id")

    useEffect(()=>{
        axiosInstance.get(`orders/${param.order_oid}`).then((res)=>{
            setOrder(res.data)
        })
    },[])
    useEffect(() => {
        const formData = new FormData();
        formData.append("order_oid", param.order_oid);
        formData.append("session_id", sessionId);
        formData.append("cart_id" ,userData?.user_id)
        setLoading(true)
        axiosInstance.post(`payment-success/${param.order_oid}`, formData).then((res) => {
            console.log(res.data)
        });
    }, []);

    return (
        <div><h2>thanks heres your order id #{order.oid}</h2></div>
    )
}

export default PaymentSuccess