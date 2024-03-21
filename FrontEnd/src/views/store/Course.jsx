import React, { useState , useEffect } from 'react'
import { axiosInstance } from '../../utils/axios'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import NavBar from '../functions/NavBar'

const Course = () => {

    const [course , setCourse] = useState([])
    const [category , setCategory] = useState([])
    useEffect(() => {
        axiosInstance.get('course/')
            .then((response) => {
                setCourse(response.data);
            })
    }, []);

    useEffect(() => {
        axiosInstance.get('category/')
            .then((response) => {
                setCategory(response.data);
            })
    }, []);
    console.log(course);
    return (
        <>
        <NavBar/>
        <div> 
        <h1 style={{'textDecoration': 'underline'}}>Products</h1>

        </div>
        <br></br>
        <div>
        <h1 style={{'text-decoration': 'underline'}}>Categories</h1>
        {category?.map((c ,index) =>(
            <ul>
            <div key={index}>
            <h3>{c.title}</h3>
            </div>
            </ul>
        ))}
        
        </div>
        </>
    )
}


export default Course