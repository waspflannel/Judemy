import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance, getCourseInformation } from '../../utils/axios'
import GetCurrentAddress from '../functions/UserCountry'
import UserData from '../functions/UserData'
import { CountryPicker } from '../functions/CountryPicker'
import CartID from '../functions/CartID'
import Swal from 'sweetalert2'
import NavBar from '../functions/NavBar'
import styled from 'styled-components'
import { MainButton, CustomTextArea } from '../templates/custom-components.styles'

const CoursePageWrapper = styled.div`
    padding: 2vh 15vw;
`

const ReviewsWrapper = styled.div`
    background-color: black;
    color: white;
    padding: 2vh 15vw;
`

const CourseInformationWrapper = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
`

const CourseDetail = () => {
    const [course , setCourse] = useState(null)
    const [country , setCountry] = useState('')
    const [createReview , setCreateReview] = useState({ user_id: 0, course_id: course?.id, review: '', rating:0 })
    const [currentStars, setCurrentStars] = useState(0);
    const [tempStars, setTempStars] = useState(0);

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

    const handleMakeReview = async (e) =>{
        setCreateReview({...createReview, [e.target.name]: e.target.value})
    }

    const handleReviewSubmit = (e) =>{
        try{
            e.preventDefault()
            const formData = new FormData()
            formData.append("user_id" , userData?.user_id)
            formData.append("course_id" , course.pid)
            formData.append("review" , createReview.review)
            formData.append("rating" , currentStars)

            axiosInstance.post(`reviews/${course?.pid}`,formData).then((response) =>{
                fetchReviewData()
                Swal.fire({
                    icon:response.status==200?'error' : 'success',
                    title:response.data.message
                })
                console.log(response.status)
            })
        }
        catch(error){
            console.log(error)
        }
    }

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
        
        <CoursePageWrapper>
            <h1>{course.title}</h1>
            <CourseInformationWrapper>
                <h3>Instructor: {course.instructor}</h3>
                <h3>Price: {course.price}</h3>
                <h3>Category: {course.category?.title}</h3>
                <h3>Rating: {
                    course.rating ? 
                    Array(course.rating).fill().map((_, r) => (
                        <span key={r}>⭐</span>
                    )) 
                    : 
                    "No Ratings"}
                </h3>
            </CourseInformationWrapper>
                    
            <p>{course.description}</p>
                    
            <CountryPicker setCountry={setCountry} />
            <button type='button' onClick={handleCart}>add TO cart</button>
        </CoursePageWrapper>

            <ReviewsWrapper>
                <div>
                    <h1>Reviews</h1>
                    <h3>Submit your own review</h3>
                    <form>
                        <div>
                        <div>
                            {
                                [1, 2, 3, 4, 5].map((_, r) => (
                                    <span style={{fontSize: '30px', cursor: 'pointer'}} key={r} onMouseEnter={() => setTempStars(r + 1)} onMouseLeave={() => setTempStars(currentStars)} onClick={() => setCurrentStars(tempStars)}>{_ <= tempStars ? '★' : '☆'}</span>
                                ))
                            }
                        </div>

                        <CustomTextArea name="review" id="reviewText" row={4} placeholder="Write a review" value={createReview.text} onChange={handleMakeReview}></CustomTextArea>
                        </div>

                        <MainButton type="button" onClick = {handleReviewSubmit}>Submit review</MainButton>
                    </form>
                </div>

                <div>
                    {reviews.map(review => (
                        <div style={{border:"solid 2px black"}} key={review}>
                            <p>{review?.user?.username}</p>
                            <p>{new Date(review.date).toDateString()}</p>
                            <p>{review.review}</p>
                            <p>
                                {
                                    //print stars based on the rating
                                    Array(review.rating).fill().map((_, r) => (
                                        <span key={r}>⭐</span>
                                    ))
                                }
                            </p>
                            <br></br>
                        </div>
                    ))}
                </div>
            </ReviewsWrapper>

        </>
    )
}

export default CourseDetail