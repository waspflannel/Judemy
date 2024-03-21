import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance, getCourseInformation } from '../../utils/axios'
import GetCurrentAddress from '../functions/UserCountry'
import UserData from '../functions/UserData'
import { CountryPicker } from '../functions/CountryPicker'
import CartID from '../functions/CartID'
import Swal from 'sweetalert2'
import NavBar from '../functions/NavBar'

const CourseDetail = () => {
    const [course , setCourse] = useState(null)
    const [country , setCountry] = useState('')

    const[reviews , setReviews] = useState([{}])
    const userData = UserData()
    const param = useParams()
    const cartID = CartID()

    const toast = Swal.mixin({
        toast:true,
        position:"top",
        showConfirmButton:false,
        timer:3000,
        timerProgressBar:true
    })

    const getCountry = () => { 
        var location = GetCurrentAddress()
        var currentCountry = location.country
        if(currentCountry == null || currentCountry ==""){
            currentCountry = country
        }
        return currentCountry
    }

    var currentCountry = getCountry()

    const handleCart = async () =>{
        try {
    
            const formData = new FormData()
            formData.append("course_id" , course.pid)
            formData.append("user_id" , userData?.user_id)
            formData.append("price" ,course.price)
            formData.append("country" , currentCountry)
            formData.append("cart_id" , userData?.user_id)
    
            const response = await axiosInstance.post(`cart-view` , formData)

            console.log(response)
            Swal.fire({
                icon:'success',
                title:response.data.message
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const fetchReviewData = () =>{
        axiosInstance.get(`reviews/${course?.pid}`).then((response) =>{
            setReviews(response.data)
            console.log(response.data)
        })
    }

    useEffect(()=>{
        getCourseInformation(param.slug, setCourse);
        
    },[])

    useEffect(()=>{
        if(course){
            fetchReviewData()
        }
    },[course])

    if(!course){
        return <div>loading...</div>
    }
    return (
        <>
        <NavBar/>
        <div>
        <h1>Course Details</h1>
        <h3>Title: {course.title}</h3>
        <h3>Instructor: {course.instructor}</h3>
        <h3>Description: {course.description}</h3>
        <h3>Price: {course.on_sale? course.sale_price : course.price}</h3>
        <h3>{course.featured? <p>featured</p> : <p>not featured</p>}</h3>
        <h3>Views: {course.views}</h3>
        <h3>Rating: {course.rating? course.rating : 0}</h3>
        </div>
            <CountryPicker setCountry={setCountry} />
            <button type='button' onClick={handleCart}>add TO cart</button>

            <div>
            {reviews.map(review => (
                
                <div style={{border:"solid 2px black"}}>
                <p>{review?.user?.username}</p>
                <p>{review.review}</p>
                <p>
                    {
                        //print stars based on the rating
                        Array(review.rating).fill().map((_) => (
                            <span>⭐</span>
                        ))
                    }
                </p>
                <br></br>
                </div>
            ))}

            </div>

        </>
    )
}

export default CourseDetail