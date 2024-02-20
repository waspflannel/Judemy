import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseInformation } from '../../utils/axios'
import GetCurrentAddress from '../functions/UserCountry'
import UserData from '../functions/UserData'
import { CountryPicker } from '../functions/CountryPicker'

const CourseDetail = () => {
    const [course , setCourse] = useState([])
    const [country , setCountry] = useState('')
    const userData = UserData()
    const param = useParams()


    useEffect(()=>{
        getCourseInformation(param.slug, setCourse);
    },[])


    const getCountry = () => { 
        var location = GetCurrentAddress()
        var currentCountry = location.country
        if(currentCountry == null || currentCountry ==""){
            currentCountry = country
        }
        return currentCountry
    }

    var currentCountry = getCountry()

    const handleCart = () =>{
        console.log("Course ID: " , course.pid)
        console.log("Course Price: " , course.price)
        console.log("Country: ",currentCountry)
        console.log("User ID: ",userData?.user_id)
    }
    return (
        <>
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
        </>
    )
}

export default CourseDetail