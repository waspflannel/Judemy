import React, { useState , useEffect } from 'react'
import axiosInstance from '../../utils/axios'

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
        <div> 
        <h1 style={{'text-decoration': 'underline'}}>Products</h1>
        {course?.map((c ,index) =>(
            <ul>
            <div>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p>${c.price}</p>
            <br></br>
            </div>
            </ul>
        ))}
        </div>
        <br></br>
        <div>
        <h1 style={{'text-decoration': 'underline'}}>Categories</h1>
        {category?.map((c ,index) =>(
            <ul>
            <div>
            <h3>{c.title}</h3>
            </div>
            </ul>
        ))}
        
        </div>
        </>
    )
}


export default Course